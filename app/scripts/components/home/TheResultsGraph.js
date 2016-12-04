import React from 'react'
import store from '../../store'
import _ from 'underscore'
import '../../libraries/amcharts3-react';

let testData = [
  {
    basic: 25000,
    basicBalloon:"$25,000",
    business:25000,
    businessBalloon:"$25,000",
    date:"1970-01-31",
    market:25000,
    marketBalloon:"$25,000",
    premium:25000,
    premiumBalloon:"$25,000"
  },
  {
    basic: 27914,
    basicBalloon:"$27,914",
    business:25922,
    businessBalloon:"$25,922",
    date:"1970-11-30",
    market:25588,
    marketBalloon:"$25,588",
    premium:25924,
    premiumBalloon:"$25,924"
  }
]

export default function TheResultsGraph(chartData) {
  let config = {
    type: "serial",
    theme: "dark",
    addClassNames: true,
    dataProvider: chartData,

    balloon: {
      color: '#49494A',
      fillAlpha: 1,
      borderColor: '#FFFFFF',
      borderThickness: 0,
    },

    graphs: [
      {
        id: "market",
        lineColor: "#49494A",

        bullet: "square",
        bulletBorderAlpha: 1,
        bulletColor: "#FFFFFF",
        bulletSize: 5,
        hideBulletsCount: 10,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: "market",
        "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">S&P 500</span><span class=\"balloon-value\">[[marketBalloon]]</span></div>",
      },
      {
      id: "basic",
      lineColor: "#FFFFFF",

      bullet: "square",
      bulletBorderAlpha: 1,
      bulletColor: "#FFFFFF",
      bulletSize: 5,
      hideBulletsCount: 10,
      lineThickness: 2,
      useLineColorForBulletBorder: true,
      valueField: "basic",
      balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Basic</span><span class=\"balloon-value\">[[basicBalloon]]</span></div>"
    },
    {
      id: "premium",
      lineColor: "#FFFFFF",

      bullet: "square",
      bulletBorderAlpha: 1,
      bulletColor: "#FFFFFF",
      bulletSize: 5,
      hideBulletsCount: 10,
      lineThickness: 2,
      useLineColorForBulletBorder: true,
      valueField: "premium",
      balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">[[premiumBalloon]]</span></div>"
    },
    {
      id: "business",
      lineColor: "#FFFFFF",

      bullet: "square",
      bulletBorderAlpha: 1,
      bulletColor: "#FFFFFF",
      bulletSize: 5,
      hideBulletsCount: 10,
      lineThickness: 2,
      useLineColorForBulletBorder: true,
      valueField: "business",
      "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">[[businessBalloon]]</span></div>",
    },
    // {
    //   id: "fund",
    //   lineColor: "#fff",
    //
    //   bullet: "square",
    //   bulletBorderAlpha: 1,
    //   bulletColor: "#FFF",
    //   bulletSize: 5,
    //   hideBulletsCount: 10,
    //   lineThickness: 2,
    //   useLineColorForBulletBorder: true,
    //   valueField: "fund",
    //   "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Fund</span><span class=\"balloon-value\">[[fundBalloon]]</span></div>",
    // }
  ],
    valueAxes: [{
      logarithmic: true,
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
