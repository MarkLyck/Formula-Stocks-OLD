/* eslint-disable */
import React from 'react'
import LineGraph from '../../Global/Components/LineGraph/LineGraph'

class SuggestionChart extends React.Component {
  render() {
    let chartData = this.props.data || []

    chartData = chartData.map((point) => {
      return {
        open: Number(point[1].toFixed(2)),
        high: Number(point[2].toFixed(2)),
        close: Number(point[3].toFixed(2)),
        date: point[0],
      }
    })

    if (!this.props.allData) {
      chartData = chartData.slice(0,120)
    }
    chartData.reverse()

    let chartTheme =  'light'
    let gridOpacity = 0.05

    let color = {
      positive: '#27A5F9',
      negative: '#49494A'
    }

    if (this.props.action === 'SELL') {
      color = {
        negative: '#fff',
        positive: '#49494A'
      }
      chartTheme =  'dark'
      gridOpacity = 0.25
    }

    var config = {
      "type": "serial",
      "dataProvider": chartData,
      "theme": chartTheme,
      "marginRight": 0,
      "marginLeft": 60,
      "marginTop": 25,
      "marginBottom": 25,
      "autoMargins" : false,
      "valueAxes": [{
          "id": "v1",
          unit: '$',
          unitPosition: 'left',
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true,
          gridAlpha: gridOpacity,
      }],
      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#27A5F9',
        borderThickness: 1,
      },

      chartCursor: {
	        valueLineEnabled: true,
	        valueLineAlpha: 0.5,
	        cursorAlpha: 0.5
	    },
      categoryField: "date",
      categoryAxis: {
        parseDates: true,
        gridAlpha: 0,
        axisAlpha: 0,
      },
    };

    const graphs = [
        {
          "id": "suggestion",
          lineColor: color.negative,
          "lineThickness": 2,
          "negativeLineColor": color.positive,
          "negativeBase": this.props.suggestedPrice + 0.001,
          "valueField": "close",
          "balloonText": `<div class="suggestion-balloon"><p class="ticker">${this.props.ticker}</p> <p>$[[value]]</p></div>`
      }]

    let guides = [{
        "value" : this.props.suggestedPrice + 0.001,
        "lineColor" : color.positive,
        "lineAlpha": 0.4,
        "lineThickness": 1,
        "position" : "right"
    }]

    return (<div id="suggestion-chart">
              <LineGraph data={chartData} graphs={graphs} guides={guides} unit="$" chartTheme={chartTheme} gridOpacity={gridOpacity}/>
            </div>)
  }
}

export default SuggestionChart
