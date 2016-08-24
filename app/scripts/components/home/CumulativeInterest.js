import React from 'react'
import $ from 'jquery'

import store from '../../store'

const CumulativeInterest = React.createClass({
  getInitialState() {
    return {cagr: 25, investment: 10000, years: 20}
  },
  componentDidMount: function() {
    this.refs.cagrSlider.value = 25
    this.refs.investmentSlider.value = 1000
    self = this

    $(this.refs.cagrSlider).on("change", function() {
      $('#cagrValue').val('CAGR: ' + this.value + "%" );
      self.setState({cagr: this.value})
    }).trigger("change");
    $(this.refs.investmentSlider).on("change", function() {
      $('#investmentValue').val('Investment: $' + this.value);
      self.setState({investment: this.value})
    }).trigger("change");

    $('input[type=range]').on('input', function(e){
      var min = e.target.min,
          max = e.target.max,
          val = e.target.value;

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }).trigger('input');

  },
  calculateData() {

    let currentValue = this.state.investment
    let currentMarketValue = this.state.investment
    let chartData = [{value: currentValue, market: currentMarketValue, year: 0}]
    for(let i=0; i < this.state.years; i++) {
      currentValue = currentValue * (this.state.cagr / 100 + 1)
      currentMarketValue = currentMarketValue * (store.market.cagr / 100 + 1)
      chartData.push({value: currentValue.toFixed(0), market: currentMarketValue.toFixed(2), year: i + 1})
    }
    return chartData
  },
  render() {
    var config = {
      type: "serial",
      theme: "light",
      addClassNames: true,
      "startDuration": 0.75,
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
      <div id="bar-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return (
      <section className="cumulative-interest split-section">
        <h2>Cumulative <span className="blue-color">Interest</span> Calculator</h2>
        <div className="divider"></div>

        <div className="content">
          <div className="left">

          <div className="slider">
            <input type = "range" min="0" max="35" step="1" ref="cagrSlider"/>
            <output id="cagrValue">50</output>
          </div>

          <div className="slider">
            <input type = "range" min="0" max="10000" step="100" ref="investmentSlider"/>
            <output id="investmentValue">50</output>
          </div>

          </div>
          <div className="right">
            <div className="chart-indicators">
              <div className="chart-indicator blue-color">CAGR: {this.state.cagr}%</div>
              <div className="chart-indicator black">S&P 500</div>
            </div>
            {chart}
          </div>
        </div>
        <p className="disclaimer">
          The forgoing is for illustration purposes only. It is not a representation, warranty or gurantee of future investment performance.
          Elements of stock investments involve varying degrees of risk. Projected returns assumes that all dividends are reinvested.
          Market CAGR is set to 10.71% based on S&P 500 performance from 1970 to 2015 with dividends reinvested.
        </p>
      </section>
    )
  }
})

export default CumulativeInterest
