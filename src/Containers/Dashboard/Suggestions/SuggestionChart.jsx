/* eslint-disable */
import React from 'react'
import LineGraph from '../../../components/Graphs/LineGraph/LineGraph'

class SuggestionChart extends React.Component {
  render() {
    let chartData = this.props.data || []

    chartData = chartData.map((point) => {
      return {
        close: Number(point[1].toFixed(2)),
        date: point[0],
      }
    })
    chartData.reverse()

    let chartTheme =  'light'
    let gridOpacity = 0.05

    let guideColor = '#27A5F9'
    let color = { positive: '#27A5F9', negative: '#49494A' }
    let cursorColor = '#49494A'

    if (this.props.action === 'SELL') {
      color = { negative: '#12D99E', positive: '#49494A' }
      guideColor = '#12D99E'
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
        "lineColor" : guideColor,
        "lineAlpha": 0.4,
        "lineThickness": 1,
        "position" : "right"
    }]

    return (<div id="suggestion-chart">
              <LineGraph data={chartData} graphs={graphs} cursorColor={cursorColor} guides={guides} unit="$" chartTheme={chartTheme} gridOpacity={gridOpacity} insideY={true} insideX={false}/>
            </div>)
  }
}

export default SuggestionChart
