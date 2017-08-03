/* eslint-disable */

import React from 'react'
import { Element } from 'react-scroll'
import _ from 'lodash'
import store from '../../../OLD_store'
import LineGraph from '../LineGraph/LineGraph'
import './backtestedPerformance.css'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

class BacktestedPerformance extends React.Component {
  constructor(props) {
    super(props)

    this.createChartData = this.createChartData.bind(this)
    this.renderChart = this.renderChart.bind(this)
  }


  createChartData(data = [], marketData = []) {
    let fixedData = data.map((point, i) => {

      let balance = 25000
      let marketBalance = 25000

      if (data[i] && i !== 0) { balance = data[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }
      else if (i !== 0 && data[i - 1] !== 25000) { marketBalance = data[i - 1] }

      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }

      return {
        fs: balance,
        market: marketBalance,
        fsBalloon: formatPrice(balance),
        marketBalloon: formatPrice(marketBalance),
        date: `${point.date.year}-${month}-${point.date.day}`
      }

    })
    return fixedData
  }

  renderChart() {
    const { annualData = [], marketData = [] } = this.props
    if (!annualData.length) {
      return (<div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      const chartData = this.createChartData(annualData, marketData)
      const fsMin =  _.minBy(chartData, point => point.fs).fs
      const marMin = chartData[0].market ? _.minBy(chartData, point => point.market).market : 0

      let minimum = Math.floor(_.min([fsMin, marMin]) / 10) * 10
      let maximum = _.maxBy(chartData, point => point.fs).fs
      maximum = Math.ceil(maximum / 120000000) * 120000000

      let graphs = [
            {
              id: 'backtested',
              lineColor: "#27A5F9",
              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#27A5F9",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "fs",
              "balloonText": `<div class=\"chart-balloon\"><span class=\"plan-name\">${this.props.name}</span><span class=\"balloon-value\">$[[fsBalloon]]</span></div>`,
            }
          ]

      if (marketData.length) {
        graphs.unshift({
          id: "market",
          lineColor: "#989898",
          bullet: "square",
          bulletBorderAlpha: 1,
          bulletColor: "#989898",
          bulletSize: 5,
          hideBulletsCount: 10,
          lineThickness: 2,
          useLineColorForBulletBorder: true,
          valueField: "market",
          "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">S&P500</span><span class=\"balloon-value\">$[[marketBalloon]]</span></div>",
        })
      }

      return (
        <div id="result-chart">
          <div className="chart-indicators">
            <div className="chart-indicator business">{this.props.name}</div>
            <div className="chart-indicator djia">S&P500</div>
          </div>
          <LineGraph graphs={graphs}
                     data={chartData}
                     unit="$"
                     axisAlpha={0.5}
                     maximum={maximum}
                     minimum={minimum}
                     logarithmic={true}
                     minorGridEnabled={true}/>
        </div>
      )
    }
  }

  render()  {
    return (
      <section className="backtested-performance section">
        <Element name="backtested"/>
        <h2 className="title">Long-term performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">Log scale graph 1970-2017</h3>
        {this.renderChart()}
        <p className="disclaimer">Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results in real time. See our ToS for details.</p>
      </section>
    )
  }
}

export default BacktestedPerformance
