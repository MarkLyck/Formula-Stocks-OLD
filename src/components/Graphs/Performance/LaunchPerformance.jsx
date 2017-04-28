/* eslint-disable */

import React from 'react'
import { Element } from 'react-scroll'
import _ from 'lodash'
import LineGraph from '../LineGraph/LineGraph'
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

class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.renderChart = this.renderChart.bind(this)
  }

  createChartData(planData, marketData) {

    let premiumData = planData['premium'].portfolioYields
    let businessData = planData['business'].portfolioYields
    let fundData = planData['fund'].portfolioYields

    let startValue = premiumData[0].balance
    let fundStartValue = fundData[0].balance
    let marketStartValue = Number(marketData[0])

    return premiumData.map((point, i) => {

      const premiumBalance = ((premiumData[i].balance - startValue) / startValue * 100).toFixed(2)
      const businessBalance = ((businessData[i].balance - startValue) / startValue * 100).toFixed(2)
      const fundBalance = ((fundData[i].balance - fundStartValue) / fundStartValue * 100).toFixed(2)
      const marketBalance = ((Number(marketData[i]) - marketStartValue) / marketStartValue * 100).toFixed(2)

      const month = Number(point.date.month) <= 9 ? '0' + point.date.month : point.date.month

      return {
        premium: Number(premiumBalance),
        business: Number(businessBalance),
        fund: Number(fundBalance),
        market: Number(marketBalance),

        premiumBalloon: formatPrice(premiumBalance),
        businessBalloon: formatPrice(businessBalance),
        fundBalloon: formatPrice(fundBalance),
        marketBalloon: formatPrice(marketBalance),

        date: `${point.date.year}-${month}-${point.date.day}`
      }
    })
  }

  renderChart(planData = {}, marketData = []) {
    if (!planData['premium'] || !planData['business'] || !planData['fund'] || !marketData.length) {
      return (<div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      const chartData = this.createChartData(planData, marketData)

      const preMin = _.minBy(chartData, point => point.premium).premium
      const busMin = _.minBy(chartData, point => point.business).business
      const funMin = _.minBy(chartData, point => point.fund).fund
      const marMin = _.minBy(chartData, point => point.market).market

      let minimum = _.min([preMin, busMin, funMin, marMin])
      minimum = Math.floor(minimum / 50) * 50
      let maximum = _.maxBy(chartData, point => point.business).business
      maximum = Math.ceil(maximum / 100) * 100

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
              balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">[[premiumBalloon]]</span></div>"
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
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">[[businessBalloon]]</span></div>",
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
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Fund</span><span class=\"balloon-value\">[[fundBalloon]]</span></div>",
            }
          ]
      return (
        <div id="result-chart">
          <div className="chart-indicators">
            <div className="chart-indicator business">Business</div>
            <div className="chart-indicator fund">Fund</div>
            <div className="chart-indicator premium">Premium</div>
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
    const { planData, DJIA } = this.props

    return (
      <section className="prof-performance section">
        <Element name="performance"/>
        <h2 className="title">Performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">Unleveraged, calculated performance in %, 3 strategies since 2009 launch, with DJIA as a baseline.</h3>
        {this.renderChart(planData, DJIA)}
      </section>
    )
  }
}

export default Performance
