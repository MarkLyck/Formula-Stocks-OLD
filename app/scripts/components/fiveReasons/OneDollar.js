import React from 'react'
import $ from 'jquery'

import store from '../../store'

function commafy(num){
  var parts = (''+(num<0?-num:num)).split("."), s=parts[0], L, i=L= s.length, o='';
  while(i--){ o = (i===0?'':((L-i)%3?'':','))
                  +s.charAt(i) +o }
  return (num<0?'-':'') + o + (parts[1] ? '.' + parts[1] : '');
}

const OneDollar = React.createClass({
  getInitialState() {
    return {fs: 1, market: 1, plan: 'premium', currYear: 0, fsPercent: 0, spPercent: 0}
  },
  componentDidMount() {
    $(window).on('scroll', this.animate)
  },
  componentWillUnmount() {
    $(window).off('scroll', this.animate)
  },
  animate() {
    let hT = $(this.refs.content).offset().top
    let hH = $(this.refs.content).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.updateNumbers()
      $(window).off('scroll', this.animate)
    };
  },
  updateNumbers(plan) {
    let fs = this.state.fs
    let sp = this.state.market
    let year = this.state.currYear

    if (plan) {
      plan = plan
      fs = 1;
      sp = 1;
      year = 0;
    } else {
      plan = this.state.plan
    }

    let multiplier
    if(plan === 'basic') {multiplier = store.plans.basic.cagr / 100 + 1}
    if(plan === 'premium') {multiplier = store.plans.premium.cagr / 100 + 1}
    if(plan === 'business') {multiplier = store.plans.business.cagr / 100 + 1}
    if(plan === 'fund') {multiplier = store.plans.fund.cagr / 100 + 1}

    fs = fs * multiplier
    sp = sp * 1.1047


    this.setState({
      fs: fs.toFixed(2),
      market: sp.toFixed(2),
      currYear: year + 1,
      plan: plan,
      fsPercent: year / 45,
      spPercent: sp / Math.pow((1 * multiplier), 45)
    })

    if (year < 44) {
      window.setTimeout(this.updateNumbers, 20)
    }
  },
  render() {
    let fsStyle = {
      width: this.state.fsPercent * 100 + '%'
    }

    let spStyle = {
      width: `calc(${this.state.spPercent * 100 + '%'} + 1px)`
    }

    let basClass, preClass, busClass, funClass;
    if (this.state.plan === 'basic') {basClass='selected'}
    if (this.state.plan === 'premium') {preClass='selected'}
    if (this.state.plan === 'business') {busClass='selected'}
    if (this.state.plan === 'fund') {funClass='selected'}

    return (
      <div className="bg-gray split-section one-dollar">
        <div className="content" ref='content'>
          <div className="left">
            <div className="plans">
              <button onClick={this.updateNumbers.bind(null, 'basic')} className={basClass}>Basic</button>
              <button onClick={this.updateNumbers.bind(null, 'premium')} className={preClass}>Premium</button>
              <button onClick={this.updateNumbers.bind(null, 'business')} className={busClass}>Business</button>
              <button onClick={this.updateNumbers.bind(null, 'fund')} className={funClass}>Fund</button>
            </div>
            <div className="fs bar" style={fsStyle}><p>${commafy(Math.round(this.state.fs))}</p></div>
            <p className="fs plan-name">{this.state.plan} product</p>

            <div className="market-bar-container">
            <div className="market bar" style={spStyle}></div><p>${Math.round(this.state.market)}</p>
            </div>
            <p className="plan-name">S&P 500</p>
          </div>
          <div className="right">
            <h2 className="title">$1 and 45 years</h2>
            <p>
              This is how much 1 dollar could have grown over 45 years.
              If you had invested it either in the market (S&P 500)
              or a Formula Stocks strategy*
            </p>
          </div>
          </div>
      </div>
    )
  }
})

export default OneDollar
