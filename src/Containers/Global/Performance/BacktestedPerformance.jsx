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
      const basicData = this.props.path !== '/pro' ? store.plans.get('basic').get('annualData') : []
      const premiumData = store.plans.get('premium').get('annualData')
      const businessData = store.plans.get('business').get('annualData')
      const fundData = this.props.path === '/pro' ? store.plans.get('fund').get('annualData') : []
      const marketData = store.market.data.get('annualData')

      if ((basicData.length && premiumData.length && businessData.length && marketData.length && this.props.path !== '/pro')
          || (premiumData.length && businessData.length && fundData.length && marketData.length && this.props.path === '/pro')) {
        this.createChartData(basicData, premiumData, businessData, fundData, marketData)
      }
    }
  }

  createChartData(basicData, premiumData, businessData, fundData, marketData) {
    let fixedData = premiumData.map((point, i) => {

      let basicBalance = 25000
      let premiumBalance = 25000
      let businessBalance = 25000
      let fundBalance = 25000
      let marketBalance = 25000

      if (basicData[i]) { basicBalance = basicData[i].balance }
      if (premiumData[i]) { premiumBalance = premiumData[i].balance }
      if (businessData[i]) { businessBalance = businessData[i].balance }
      if (fundData[i]) { fundBalance = fundData[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }


      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }

      if (this.props.path !== '/pro') {
        return {
          basic: basicBalance,
          premium: premiumBalance,
          business: businessBalance,
          market: marketBalance,

          basicBalloon: formatPrice(basicBalance),
          premiumBalloon: formatPrice(premiumBalance),
          businessBalloon: formatPrice(businessBalance),
          marketBalloon: formatPrice(marketBalance),

          date: `${point.date.year}-${month}-${point.date.day}`
        }
      } else {
        return {
          premium: premiumBalance,
          business: businessBalance,
          fund: fundBalance,
          market: marketBalance,

          premiumBalloon: formatPrice(premiumBalance),
          businessBalloon: formatPrice(businessBalance),
          fundBalloon: formatPrice(fundBalance),
          marketBalloon: formatPrice(marketBalance),

          date: `${point.date.year}-${month}-${point.date.day}`
        }
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

      const preMin = Number(_.min(this.state.chartData, (point) => Number(point.premium)).premium)
      const busMin = Number(_.min(this.state.chartData, (point) => Number(point.business)).business)
      const funMin = Number(_.min(this.state.chartData, (point) => Number(point.fund)).fund)
      const marMin = Number(_.min(this.state.chartData, (point) => Number(point.market)).market)

      let minimum = _.min([preMin, busMin, funMin, marMin])
      minimum = Math.floor(minimum / 50) * 50
      let maximum = _.max(this.state.chartData, (point) => Number(point.business)).business
      maximum = Math.ceil(maximum/10000000000) * 10000000000

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
              id: "basic",
              lineColor: "#49494A",
              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#49494A",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "basic",
              balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Basic</span><span class=\"balloon-value\">$[[basicBalloon]]</span></div>"
            },
            {
              id: "premium",
              lineColor: "#6FCEE1",
              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#6FCEE1",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "premium",
              balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">$[[premiumBalloon]]</span></div>"
            },
            {
              id: "business",
              lineColor: "#27A5F9",
              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#27A5F9",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "business",
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">$[[businessBalloon]]</span></div>",
            },
            {
              id: "fund",
              lineColor: "#49494A",
              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#49494A",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "fund",
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Fund</span><span class=\"balloon-value\">$[[fundBalloon]]</span></div>",
            }
          ]
      return (
        <div id="result-chart" className={this.state.chartClass}>
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
        <p className="disclaimer">Numbers partially derived through backtesting. 2009-2017 match "live" results observed.</p>
      </section>
    )
  }
}

export default BacktestedPerformance
