import React from 'react'
import store from '../../store'

import unnamedChartComponent from '../../libraries/amcharts3-react';

const TheResults = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentDidMount() {
    store.plans.basic.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.premium.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.business.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.fund.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.market.data.on('change', () => {
      this.setState({fetched: true})
    })
  },
  render() {
    let basicData = store.plans.basic.data.get('annualData')
    let premiumData = store.plans.premium.data.get('annualData')
    let businessData = store.plans.business.data.get('annualData')
    // let fundData = store.plans.fund.data.get('annualData')
    let marketData = store.market.data.get('annualData')

    let fixedData = basicData.map((point, i) => {

      let premiumBalance = 0
      let businessBalance = 0
      let marketBalance = 0

      if (premiumData[i]) { premiumBalance = premiumData[i].balance }
      if (businessData[i]) { businessBalance = businessData[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }

      return {
        basic: point.balance,
        premium: premiumBalance,
        business: businessBalance,
        // fund: fundData[i].balance,
        market: marketBalance,

        basicBalloon: formatPrice(point.balance),
        premiumBalloon: formatPrice(premiumBalance),
        businessBalloon: formatPrice(businessBalance),
        marketBalloon: formatPrice(marketBalance),

        date: `${point.date.year}-${point.date.month}-${point.date.day}`
      }
    })

    function formatPrice(value) {
  		while(/(\d+)(\d{3})/.test(value.toString())) {
  			value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  		}
  		var price = '$' + value;
  		return price;
  	}

    var chartData = fixedData;
    var config = {
      type: "serial",
      theme: "dark",
      addClassNames: true,

      dataProvider: chartData,

      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#FFF',
        borderThickness: 0,
      },

      graphs: [{
        id: "basic",
        lineColor: "#fff",

        bullet: "square",
        bulletBorderAlpha: 1,
        bulletColor: "#FFF",
        bulletSize: 5,
        hideBulletsCount: 10,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: "basic",
        balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Basic</span><span class=\"balloon-value\">[[basicBalloon]]</span></div>"
      },
      {
        id: "premium",
        lineColor: "#fff",

        bullet: "square",
        bulletBorderAlpha: 1,
        bulletColor: "#FFF",
        bulletSize: 5,
        hideBulletsCount: 10,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: "premium",
        balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">[[premiumBalloon]]</span></div>"
      },
      {
        id: "business",
        lineColor: "#fff",

        bullet: "square",
        bulletBorderAlpha: 1,
        bulletColor: "#FFF",
        bulletSize: 5,
        hideBulletsCount: 10,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: "business",
        "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">[[businessBalloon]]</span></div>",
      },
      {
        id: "market",
        lineColor: "#49494A",

        bullet: "square",
        bulletBorderAlpha: 1,
        bulletColor: "#FFF",
        bulletSize: 5,
        hideBulletsCount: 10,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: "market",
        "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">S&P 500</span><span class=\"balloon-value\">[[marketBalloon]]</span></div>",
      }],

      valueAxes: [{
        logarithmic: true,
        unit: '$',
        unitPosition: 'left',
        gridAlpha: 0.15,
        minorGridEnabled: true,
        dashLength: 0,
        min: 0,
			}],

      chartCursor: {
	        valueLineEnabled: true,
	        // valueLineBalloonEnabled: true,
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
      <div id="result-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return (
      <section className="the-results">
        <div className="content">
          <h2 className="title">The Results</h2>
          <div className="divider"></div>
          <h3 className="subtitle">Log Graph</h3>
          {chart}
        </div>
      </section>
    )
  }
})

export default TheResults
