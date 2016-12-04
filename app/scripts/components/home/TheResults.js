import React from 'react'
import $ from 'jquery'
import store from '../../store'
import Scroll from 'react-scroll'
import TheResultsGraph from './TheResultsGraph'

import '../../libraries/amcharts3-react';

const TheResults = React.createClass({
  getInitialState() {
    return { fetched: false, animate: true }
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

      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }

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

        date: `${point.date.year}-${month}-${point.date.day}`
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

    // if (store.session.browserType() === 'Safari') {
    //   config.dataDateFormat = "YYYY-M-D",
    //   config.categoryAxis = {
    //     equalSpacing: true,
    //   }
    // }

    let chart = (<div id="result-chart" className={this.state.chartClass}></div>)

    if (chartData.length) {
      chart = (
        <div id="result-chart" className={this.state.chartClass}>
          {TheResultsGraph(chartData)}
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
            the strategies in real-time. Results before 2009 are back-tested.
          </p>
        </div>
      </section>
    )
  }
})

export default TheResults
