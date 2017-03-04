/* eslint-disable */
import React from 'react'
import _ from 'underscore'
import store from '../../../store'
import LineGraph from '../../Global/Components/LineGraph/LineGraph'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  let price = value
  if (Number(value.replace(',','')) > 0) { price = '+' + price }
  return price
}

class PortfolioGraph extends React.Component {
  render() {

    let startValue
    let marketStartValue

    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      startValue = store.plans.get(this.props.plan).get('portfolioYields')[0].balance
    } else {
      return (<div id="portfolio-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    }

    if (store.market.data.get('portfolioData')[0]) {
      marketStartValue = store.market.data.get('portfolioData')[0]
    }

    let fixedData = store.plans.get(this.props.plan).get('portfolioYields').map((point, i) => {
      let month = Number(point.date.month) <= 9 ? ('0' + point.date.month) : point.date.month

      return {
        fs: ((point.balance - startValue) / startValue * 100).toFixed(2),
        fsBalloon: formatPrice(((point.balance-startValue) / startValue * 100).toFixed(2)),
        market: ((store.market.data.get('portfolioData')[i] - marketStartValue) / marketStartValue * 100).toFixed(2),
        marketBalloon: formatPrice(((store.market.data.get('portfolioData')[i] - marketStartValue) / marketStartValue * 100).toFixed(2)),
        date:  `${point.date.year}-${month}-${point.date.day}`
      }
    })

    const fsMin = Number(_.min(fixedData, (point) => Number(point.fs)).fs)
    const marketMin = Number(_.min(fixedData, (point) => Number(point.market)).market)

    let minimum = _.min([fsMin, marketMin])
    minimum = Math.floor(minimum)
    if (minimum > -11.02) { minimum = -12 } // must be lower than market minimum or graph breaks.
    let maximum = Number(_.max(fixedData, (point) => Number(point.fs)).fs)
    maximum = Math.ceil(maximum) + 50

    let planName = this.props.plan !== 'basic' ? this.props.plan : 'entry'

    const graphs = [
        {
          "id": "portfolio",
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          lineColor: "#27A5F9",
          "fillAlphas": 0.75,
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "fs",
          "balloonText": `<span class="capitalize" style='font-size:18px;'>${planName}<br/>[[fsBalloon]]%</span>`
      },
      {
          "id": "sp500",
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          lineColor: "#49494A",
          "fillAlphas": 0.75,
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "market",
          "balloonText": "<span style='font-size:18px;'>S&P 500<br/>[[marketBalloon]]%</span>"
      }]

    if (fixedData.length) {
      return <div id="portfolio-chart">
        <LineGraph
          data={fixedData}
          graphs={graphs}
          unit="%"
          unitPosition="right"
          minimum={minimum}
          maximum={maximum}
          baseValue={minimum}
          marginRight={-4}
          />
        </div>
    }
  }
}

export default PortfolioGraph
