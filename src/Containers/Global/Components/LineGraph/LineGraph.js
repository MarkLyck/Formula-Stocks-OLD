import React from 'react'
import store from '../../../../store'
import _ from 'underscore'
import '../../../../libraries/amcharts3-react';
import './lineGraph.css'

const AmCharts = window.AmCharts

export default function LineGraph({ data, graphs, chartTheme, unit, unitPosition, minimum, maximum, baseValue, logarithmic, minorGridEnabled, marginRight, marginTop, guides, axisAlpha, gridOpacity, cursorColor }) {
  let config = {
    type: "serial",
    theme: chartTheme ? chartTheme : "light",
    addClassNames: true,
    dataProvider: data,
    marginRight: marginRight ? marginRight : 0,
    marginTop: marginTop ? marginTop : 0,
    balloon: {
      color: '#49494A',
      fillAlpha: 1,
      borderColor: '#27A5F9',
      borderThickness: 2,
    },
    graphs: graphs,
    valueAxes: [{
      axisAlpha: axisAlpha ? axisAlpha : 0,
      logarithmic: logarithmic ? true : false,
      unit: unit,
      unitPosition: unitPosition ? unitPosition : 'left',
      gridAlpha: gridOpacity ? gridOpacity : 0.15,
      minorGridEnabled: minorGridEnabled ? true : false,
      dashLength: 0,
      inside: false,
      baseValue: baseValue ? baseValue : 0,
      minimum: minimum,
      maximum: maximum,
      strictMinMax: true,
    }],
    guides: guides ? guides : [],
    chartCursor: {
        valueLineEnabled: true,
        valueLineAlpha: 0.5,
        cursorAlpha: 0.5,
        cursorColor: cursorColor ? cursorColor : '#49494A',
    },
    categoryField: "date",
    categoryAxis: {
      parseDates: true,
      equalSpacing: true,
      gridAlpha: gridOpacity ? gridOpacity : 0.15,
      axisAlpha: axisAlpha ? axisAlpha : 0,
    },
    export: {
      enabled: false
    }
  }

  if (store.session.browserType() === 'Safari') {
    config.dataDateFormat = "YYYY-M-D"
    config.categoryAxis = {
      equalSpacing: true,
    }
  }
  if (data.length && graphs.length) {
    return React.createElement(AmCharts.React, config)
  } else {
    return <div></div>
  }
}
