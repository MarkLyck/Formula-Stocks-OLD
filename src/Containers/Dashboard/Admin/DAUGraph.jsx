import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import LineGraph from '../../../components/Graphs/LineGraph/LineGraph'

class DAUGraph extends Component {
  render() {
    const { data, users = [], isLoading } = this.props
    if (isLoading) {
      return (<div id="portfolio-item-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else if (!isLoading && !data.length) {
      return (<div id="portfolio-item-chart">
                <h3>No data found.</h3>
              </div>)
    }

    // gets signup dates from all users
    let signUpDays = _.countBy( users, user => moment(user._kmd.ect).format('YYYY-MM-DD') )
    let cancelDays = _.countBy( users, user => moment.unix(_.get(user, 'stripe.subscriptions.data[0].canceled_at')).format('YYYY-MM-DD') )

    const chartData = data.reduce((prev, curr) => {
      if (prev[prev.length - 1]) {
        if (prev[prev.length - 1].date.split('-').join('') === moment(curr._kmd.ect).format('YYYY-MM-DD').split('-').join('')) {
          prev[prev.length - 1].visitors++
          return prev
        }
      }
      const signUps = signUpDays[moment(curr._kmd.ect).format('YYYY-MM-DD')] ? signUpDays[moment(curr._kmd.ect).format('YYYY-MM-DD')] : 0
      const cancelations = cancelDays[moment(curr._kmd.ect).format('YYYY-MM-DD')] ? cancelDays[moment(curr._kmd.ect).format('YYYY-MM-DD')] : 0

      prev = prev.concat({ visitors: 1, date: moment(curr._kmd.ect).format('YYYY-MM-DD'), signUps: signUps, cancelations: cancelations })
      return prev
    }, [])

    const graphs = [
      {
        "id": "firstVisits",
        lineColor: '#12D99E',
        "lineThickness": 2,
        "valueField": "visitors",
        "balloonText": `<div class="suggestion-balloon"><p class="ticker">New visitors</p> <p>[[value]]</p></div>`
      },
      {
        "alphaField": "alpha",
        "balloonText": `<div class="suggestion-balloon"><p class="ticker">Signups:</p> <p>[[value]]</p></div>`,
        lineColor: '#27A5F9',
        "fillAlphas": 1,
        "type": "column",
        "valueField": "signUps",
      },
      {
        "alphaField": "alpha",
        "balloonText": `<div class="suggestion-balloon"><p class="ticker">cancelled:</p> <p>[[value]]</p></div>`,
        lineColor: '#EC1B5F',
        "fillAlphas": 0.5,
        "clustered": false,
        "columnWidth": 0.5,
        "type": "column",
        "valueField": "cancelations",
      },

    ]

    return (<div id="portfolio-item-chart">
              <LineGraph data={chartData} graphs={graphs}/>
            </div>)
  }
}

export default DAUGraph
