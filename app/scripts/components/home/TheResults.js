import React from 'react'
import store from '../../store'

import unnamedChartComponent from '../../libraries/amcharts3-react';

const TheResults = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentDidMount() {
    store.plans.basic.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.premium.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.business.data.on('change', () => {
      this.setState({fetched: true})
    })
    store.plans.fund.data.on('change', () => {
      this.setState({fetched: true})
    })
  },
  render() {
    let annualData = store.plans.business.data.get('annualData')
    let fixedData = annualData.map((point) => {
      return {
        value: point.balance,
        date: `${point.date.year}-${point.date.month}-${point.date.day}`
      }
    })

    // var chartData = [{title:"sample 1",value:130},{title:"sample 2",value:26}];
    var chartData = fixedData;
    var config = {
      type: "serial",
      theme: "dark",

      marginRight: 30,
	    marginTop: 17,
	    autoMarginOffset: 20,

      dataProvider: chartData,

      balloon: {
        borderThickness: 1,
        shadowAlpha: 0
      },

      graphs: [{
        id: "basic",
        lineColor: "#fff",

        balloon:{
          drop: true,
          adjustBorderColor: false,
          color:"#FFF"
        },

        bullet: "round",
        bulletBorderAlpha: 1,
        bulletColor: "#FFF",
        bulletSize: 5,
        hideBulletsCount: 100,
        lineThickness: 2,
        title: "red line",
        useLineColorForBulletBorder: true,
        valueField: "value",
        balloonText: "<span style='font-size:18px;'>$[[value]]</span>"
      }],

      valueAxes: [{
        logarithmic: true,
        unit: '$',
        unitPosition: 'left',
			}],

      chartScrollbar: {
  	    enabled: true,
  	    scrollbarHeight: 10,
  	    dragIconWidth: 20
      },

      chartCursor: {
	        valueLineEnabled: true,
	        // valueLineBalloonEnabled: true,
	        valueLineAlpha: 0.5,
	        fullWidth: true,
	        cursorAlpha: 0.5
	    },

      categoryField: "date",
      categoryAxis: {
        parseDates: true,
      },
    };





    let chart = (
      <div id="result-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

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
