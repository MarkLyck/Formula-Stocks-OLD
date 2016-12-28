import React from 'react'

import store from '../../store'

const PortfolioGraph = React.createClass({
  render() {

    let startValue
    let marketStartValue

    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      startValue = store.plans.get(this.props.plan).get('portfolioYields')[0].balance
    }
    if (store.market.data.get('portfolioData')[0]) {
      marketStartValue = store.market.data.get('portfolioData')[0]
    }

    let fixedData = store.plans.get(this.props.plan).get('portfolioYields').map((point, i) => {
      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }
      return {
        fs: ((point.balance-startValue) / startValue * 100).toFixed(2),
        market: ((store.market.data.get('portfolioData')[i] - marketStartValue) / marketStartValue * 100).toFixed(2),
        date:  `${point.date.year}-${month}-${point.date.day}`
      }
    })

    var config = {
      "type": "serial",
      "dataProvider": fixedData,
      "theme": "light",
      "marginRight": 0,
      "marginLeft": 60,
      "valueAxes": [{
          "id": "v1",
          unit: '%',
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true,
          minimum: 0,
      }],
      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#27A5F9',
        borderThickness: 1,
      },
      "graphs": [
          {
            "id": "portfolio",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            lineColor: "#27A5F9",
            "fillAlphas": 0.75,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "fs",
            "balloonText": `<span class="capitalize" style='font-size:18px;'>${this.props.plan}<br/>+[[value]]%</span>`
        },
        {
            "id": "market",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            lineColor: "#49494A",
            "fillAlphas": 0.75,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "market",
            "balloonText": "<span style='font-size:18px;'>S&P 500<br/>+[[value]]%</span>"
        },
      ],
      chartCursor: {
	        valueLineEnabled: true,
	        valueLineAlpha: 0.5,
	        cursorAlpha: 0.5
	    },
      categoryField: "date",
      categoryAxis: {
        parseDates: true,
        equalSpacing: true,
        tickLength: 0,
      },
    };

    if (store.session.browserType() === 'Safari') {
      config.dataDateFormat = "YYYY-M-D",
      config.categoryAxis = {
        equalSpacing: true,
        tickLength: 0,
      }
    }





    let chart = (
      <div id="portfolio-chart" >
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return chart
  }
})

export default PortfolioGraph
