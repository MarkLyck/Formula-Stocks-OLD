import React from 'react'
import store from '../../store'

import unnamedChartComponent from '../../libraries/amcharts3-react';

const TheResults = React.createClass({
  getInitialState() {
    return {plan: 'basic', fetched: false}
  },
  componentDidMount() {
    store.plans.basic.data.on('change', () => {
      this.setState({fetched: true})
    })
  },
  render() {
    console.log('rendering graph');
    if (!this.state.fetched) {
      return null
    }

    let annualData = store.plans[this.state.plan].data.get('annualData')
    let fixedData = annualData.map((point) => {
      return {
        value: point.balance,
        date: point.date
      }
    })
    console.log(fixedData);

    // var chartData = [{title:"sample 1",value:130},{title:"sample 2",value:26}];
    var chartData = fixedData;
    var config = {
      "type": "serial",
      "theme": "light",
      "graphs": [{
        "id": "g1",
        "balloon":{
          "drop": true,
          "adjustBorderColor": false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color":"#AAAAAA"
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable": true
      },
      "dataProvider": chartData
    };

    let chart = (
      <div id="result-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )
    ///<AmCharts.React config={config} />
    return (
      <section className="the-results">
        <div className="content">
          <h2>The Results</h2>
          {chart}
        </div>
      </section>
    )
  }
})

export default TheResults
