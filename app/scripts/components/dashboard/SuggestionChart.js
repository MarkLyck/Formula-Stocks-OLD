import React from 'React'


const SuggestionChart = React.createClass({
  render() {
    // console.log(this.props.data);


    let chartData = this.props.data || []
    chartData = chartData.map((point) => {
      // console.log(point[1]);
      // console.log(point[2]);
      // console.log(point[3]);
      if(point[1] === null) {
        console.log(this.props.data);
      }
      return {
        open: Number(point[1].toFixed(2)),
        high: Number(point[2].toFixed(2)),
        close: Number(point[3].toFixed(2)),
        date: point[0]
      }
    })
    chartData = chartData.slice(0,30)
    chartData = chartData.reverse()


    // console.log(chartData);
    let color = {
      positive: '#12D99E',
      negative: '#da1354'
    }

    var config = {
      "type": "serial",
      "dataProvider": chartData,
      "theme": "light",
      "marginRight": 0,
      "marginLeft": 0,
      "valueAxes": [{
          "id": "v1",
          unit: '$',
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth":true,
          inside: true,
      }],
      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#27A5F9',
        borderThickness: 1,
      },
      "graphs": [
          {
            "id": "suggestion",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            lineColor: color.negative,
            // "fillAlphas": 0.75,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "negativeLineColor": color.positive,
            "negativeBase": this.props.suggestedPrice + 0.01,
            "valueField": "close",
            "balloonText": "<span style='font-size:18px;'>$[[value]]</span>"
        }
      ],
      chartCursor: {
	        valueLineEnabled: true,
	        valueLineAlpha: 0.5,
	        // fullWidth: true,
	        cursorAlpha: 0.5
	    },
    //   "chartScrollbar": {
    //     "autoGridCount": true,
    //     "graph": "suggestion",
    //     "scrollbarHeight": 40
    // },
      categoryField: "date",
      categoryAxis: {
        parseDates: true,
      }
    };





    let chart = (
      <div id="suggestion-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return chart
  }
})

export default SuggestionChart
