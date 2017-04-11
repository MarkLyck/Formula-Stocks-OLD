import React from 'react'
import _ from 'lodash'
import { formatPrice } from '../helpers'
import LineGraph from '../../Global/Components/LineGraph/LineGraph'

class PortfolioGraph extends React.Component {
  render() {
    const { portfolioYields, marketData } = this.props

    let startValue
    let marketStartValue

    if (portfolioYields[0]) {
      startValue = portfolioYields[0].balance
    } else {
      return (<div id="portfolio-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    }

    if (marketData[0]) { marketStartValue = marketData[0] }

    let fixedData = portfolioYields.map((point, i) => {
      let month = Number(point.date.month) <= 9 ? ('0' + point.date.month) : point.date.month

      return {
        fs: ((point.balance - startValue) / startValue * 100).toFixed(2),
        fsBalloon: formatPrice(((point.balance-startValue) / startValue * 100).toFixed(2)),
        market: ((marketData[i] - marketStartValue) / marketStartValue * 100).toFixed(2),
        marketBalloon: formatPrice(((marketData[i] - marketStartValue) / marketStartValue * 100).toFixed(2)),
        date:  `${point.date.year}-${month}-${point.date.day}`
      }
    })
    const fsMin = _.minBy(fixedData, (point) => Number(point.fs)).fs
    const marketMin = _.minBy(fixedData, (point) => point.market).market

    let minimum = _.min([Number(fsMin), marketMin])
    minimum = Math.floor(minimum)
    if (minimum > -11.02) { minimum = -12 } // must be lower than market minimum or graph breaks.
    let maximum = _.maxBy(fixedData, (point) => Number(point.fs)).fs
    maximum = Math.ceil(maximum) + 50

    let planName = this.props.selectedPlan !== 'basic' ? this.props.selectedPlan : 'entry'

    const graphs = [
        {
          "id": 'portfolio',
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
