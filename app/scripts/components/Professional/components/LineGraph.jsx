import React from 'react'
import store from '../../../store'
import _ from 'underscore'
import '../../../libraries/amcharts3-react';

let testData = [
  {
    business:25000,
    businessBalloon:"$25,000",
    date:"1970-01-31",
    market:25000,
    marketBalloon:"$25,000",
    premium:25000,
    premiumBalloon:"$25,000"
    fund:25000,
    fundBalloon:"$25,000"
  },
  {
    business:25922,
    businessBalloon:"$25,922",
    date:"1970-11-30",
    market:25588,
    marketBalloon:"$25,588",
    premium:25924,
    premiumBalloon:"$25,924"
    fund:25800,
    fundBalloon:"$25,000"
  }
]

export default function LineGraph(testData, graphs) {
  let config = {
    type: "serial",
    theme: "dark",
    addClassNames: true,
    dataProvider: testData,
    balloon: {
      color: '#49494A',
      fillAlpha: 1,
      borderColor: '#FFFFFF',
      borderThickness: 0,
    },
    graphs: graphs,
    valueAxes: [{
      unit: '$',
      unitPosition: 'left',
      gridAlpha: 0.15,
      minorGridEnabled: true,
      dashLength: 0,
      inside: true,
    }],

    chartCursor: {
        valueLineEnabled: true,
        valueLineAlpha: 0.5,
        fullWidth: true,
        cursorAlpha: 0.5
    },

    categoryField: "date",
    categoryAxis: {
      parseDates: true,
      equalSpacing: true,
    },

  }

  if (store.session.browserType() === 'Safari') {
    config.dataDateFormat = "YYYY-M-D",
    config.categoryAxis = {
      equalSpacing: true,
    }
  }

  return React.createElement(AmCharts.React, config)
}
