/* eslint-disable */
import React from 'react'
import _ from 'underscore'
import store from '../../../store'
import LineGraph from '../../Global/Components/LineGraph/LineGraph'

class StockGraph extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (<div id="portfolio-item-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else if (!this.props.isLoading && !this.props.data) {
      return (<div id="portfolio-item-chart"> <h3>No data found.</h3> </div>)
    }

    let chartData = this.props.data
    chartData = chartData.map(point => {
      return {
        close: Number(point[1].toFixed(2)),
        date: point[0]
      }
    })
    chartData = chartData.slice(0,this.props.stock.days_owned)
    chartData = chartData.reverse()

    let chartTheme =  'light'
    let gridOpacity = 0.05

    let color = {
      positive: '#27A5F9',
      negative: '#49494A'
    }

    const graphs = [
        {
          "id": "portfolioStock",
          lineColor: color.negative,
          "lineThickness": 2,
          "negativeLineColor": color.positive,
          "negativeBase": this.props.stock.purchase_price + 0.001,
          "valueField": "close",
          "balloonText": `<div class=\"suggestion-balloon\"><p class="ticker">${this.props.stock.ticker}</p> <p>$[[value]]</p></div>`
      }]

    const guides = [{
        "value" : this.props.stock.purchase_price + 0.001,
        "lineColor" : color.positive,
        "lineAlpha": 0.4,
        "lineThickness": 1,
        "position" : "right"
    }]

    return (<div id="portfolio-item-chart">
              <LineGraph data={chartData} graphs={graphs} unit="$" guides={guides} axisAlpha={0} marginTop={25}/>
            </div>)
  }
}

export default StockGraph
