/* eslint-disable */

import React from 'react'
import { Element } from 'react-scroll'
import _ from 'underscore'
import LineGraph from '../LineGraph/LineGraph'
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
    this.renderChart = this.renderChart.bind(this)
  }

  createChartData(planData, marketData) {

    let premiumData = planData['premium'].annualData
    let businessData = planData['business'].annualData
    let fundData = planData['fund'].annualData

    // Generate quarterly report
    // let startValue = businessData[0].balance

    // let startValue = 0
    // let negative = 0
    // let positive = 0
    // console.log( businessData )
    // fundData.forEach((point, i) => {
    //   if (i === 0) { startValue = point.balance }
    //   if (point.date.year >= 1979) {
    //     if (Number(point.date.year) === 1979 && Number(point.date.month) < 12) { return undefined }
    //     else if (Number(point.date.year) === 1979 && Number(point.date.month) === 12) {
    //       startValue = point.balance
    //       return undefined
    //     }

      //   const increase = ((point.balance - startValue) / startValue) * 100
      //   // if (point.date.month === '12') {
      //   //   console.log(point.date.year + '   ' + increase.toFixed(4))
      //   //   startValue = point.balance
      //   // }
      //   if (point.date.month === '3') {
      //     console.log(point.date.year + ' ' + 'Q1 ' + increase.toFixed(2))
      //     startValue = point.balance
      //     if (increase > 0) { positive++ }
      //     else { negative++ }
      //   }
      //   else if (point.date.month === '6') {
      //     console.log(point.date.year + ' ' + 'Q2 ' + increase.toFixed(2))
      //     startValue = point.balance
      //     if (increase > 0) { positive++ }
      //     else { negative++ }
      //   }
      //   else if (point.date.month === '9') {
      //     console.log(point.date.year + ' ' + 'Q3 ' + increase.toFixed(2))
      //     startValue = point.balance
      //     if (increase > 0) { positive++ }
      //     else { negative++ }
      //   }
      //   else if (point.date.month === '12') {
      //     console.log(point.date.year + ' ' + 'Q4 ' + increase.toFixed(2))
      //     startValue = point.balance
      //     if (increase > 0) { positive++ }
      //     else { negative++ }
      //   }
      //   if (point.date.year === '2017' && point.date.month === '2') {
      //     console.log(point.date.year + ' ' + 'SP ' + increase.toFixed(2))
      //     if (increase > 0) { positive++ }
      //     else { negative++ }
      //   }
      //
      // }
    // })
    // console.log('positive', positive);
    // console.log('negative', negative);


    return premiumData.map((point, i) => {

      let premiumBalance = 25000
      let businessBalance = 25000
      let fundBalance = 25000
      let marketBalance = 25000

      if (i !== 0) {
        if (premiumData[i]) { premiumBalance = premiumData[i].balance }
        if (businessData[i]) { businessBalance = businessData[i].balance }
        if (fundData[i]) { fundBalance = fundData[i].balance }
        if (marketData[i]) { marketBalance = marketData[i] }
        else if (i !== 0 && data[i - 1] !== 25000) { marketBalance = data[i - 1] }
      }

      let month = Number(point.date.month) <= 9 ? '0' + point.date.month : point.date.month

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
    })
  }

  renderChart(planData = {}, marketData = []) {
    if (!planData['premium'] || !planData['business'] || !planData['fund'] || !marketData.length ) {
      return (<div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      const chartData = this.createChartData(planData, marketData)

      const preMin = _.min(chartData, point => point.premium).premium
      const busMin = _.min(chartData, point => point.business).business
      const funMin = _.min(chartData, point => point.fund).fund
      const marMin = _.min(chartData, point => point.market).market

      let minimum = _.min([preMin, busMin, funMin, marMin])
      minimum = Math.floor(minimum / 50) * 50
      let maximum = _.max(chartData, point => point.business).business
      maximum = Math.ceil(maximum / 10000000000) * 10000000000

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
        <div id="result-chart">
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
    const { planData, annualSP500 } = this.props

    return (
      <section className="backtested-performance section">
        <Element name="backtested"/>
        <h2 className="title">Long-term performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">Log scale graph 1970-2017</h3>
        {this.renderChart(planData, annualSP500)}
        <p className="disclaimer">Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results in real time. See our ToS for details.</p>
      </section>
    )
  }
}

export default BacktestedPerformance
