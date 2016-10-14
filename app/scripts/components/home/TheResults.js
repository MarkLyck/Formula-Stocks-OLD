import React from 'react'
import $ from 'jquery'
import store from '../../store'
import Scroll from 'react-scroll'

import unnamedChartComponent from '../../libraries/amcharts3-react';

const TheResults = React.createClass({
  getInitialState() {
    return {fetched: false, logarithmic:true, animate: true}
  },
  componentDidMount() {
    $(window).on('scroll', this.animate)
    store.plans.on('change', this.drawGraph)
    store.market.data.on('change', this.drawGraph)
  },
  componentWillUnmount() {
    $(window).off('scroll', this.animate)
    store.plans.off('change', this.drawGraph)
    store.market.data.off('change', this.drawGraph)
  },
  animate() {
    let hT = $(this.refs.subtitle).offset().top
    let hH = $(this.refs.subtitle).outerHeight() + 250
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.setState({animate: true})
      $(window).off('scroll', this.animate)
    };
  },
  drawGraph() {
    this.setState({fetched: true})
  },
  toggleLogScale() {
    this.setState({logarithmic: !this.state.logarithmic})
  },
  render() {
    let Element = Scroll.Element;
    let basicData = store.plans.get('basic').get('annualData')
    let premiumData = store.plans.get('premium').get('annualData')
    let businessData = store.plans.get('business').get('annualData')
    // let fundData = store.plans.get('fund').get('annualData')


    let marketData = store.market.data.get('annualData')

    let fixedData = basicData.map((point, i) => {

      let premiumBalance = 0
      let businessBalance = 0
      // let fundBalance = 0
      let marketBalance = 0

      if (premiumData[i]) { premiumBalance = premiumData[i].balance }
      if (businessData[i]) { businessBalance = businessData[i].balance }
      // if (fundData[i]) { fundBalance = fundData[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }

      return {
        basic: point.balance,
        premium: premiumBalance,
        business: businessBalance,
        // fund: fundBalance,
        market: marketBalance,

        basicBalloon: formatPrice(point.balance),
        premiumBalloon: formatPrice(premiumBalance),
        businessBalloon: formatPrice(businessBalance),
        // fundBalloon: formatPrice(fundBalance),
        marketBalloon: formatPrice(marketBalance),

        date: `${point.date.year}-${point.date.month}-${point.date.day}`
      }
    })

    function formatPrice(value) {
  		while(/(\d+)(\d{3})/.test(value.toString())) {
  			value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  		}
  		let price = '$' + value;
  		return price;
  	}

    let chartData = []
    if (this.state.animate && this.state.fetched) {
      chartData = fixedData;
    }

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
      // dataDateFormat: "YYYY-M-D",
      categoryAxis: {
        parseDates: true,
        equalSpacing: true,
      },

    };

    if (store.session.browserType() === 'Safari') {
      config.dataDateFormat = "YYYY-M-D",
      config.categoryAxis = {
        equalSpacing: true,
      }
    }

    let chart = (<div id="result-chart" className={this.state.chartClass}></div>)


    if (chartData[0]) {
      chart = (
        <div id="result-chart" className={this.state.chartClass}>
          {React.createElement(AmCharts.React, config)}
        </div>
      )
    }

    return (
      <section className="the-results">
        <Element name="performance"></Element>
        <div className="content" ref="content">
          <h2 className="title">Performance</h2>
          <div className="divider"></div>
          <h3 className="subtitle" onClick={this.toggleLogScale} ref="subtitle">Log graph</h3>
          {chart}
          <h2 className="second title">Formula Stocks vs. S&P 500</h2>
          <p>
            Log scale graph of Formula Stocks products (white) versus S&P 500 (gray).
            The observed outperformance is the result of cumulatively 9,800 buy & sell recommendations.
            To date the winners of the future have been identified with an accuracy of 89%, 92%, and 94%,
            respectively*. Random stocks measured by the same yardstick win ~59% of the time.
            The difference is very significant.<br/><br/>

            Formula Stocks’ strategies have outperformed the S&P 500 between 71% and 88% of the time.
            Modern risk benchmarks indicate that Formula Stocks’ strategies exhibit
            less risk than the general market. Results after 2009 launch are those of following
            the strategy in real-time. Results before 2009 are back-tested.
          </p>
        </div>
      </section>
    )
  }
})

export default TheResults
