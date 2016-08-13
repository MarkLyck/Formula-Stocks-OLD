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
    let annualData = store.plans.premium.data.get('annualData')
    let fixedData = annualData.map((point) => {
      return {
        value: point.balance,
        date: `${point.date.year}-${point.date.month}-${point.date.day}`
      }
    })

    function formatLabel(value) {
  		// while(/(\d+)(\d{3})/.test(value.toString())) {
  		// 	value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  		// }
		  // return "$" + value;
      console.log(value);
      return 'test'
	  }

    function formatLabel(value) {
  		// while(/(\d+)(\d{3})/.test(value.toString())) {
  		// 	value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  		// }
		  // return "$" + value;
      console.log(value);
      return 'test'
	  }

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
        hideBulletsCount: 50,
        lineThickness: 2,
        title: "red line",
        useLineColorForBulletBorder: true,
        valueField: "value",
        balloonText: "<span style='font-size:18px;'>$[[value]]</span>"
      }],

      valueAxes: [{
        logarithmic: true,
        dashLength: 1,

        guides: [{
            dashLength: 6,
            inside: true,
            label: "average",
            lineAlpha: 1,
            value: 90.4
        }],
        unit: '$',
        unitPosition: 'left',
        position: "left",
        // "labelText": "test"
        // "labelFunction": function() {
        //   return 'test'
        // }
			}],

      chartScrollbar: {
  	    enabled: true,
  	    scrollbarHeight: 10,
  	    dragIconWidth: 20
      },

      chartCursor: {
	        valueLineEnabled: true,
	        valueLineBalloonEnabled: false,
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
