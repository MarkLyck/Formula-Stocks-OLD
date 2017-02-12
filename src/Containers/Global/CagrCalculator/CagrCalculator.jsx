/* eslint-disable */

import React from 'react'
import $ from 'jquery'

import store from '../../../store'
import cc from '../../../cc'

import './cagrCalculator.css'

class CagrCalculator extends React.Component{
  constructor(props) {
    super(props)
    this.animate = this.animate.bind(this)

    this.state = { cagr: 25, investment: 10000, years: 20, animate: false, startDuration: 0.75 }
  }

  componentDidMount() {
    $(window).on('scroll', this.animate)
    this.refs.cagrSlider.value = 18
    this.refs.investmentSlider.value = 10000
    const self = this

    $(this.refs.cagrSlider).on("change", function() {
      $('#cagrValue').val('Annual growth: ' + this.value + "%" );
      if (self.state.animate) {
        self.setState({cagr: this.value, startDuration: 0})
      } else {
        self.setState({cagr: this.value})
      }
    }).trigger("change");
    $(this.refs.investmentSlider).on("change", function() {
      $('#investmentValue').val('Investment: $' + cc.commafy(this.value));
      if (self.state.animate) {
        self.setState({investment: this.value, startDuration: 0})
      } else {
        self.setState({investment: this.value})
      }
    }).trigger("change");

    $('input[type=range]').on('input', function(e){
      var min = e.target.min,
          max = e.target.max,
          val = e.target.value;

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }).trigger('input');

  }

  componentWillUnmount() {
      $(window).off('scroll', this.animate)
  }

  animate() {
    let hT = $(this.refs.chart).offset().top
    let hH = $(this.refs.chart).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.setState({animate: true})
      $(window).off('scroll', this.animate)
    };
  }

  calculateData() {

    let currentValue = this.state.investment
    let currentMarketValue = this.state.investment

    let chartData = []

    for(let i=0; i < this.state.years; i++) {
      currentValue = currentValue * (this.state.cagr / 100 + 1)
      currentMarketValue = currentMarketValue * (store.market.cagr / 100 + 1)
      chartData.push({value: currentValue.toFixed(0), market: currentMarketValue.toFixed(0), year: i + 1})
    }
    if (this.state.animate) {
      return chartData
    } else {
      return []
    }
  }

  render() {
    var config = {
      type: "serial",
      theme: "light",
      addClassNames: true,
      "startDuration": this.state.startDuration,
      "dataProvider": this.calculateData(),

      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#49494A',
        borderThickness: 1,
      },

      "graphs": [
        {
          id: "cumulative",
          "balloonText": `${this.state.cagr}% cagr <br/>Year [[category]]<br/> <b>$[[value]]</b>`,
          "fillAlphas": 1,
          lineColor:  "#27A5F9",
          "type": "column",
          "valueField": "value"
        },
        {
          id: "market",
          "balloonText": "S&P 500 <br/>Year [[category]]<br/> <b>$[[value]]</b>",
          "fillAlphas": 1,
          lineColor:  "#555",
          "type": "column",
          "valueField": "market"
        }
      ],

      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0,
        unit: '$',
        unitPosition: 'left',
        "stackType": "3d",
      }],

      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },

      "categoryField": "year",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
      },
    };

    let chart = (
      <div id="bar-chart" ref="chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return (
      <section className="cumulative-interest split-section section">
        <h2>Cumulative <span className="blue-color">interest</span> calculator</h2>
        <div className="divider"></div>

        <div className="content">
          <div className="left">

          <div className="slider">
            <input type="range" min="0" max="35" step="1" ref="cagrSlider"/>
            <output id="cagrValue">50</output>
          </div>

          <div className="slider">
            <input type="range" min="0" max="50000" step="1000" ref="investmentSlider"/>
            <output id="investmentValue">50</output>
          </div>

          </div>
          <div className="right">
            <div className="chart-indicators">
              <div className="chart-indicator blue-color">Annual growth: {this.state.cagr}%</div>
              <div className="chart-indicator black">S&P 500</div>
            </div>
            {chart}
          </div>
        </div>
        <p className="disclaimer">
          The above is for illustration purposes only. It does not represent,
          warrant, or guarantee any level of future investment performance.
          It is a standard compound interest calculator, which visualizes any specified level of
          return relative to the market return. Market CAGR is indicated at 10.71% based on
          S&P 500 performance from 1970 to 2015 with dividends reinvested.
        </p>
      </section>
    )
  }
}

export default CagrCalculator
