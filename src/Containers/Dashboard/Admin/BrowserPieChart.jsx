/* eslint-disable */
import React from 'react'
import '../../../libraries/amcharts/pie.js'

const BrowserPieChart = React.createClass({
  render () {
    var config = {
      "type": "pie",
      "dataProvider": [{
        "title": this.props.title,
        "value": this.props.value,
      }, {
        "title": "",
        "value": this.props.max - this.props.value,
      }],
      "titleField": "title",
      "valueField": "value",
      "balloonText": `[[value]]`,
      "radius": "40%",
      "innerRadius": "70%",
      labelsEnabled: false,
      colors: ['#27A5F9', '#F3F3F3']
    };

    return (
      <div className="browserChart">
        {React.createElement(AmCharts.React, config)}
        <h3>{this.props.title}</h3>
      </div>
    )
  }
})

export default BrowserPieChart
