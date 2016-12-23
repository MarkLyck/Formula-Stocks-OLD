import React from 'react'
import store from '../../../store'

const LastYearGraph = React.createClass({
  render() {

    let startValue;
    // let data = []
    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      const data = store.plans.get(this.props.plan).get('portfolioYields')
      startValue = data[data.length - 12].balance
    }

    let fixedData = store.plans.get(this.props.plan).get('portfolioYields').map((point, i) => {
      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }
      return {
        fs: ((point.balance-startValue) / startValue * 100).toFixed(2),
        date:  `${point.date.year}-${month}-${point.date.day}`
      }
    })

    fixedData = fixedData.reverse().splice(0, 12).reverse()

    // console.log('data: ', fixedData);

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
          "xAxis": -10,
          "position": "left",
          "ignoreAxisWidth":true,
          baseValue: -10,
          minimum: -10,
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
      <div id="portfolio-chart" style={{height: '100%'}}>
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return chart
  }
})

export default LastYearGraph
