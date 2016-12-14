import React from 'react'
import moment from 'moment'
import _ from 'underscore'

import store from '../../store'

const DAUGraph = React.createClass({
  render() {
    let visitors = this.props.data

    visitors = visitors.map(visitor => {
      return  {
                firstVisit: moment(visitor._kmd.ect).format('YYYY-MM-DD'),
                lastVisit: moment(visitor._kmd.lmt).format('YYYY-MM-DD')
              }
    })

    visitors = _.sortBy(visitors, (visitor) => {
      return Number(visitor.firstVisit.split('-').join(''))
    })

    let chartData = visitors.reduce((prev, curr) => {

      let dateFound = false

      prev = prev.map(point => {
        if (point.date === curr.firstVisit) {
          dateFound = true
          point.newVisitors++
        }
        return point
      })

      if (prev[prev.length - 1] ) {
        let currDate = Number(curr.firstVisit.split('-').join(''))
        let prevDate = Number(prev[prev.length - 1].date.split('-').join(''))

        const missingDates = currDate - prevDate

        if (missingDates > 1 && missingDates < 28) {
            const year = curr.firstVisit.split('-')[0]
            const month = curr.firstVisit.split('-')[1]
            let date = Number(prev[prev.length - 1].date.split('-')[2])

          _(missingDates - 1).times(() => {
            date++
            prev = prev.concat({
              newVisitors: 0,
              recurrentVisitors: 0,
              date: `${year}-${month}-${date}` })
          })
        }
      }
      if (!dateFound) {
        return prev.concat({ newVisitors: 1, date: curr.firstVisit, recurrentVisitors: 0 })
      } else {
        return prev
      }
    }, [])

    chartData = chartData.map(point => {
      visitors.forEach(visitor => {
        if (visitor.lastVisit === point.date && visitor.lastVisit !== visitor.firstVisit) {
          point.recurrentVisitors++
        }
      })
      return point
    })

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
            "id": "firstVisits",
            lineColor: '#12D99E',
            "lineThickness": 2,
            "valueField": "newVisitors",
            // "type": "smoothedLine",
            // // "bullet": "round",
            // // "bulletSize": 3,
            "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">New visitors</p> <p>[[value]]</p></div>`
        },
        {
          "id": "recVisitors",
          lineColor: '#27A5F9',
          "lineThickness": 2,
          "valueField": "recurrentVisitors",
          // "type": "smoothedLine",
          // // "bullet": "round",
          // // "bulletSize": 3,
          "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">Recurrent visitors</p> <p>[[value]]</p></div>`
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
