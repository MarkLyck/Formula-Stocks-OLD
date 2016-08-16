import React from 'react'

import store from '../../store'
import cc from '../../cc'

import unnamedChartComponent from '../../libraries/amcharts3-react';

const Portfolio = React.createClass({
  getInitialState() {
    return {fetching: true}
  },
  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.plans.get(this.props.plan).getPortfolio()
  },
  updateState() {
    this.setState({fetching: false})
  },
  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
    store.plans.get(newPlan.plan).getPortfolio()
  },
  render() {
    let portfolio = store.plans.get(this.props.plan).get('portfolio').map((stock, i) => {
      if (stock.name === 'CASH') {
        return (
          <tbody key={i} className="cash">
            <tr>
              <td className="stock-name"><i className="fa fa-money" aria-hidden="true"></i>{stock.name}</td>
              <td>{stock.percentage_weight.toFixed(2)}%</td>
            </tr>
          </tbody>
        )
      }

      let changeClass = 'positive'
      if ((stock.latest_price - stock.purchase_price).toFixed(2) < 0) {
        changeClass = 'negative'
      }
      // console.log(stock);

      return (
        <tbody key={i}>
          <tr>
            <td className="stock-name">
              <i className="fa fa-flask" aria-hidden="true"></i>
              <div className="wrapper">
                <p>{stock.name}</p>
                <p className="ticker">{stock.ticker}</p>
              </div>
            </td>
            <td><p className="blue">{stock.percentage_weight.toFixed(2)}%</p></td>
            <td><p className={changeClass}>{(stock.latest_price - stock.purchase_price).toFixed(2)}%</p></td>
            <td><p className="blue">${stock.purchase_price.toFixed(2)}</p></td>
            <td><p>${stock.latest_price.toFixed(2)}</p></td>
            <td><p>{cc.commafy(stock.days_owned)}</p></td>
          </tr>
        </tbody>
      )
    })

    let startValue;
    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      startValue = store.plans.get(this.props.plan).get('portfolioYields')[0].balance
    }

    let fixedData = store.plans.get(this.props.plan).get('portfolioYields').map((point) => {
      return {
        balance: ((point.balance-startValue) / startValue * 100).toFixed(2),
        date:  `${point.date.year}-${point.date.month}-${point.date.day}`
      }
    })

    var chartData = store.plans.get(this.props.plan).get('portfolioYields')
    var config = {
      "type": "serial",
      "dataProvider": fixedData,
      "theme": "light",    "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "valueAxes": [{
          "id": "v1",
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true,
          inside: true,
      }],
      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#FFF',
        borderThickness: 0,
      },
      "graphs": [{
          "id": "portfolio",
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "balance",
          "balloonText": "<span style='font-size:18px;'>[[value]]%</span>"
      }],
      chartCursor: {
	        valueLineEnabled: true,
	        valueLineAlpha: 0.5,
	        fullWidth: true,
	        cursorAlpha: 0.5
	    },
      categoryField: "date",
      categoryAxis: {
        parseDates: true,
      },
    };





    let chart = (
      <div id="portfolio-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return (
      <div className="portfolio">

        <section className="portfolio-yields">
          {chart}
        </section>

        <section className="holdings">
          <div className="top">
            <h2>Holdings</h2>
            <h2 className="blue">{store.plans.get(this.props.plan).get('portfolio').length - 1} Stocks</h2>
          </div>
          <table className="portfolio-table">
            <thead className="labels">
              <tr>
                <th>Name</th>
                <th>Allocation</th>
                <th>Change</th>
                <th>Bought at</th>
                <th>Last price</th>
                <th>Days owned</th>

              </tr>
            </thead>

            {portfolio}
          </table>
        </section>
      </div>
    )
  }
})

export default Portfolio
