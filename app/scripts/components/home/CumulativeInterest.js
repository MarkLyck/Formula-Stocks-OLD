import React from 'react'
import $ from 'jquery'

const CumulativeInterest = React.createClass({
  getInitialState() {
    return {cagr: 25, investment: 10000, years: 20}
  },
  componentDidMount: function() {
    this.refs.cagrSlider.value = 25
    this.refs.investmentSlider.value = 1000
    self = this

    $(this.refs.cagrSlider).on("change", function() {
      $('#cagrValue').val(this.value + "%" );
      self.setState({cagr: this.value})
    }).trigger("change");
    $(this.refs.investmentSlider).on("change", function() {
      $('#investmentValue').val('$' + this.value);
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
    console.log(this.state.cagr);
    console.log(this.state.investment);
    let chartData = []
    let currentValue = this.state.investment
    for(let i=0; i <= this.state.years; i++) {
      currentValue = currentValue * (this.state.cagr / 100 + 1)
      chartData.push({value: currentValue.toFixed(0), year: i})
    }
    return chartData
  },
  render() {
    console.log(this.calculateData());

    var config = {
      type: "serial",
      theme: "light",
      addClassNames: true,

      "dataProvider": this.calculateData(),

      balloon: {
        color: '#49494A',
        fillAlpha: 1,
        borderColor: '#49494A',
        borderThickness: 1,
      },

      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 1,
        // "lineAlpha": 0.2,
        lineColor:  "#27A5F9",
        "type": "column",
        "valueField": "value"
      } ],

      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
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
        "tickPosition": "start",
        "tickLength": 20
      },
    };

    let chart = (
      <div id="bar-chart">
        {React.createElement(AmCharts.React, config)}
      </div>
    )

    return (
      <section className="cumulative-interest split-section">
        <h2>Cumulative <span className="blue">Interest</span> Calculator</h2>
        <div className="divider"></div>

        <div className="content">
          <div className="left">

          <div className="slider">
            <input type = "range" min="0" max="40" step="1" ref="cagrSlider"/>
            <output id="cagrValue">50</output>
          </div>

          <div className="slider">
            <input type = "range" min="0" max="10000" step="100" ref="investmentSlider"/>
            <output id="investmentValue">50</output>
          </div>

          </div>
          <div className="right">
            {chart}
          </div>
        </div>
        <p className="disclaimer">
          The forgoing is for illustration purposes only. It is not a representation, warranty or gurantee of future investment performance.
          Elements of stock investments involve varying degrees of risk. Projected returns assumes that all dividends are reinvested.
          Market CAGR is set to 10.71% based on S&P 500 performance from 1970 to 2015 and also assumes all dividens are reinvested.
        </p>
      </section>
    )
  }
})

export default CumulativeInterest
