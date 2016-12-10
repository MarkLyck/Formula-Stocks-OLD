import React from 'react'
import moment from 'moment'
import _ from 'underscore'

import store from '../../store'

const DAUGraph = React.createClass({
  render() {
    let visitors = this.props.data

    visitors = visitors.map(visitor => {
      return moment(visitor._kmd.lmt).format('YYYY-MM-DD')
    })

    visitors = _.sortBy(visitors, (visitor) => {
      return Number(visitor.split('-').join(''))
    })


    visitors = visitors.reduce((prev, curr) => {

      let dateFound = false
      prev = prev.map(point => {
        if (point.date === curr) {
          dateFound = true
          point.visitors++
        }
        return point
      })
      if (prev[prev.length - 1] ) {
        let currDate = Number(curr.split('-').join(''))
        let prevDate = Number(prev[prev.length - 1].date.split('-').join(''))

        const missingDates = currDate - prevDate

        if (missingDates > 1 && missingDates < 28) {
            const year = curr.split('-')[0]
            const month = curr.split('-')[1]
            let date = Number(prev[prev.length - 1].date.split('-')[2])
          _(missingDates - 1).times(() => {
            date++
            prev = prev.concat({ visitors: 0, date: `${year}-${month}-${date}` })
          })
        }
      }


      if (!dateFound) {
        return prev.concat({ visitors: 1, date: curr })
      } else {


        return prev
      }
    }, [])

    let chartData = visitors

    let chartTheme =  'light'
    let gridOpacity = 0.05

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
          unit: '',
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
            "id": "DAU",
            lineColor: '#27A5F9',
            "lineThickness": 2,
            "valueField": "visitors",
            // "type": "smoothedLine",
            // // "bullet": "round",
            // // "bulletSize": 3,
            "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">Visitors</p> <p>[[value]]</p></div>`
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
      }
    };

    let chart
    if (chartData.length) {
      chart = (
        <div id="portfolio-item-chart">
          {React.createElement(AmCharts.React, config)}
        </div>
      )
    } else if (this.props.isLoading) {
      chart = (
        <div id="portfolio-item-chart">
          <h3>Loading...</h3>
        </div>
      )
    } else {
      chart = (
        <div id="portfolio-item-chart">
          <h3>No data found.</h3>
        </div>
      )
    }

    return chart
  }
})

export default DAUGraph
