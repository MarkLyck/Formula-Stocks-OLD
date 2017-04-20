/* eslint-disable */
import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import LineGraph from '../../../components/Graphs/LineGraph/LineGraph'

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

    const chartData = this.props.data.reduce((prev, curr) => {
      if (prev[prev.length - 1]) {
        if (prev[prev.length - 1].date.split('-').join('') === moment(curr._kmd.ect).format('YYYY-MM-DD').split('-').join('')) {
          prev[prev.length - 1].visitors++
          return prev
        }
      }
      prev = prev.concat({ visitors: 1, date: moment(curr._kmd.ect).format('YYYY-MM-DD') })
      return prev
    }, [])

    let chartTheme =  'light'
    let gridOpacity = 0.05

    const graphs = [
      {
        "id": "firstVisits",
        lineColor: '#12D99E',
        "lineThickness": 2,
        "valueField": "visitors",
        "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">New visitors</p> <p>[[value]]</p></div>`
      }]

    return (<div id="portfolio-item-chart">
              <LineGraph data={chartData} graphs={graphs}/>
            </div>)
  }
}

export default DAUGraph
