/* eslint-disable */

import React, { Component } from 'react'
import { Element } from 'react-scroll'
import _ from 'lodash'
import LineGraph from '../Components/LineGraph/LineGraph'
import './launchPerformance.css'

function formatPrice(value) {
  value = String(value)
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  let price = value + '%'
  if (Number(value.replace(',','')) > 0) { price = '+' + price }
  return price
}

class Performance extends Component {
  constructor(props) {
    super(props)

    this.createChartData = this.createChartData.bind(this)
    this.renderChart = this.renderChart.bind(this)
  }

  createChartData(data, marketData) {
    if (data.length && marketData.length) {
      let startValue = data[0].balance
      let marketStartValue = Number(marketData[0])

      let fixedData = data.map((point, i) => {
        const balance = ((data[i].balance - startValue) / startValue * 100).toFixed(2)
        const marketBalance = ((Number(marketData[i]) - marketStartValue) / marketStartValue * 100).toFixed(2)

        let month = Number(point.date.month) > 9 ? point.date.month : '0' + point.date.month

        return {
          market: Number(marketBalance),
          fs: Number(balance),
          fsBalloon: formatPrice(balance),
          marketBalloon: formatPrice(marketBalance),
          date: `${point.date.year}-${month}-${point.date.day}`
        }
      })
      return fixedData
    }
    return []
  }

  renderChart() {
    const { portfolioYields, marketData } = this.props
    if (!portfolioYields.length || !marketData.length) {
      return (<div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      const chartData = this.createChartData(portfolioYields, marketData)
      const fsMin = _.minBy(chartData, point => point.fs).fs
      const marMin = _.minBy(chartData, point => point.market).market

      let minimum = Math.floor( _.min([fsMin, marMin]) / 10) * 10
      let maximum = Math.ceil(_.maxBy(chartData, point => point.fs).fs / 20) * 20

      const graphs = [
            {
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
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">DJIA</span><span class=\"balloon-value\">[[marketBalloon]]</span></div>",
            },
            {
              id: "launch",
              lineColor: "#27A5F9",

              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#27A5F9",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "fs",
              "balloonText": `<div class=\"chart-balloon\"><span class=\"plan-name\">${this.props.name}</span><span class=\"balloon-value\">[[fsBalloon]]</span></div>`,
            }
          ]
      return (
        <div id="result-chart">
          <div className="chart-indicators">
            <div className="chart-indicator business">{this.props.name}</div>
            <div className="chart-indicator djia">DJIA</div>
          </div>
          <LineGraph graphs={graphs}
                     data={chartData}
                     unit="%"
                     unitPosition="right"
                     axisAlpha={0.5}
                     maximum={maximum}
                     minimum={minimum}/>
        </div>
      )
    }
  }

  render() {
    return (
      <section className="prof-performance section">
        <Element name="performance"/>
        <h2 className="title">Performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">Unleveraged returns since 2009, compared to the Dow Jones Industrial Average.</h3>
        {this.renderChart()}
      </section>
    )
  }
}

export default Performance
