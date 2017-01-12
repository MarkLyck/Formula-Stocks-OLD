/* eslint-disable */
import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import LineGraph from '../../Global/Components/LineGraph/LineGraph'

class DAUGraph extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (<div id="portfolio-item-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else if (!this.props.isLoading && !this.props.data.length) {
      return (<div id="portfolio-item-chart">
                <h3>No data found.</h3>
              </div>)
    }

    let visitors = this.props.data.map(visitor => {
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

    const graphs = [
      {
        "id": "firstVisits",
        lineColor: '#12D99E',
        "lineThickness": 2,
        "valueField": "newVisitors",
        "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">New visitors</p> <p>[[value]]</p></div>`
      },
      {
        "id": "recVisitors",
        lineColor: '#27A5F9',
        "lineThickness": 2,
        "valueField": "recurrentVisitors",
        "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">Recurrent visitors</p> <p>[[value]]</p></div>`
      }]

    return (<div id="portfolio-item-chart">
              <LineGraph data={chartData.slice(1).slice(-30)} graphs={graphs}/>
            </div>)
  }
}

export default DAUGraph
