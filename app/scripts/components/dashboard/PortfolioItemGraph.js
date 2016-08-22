import React from 'react'

import store from '../../store'

const PortfolioItemGraph = React.createClass({
  getInitialState() {
    return {data: []}
  },
  componentDidMount() {
    console.log(this.props.plan);
    store.plans.get(this.props.plan).getStockInfo(this.props.stock.ticker, 0, true).then((response) => {
      console.log(response);
      this.setState({data: response.data})
    })
    // getStockInfo(this.props.stock.ticker)
  },
  render() {
    console.log(this.props.stock);
    let chartData = this.state.data
    // console.log(chartData);
    chartData = chartData.map((point) => {
      // console.log(point[4]);
      if (point[4] && point[0]){
        return {
          // open: Number(point[1].toFixed(2)),
          // high: Number(point[2].toFixed(2)),
          close: Number(point[4].toFixed(2)),
          date: point[0],
        }
      } else {
        console.log(point);
      }

    })
    chartData = chartData.slice(0,this.props.stock.days_owned)
    chartData = chartData.reverse()

    let chartTheme =  'light'
    let gridOpacity = 0.05

    let color = {
      positive: '#27A5F9',
      negative: '#49494A'
    }

    var config = {
      "type": "serial",
      "dataProvider": chartData,
      "theme": chartTheme,
      "marginRight": 0,
      "marginLeft": 60,
      "marginTop": 25,
      "marginBottom": 25,
      "autoMargins" : false,
      "valueAxes": [{
          "id": "v1",
          unit: '$',
          unitPosition: 'left',
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true,
          gridAlpha: gridOpacity,
      }],
      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#27A5F9',
        borderThickness: 1,
      },
      "graphs": [
          {
            "id": "portfolioStock",
            lineColor: color.negative,
            "lineThickness": 2,
            "negativeLineColor": color.positive,
            "negativeBase": this.props.stock.purchase_price + 0.001,
            "valueField": "close",
            "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">${this.props.stock.ticker}</p> <p>$[[value]]</p></div>`
        }
      ],
      chartCursor: {
	        valueLineEnabled: true,
	        valueLineAlpha: 0.5,
	        cursorAlpha: 0.5
	    },
      categoryField: "date",
      categoryAxis: {
        parseDates: true,
        gridAlpha: 0,
        axisAlpha: 0,
      },
      "guides": [{
					"value" : this.props.stock.purchase_price + 0.001,
					"lineColor" : color.positive,
					"lineAlpha": 0.4,
					"lineThickness": 1,
					"position" : "right"
			}]
    };





    let chart = (
      <div id="portfolio-item-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return chart
  }
})

export default PortfolioItemGraph
