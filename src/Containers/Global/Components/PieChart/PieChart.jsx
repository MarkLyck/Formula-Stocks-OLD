/* eslint-disable */
import React from 'react'
import '../../../../libraries/amcharts/pie.js'

const PieChart = ({ title, data, colors, unit }) => {

  const config = {
    type: "pie",
    dataProvider: data,
    titleField: "title",
    valueField: "value",
    balloonText: `[[title]]<br/>[[value]]${unit ? unit : ''}`,
    radius: "40%",
    innerRadius: "70%",
    labelsEnabled: false,
    colors: colors
  }

  return (
    <div className="browserChart">
      {React.createElement(AmCharts.React, config)}
      <h3>{title}</h3>
    </div>
  )
}

export default PieChart
