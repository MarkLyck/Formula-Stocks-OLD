/* eslint-disable */

import React from 'react'
import Scroll from 'react-scroll'
import _ from 'underscore'
import store from '../../../store'
import LineGraph from '../Components/LineGraph/LineGraph'
import './backtestedPerformance.css'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  return value
}

class BacktestedPerformance extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)
    this.createChartData = this.createChartData.bind(this)
    this.renderChart = this.renderChart.bind(this)

    this.state = { chartData: [] }
  }

  componentDidMount() {
    this.getData()
    store.plans.on('update', this.getData.bind(this, 'plans'))
    store.market.data.on('change', this.getData.bind(this, 'market'))
  }

  componentWillUnmount() {
    store.plans.off('update', this.getData)
    store.market.data.off('update', this.getData)
  }

  getData() {
    if (!this.state.chartData.length) {
      const data = store.plans.get(this.props.plan).get('annualData')
      const marketData = store.market.data.get('annualData')

      if (data.length && marketData.length) { this.createChartData(data, marketData) }
    }
  }

  createChartData(data, marketData) {
    let fixedData = data.map((point, i) => {

      let balance = 25000
      let marketBalance = 25000

      if (data[i] && i !== 0) { balance = data[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }

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
    this.setState({ chartData: fixedData })
  }

  renderChart() {
    if (!this.state.chartData.length) {
      return (<div id="result-chart" className={this.state.chartClass + ' loading'}>
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      const fsMin = Number(_.min(this.state.chartData, (point) => Number(point.fs)).fs)
      const marMin = Number(_.min(this.state.chartData, (point) => Number(point.market)).market)

      let minimum = Math.floor(_.min([fsMin, marMin]) / 10) * 10
      let maximum = _.max(this.state.chartData, (point) => Number(point.fs)).fs
      maximum = Math.ceil(maximum / 120000000) * 120000000

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
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">S&P500</span><span class=\"balloon-value\">$[[marketBalloon]]</span></div>",
            },
            {
              id: this.props.plan,
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
      return (
        <div id="result-chart" className={this.state.chartClass}>
          <div className="chart-indicators">
            <div className="chart-indicator business">{this.props.name}</div>
            <div className="chart-indicator djia">S&P500</div>
          </div>
          <LineGraph graphs={graphs}
                     data={this.state.chartData}
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
    const Element = Scroll.Element
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
