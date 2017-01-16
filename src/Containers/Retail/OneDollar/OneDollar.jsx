/* eslint-disable */

import React from 'react'
import $ from 'jquery'

import store from '../../../store'
import cc from '../../../cc'

import './oneDollar.css'

class OneDollar extends React.Component {
  constructor(props) {
    super(props)

    this.resetState = this.resetState.bind(this)
    this.animate = this.animate.bind(this)
    this.changePlan = this.changePlan.bind(this)
    this.updateNumbers = this.updateNumbers.bind(this)
    this.state = {fs: 1, market: 1, plan: 'premium', currYear: 0, fsPercent: 0, spPercent: 0}
  }

  componentDidMount() {
    $(window).on('scroll', this.animate)
    store.plans.on('change', this.resetState)
  }

  componentWillUnmount() {
    $(window).off('scroll', this.animate)
    store.plans.off('change', this.resetState)
  }

  resetState() {
    this.setState({fs: 1, market: 1, plan: 'premium', currYear: 0, fsPercent: 0, spPercent: 0})
  }

  animate() {
    let hT = $(this.refs.content).offset().top
    let hH = $(this.refs.content).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.updateNumbers()
      $(window).off('scroll', this.animate)
    }
  }

  changePlan(plan) {
    mixpanel.track("One dollar")
    this.updateNumbers(plan)
  }

  updateNumbers(plan) {
    let fs = this.state.fs
    let sp = this.state.market
    let year = this.state.currYear

    if (plan) {
      plan = plan
      fs = 1
      sp = 1
      year = 0
    } else {
      plan = this.state.plan
    }

    let multiplier = (store.plans.get(plan).get('stats').CAGR / 100 + 1)

    fs = fs * multiplier;
    sp = sp * (store.market.cagr / 100 + 1)

    if(fs > Math.pow((1 * multiplier), 45)) {
      fs = Math.pow((1 * multiplier), 45)
    }
    if (sp > Math.pow((1 * (store.market.cagr / 100 + 1)), 45)) {
      sp = Math.pow((1 * (store.market.cagr / 100 + 1)), 45)
    }

    if (multiplier > 1) {
      this.setState({
        fs: fs.toFixed(2),
        market: sp.toFixed(2),
        currYear: year + 1,
        plan: plan,
        fsPercent: year / 45,
        spPercent: sp / Math.pow((1 * multiplier), 45),
        reAnimate: false
      });
    }
    if (year < 44) {
      window.setTimeout(this.updateNumbers, 20)
    }
  }

  render() {
    let fsStyle = {
      width: this.state.fsPercent * 100 + '%'
    }

    let spStyle = {
      width: `calc(${this.state.spPercent * 100 + '%'} + 1px)`
    }

    let basClass, preClass, busClass;
    if (this.state.plan === 'basic') { basClass='selected' }
    if (this.state.plan === 'premium') { preClass='selected' }
    if (this.state.plan === 'business') { busClass='selected' }

    return (
      <section className="split-section one-dollar">
        <div className="beside" ref='content'>
          <div className="left">
            <div className="plans">
              <button onClick={this.changePlan.bind(null, 'basic')} className={basClass}>Basic<div></div></button>
              <button onClick={this.changePlan.bind(null, 'premium')} className={preClass}>Premium<div></div></button>
              <button onClick={this.changePlan.bind(null, 'business')} className={busClass}>Business<div></div></button>
            </div>
            <div className="fs bar" style={fsStyle}><p>${cc.commafy(Math.round(this.state.fs))}</p></div>
            <p className="fs plan-name"><span className="capitalize">{this.state.plan}</span> product</p>

            <div className="market-bar-container">
              <div className="market bar" style={spStyle}></div><p>${Math.round(this.state.market)}</p>
              </div>
            <p className="plan-name">S&P 500</p>
          </div>
          <div className="right">
            <h2 className="title">$1 and 47 years</h2>
            <p>
              How much could 1 dollar have grown over the last 47 years, had it been invested
              with Formula Stocks?<br/><br/>

              We did the math, and you can compare it to the S&P 500 here.<br/><br/>

              Select Basic, Premium or Business, to see the difference.
            </p>
            <p className="disclaimer">
              <sup>*</sup>In a tax-free account, excluding trading costs and slippage. Calculation
              involves backtesting. Past performance is not neccesarily indicative of future results.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default OneDollar
