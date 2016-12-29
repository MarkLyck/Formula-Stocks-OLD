import React from 'react'
import store from '../../../store'
import _ from 'underscore'
import '../../../libraries/amcharts3-react';
// import '../../../libraries/amcharts/plugins/export/export.min.js';

export default function LineGraph({ data, graphs, unit, unitPosition, minimum, maximum, logarithmic, minorGridEnabled }) {
  // console.log(logarithmic)
  let config = {
    type: "serial",
    theme: "light",
    addClassNames: true,
    dataProvider: data,
    balloon: {
      color: '#49494A',
      fillAlpha: 1,
      borderColor: '#27A5F9',
      borderThickness: 2,
    },
    graphs: graphs,
    valueAxes: [{
      logarithmic: logarithmic ? true : false,
      unit: unit,
      unitPosition: unitPosition ? unitPosition : 'left',
      gridAlpha: 0.15,
      minorGridEnabled: minorGridEnabled ? true : false,
      dashLength: 0,
      inside: false,
      minimum: minimum,
      maximum: maximum,
      strictMinMax: true,
    }],
    chartCursor: {
        valueLineEnabled: true,
        valueLineAlpha: 0.5,
        cursorAlpha: 0.5
    },
    categoryField: "date",
    categoryAxis: {
      parseDates: true,
      equalSpacing: true,
    },
    export: {
      enabled: false
    }
  }

  if (store.session.browserType() === 'Safari') {
    config.dataDateFormat = "YYYY-M-D",
    config.categoryAxis = {
      equalSpacing: true,
    }
  }
  return React.createElement(AmCharts.React, config)
}
