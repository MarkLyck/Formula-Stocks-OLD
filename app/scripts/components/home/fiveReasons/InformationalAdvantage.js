import React from 'react'
import $ from 'jquery'

import store from '../../../store'

const InformationalAdvantage = React.createClass({
  getInitialState() {
    return ({
      fetched: false,
      animate: false,
      basic: 0,
      premium: 0,
      business: 0,
      fund: 0,
      market: 0,
    })
  },
  componentDidMount() {
    // store.plans.on('update', this.updateState)
    $(window).on('scroll', this.animate)
  },
  componentWillUnmount() {
    // store.plans.off('update', this.updateState)
    $(window).off()
  },
  updateState() {
    this.setState({fetched: true})
  },
  animate() {
    let hT = $(this.refs.content).offset().top
    let hH = $(this.refs.content).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.updateNumbers()
      if (Math.floor(store.plans.get('business').get('stats').WLRatio) !== 0) {
        $(window).off('scroll', this.animate)
      }
    };
  },
  updateNumbers() {
    let bas,pre,bus,fun,mar = 0
    this.state.basic < Math.floor(store.plans.get('basic').get('stats').WLRatio) ? bas = (this.state.basic + 1) : bas = Math.floor(store.plans.get('basic').get('stats').WLRatio)
    this.state.premium < Math.floor(store.plans.get('premium').get('stats').WLRatio) ? pre = (this.state.premium + 1) : pre = Math.floor(store.plans.get('premium').get('stats').WLRatio)
    this.state.business < Math.floor(store.plans.get('business').get('stats').WLRatio) ? bus = (this.state.business + 1) : bus = Math.floor(store.plans.get('business').get('stats').WLRatio)
    this.state.fund < Math.floor(store.plans.get('fund').get('stats').WLRatio) ? fun = (this.state.fund + 1) : fun = Math.floor(store.plans.get('fund').get('stats').WLRatio)
    this.state.market < 60 ? mar = (this.state.market + 1) : mar = 60

    this.setState({
      basic: bas,
      premium: pre,
      business: bus,
      fund: fun,
      market: mar,
    })



    // console.log(bus, Math.floor(store.plans.get('business').get('stats').WLRatio));
    if (bus < Math.floor(store.plans.get('business').get('stats').WLRatio)) {
      window.setTimeout(this.updateNumbers, 2)
    }
  },
  render() {

    let basStyle = {
      height: `calc(${this.state.basic}% + 45px)`
    }
    let preStyle = {
      height: `calc(${this.state.premium}% + 45px)`
    }
    let busStyle = {
      height: `calc(${this.state.business}% + 45px)`
    }
    let funStyle = {
      height: `calc(${this.state.fund}% + 45px)`
    }
    let marStyle = {
      height: `calc(${this.state.market}% + 45px)`
    }

    return (
      <div className="bg-white split-section informational-advantage">
        <div className="content" ref='content'>
          <div className="left">
            <h2 className="title">An informational advantage</h2>
            <p>
              Formula Stocks develops proprietary state-of-the-art technology
              to compile and analyze enormous amounts of information,
              creating a new unique edge for outperforming the market.
              Exclusively available for members only.<br/><br/>

              This scientifically based approach to stock selection has predicted winners with an
               {' ' + Math.floor(store.plans.get('basic').get('stats').WLRatio)}%,
               {' ' + Math.floor(store.plans.get('premium').get('stats').WLRatio)}%,
               {' ' + Math.floor(store.plans.get('fund').get('stats').WLRatio)}% and
               {' ' + Math.floor(store.plans.get('business').get('stats').WLRatio)}%
               success rate in the past.<br/><br/>

              This contrasts strongly to the ≈60% success rates of typical investments in the market.<br/><br/>

              To the right you see four different Formula Stocks products and their ratio
              of winners to losers, relative to the broader market.
            </p>
          </div>
          <div className="right">
            <div className="bar-chart">
              <div className="bar basic-bar" style={basStyle}><p>{this.state.basic}%</p><p className="plan-name">Basic</p></div>
              <div className="bar premium-bar" style={preStyle}><p>{this.state.premium}%</p><p className="plan-name">Premium</p></div>
              <div className="bar business-bar" style={busStyle}><p>{this.state.business}%</p><p className="plan-name">Business</p></div>
              <div className="bar fund-bar" style={funStyle}><p>{this.state.fund}%</p><p className="plan-name">Fund</p></div>
              <div className="sp-bar" style={marStyle}><p>{this.state.market}%</p><p className="plan-name">Market</p></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default InformationalAdvantage
