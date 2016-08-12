import React from 'react'
import $ from 'jquery'

const InformationalAdvantage = React.createClass({
  getInitialState() {
    return ({
      animate: false,
      basic: 0,
      premium: 0,
      business: 0,
      fund: 0,
      market: 0,
    })
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
      console.log('ANIMATE');
      // this.setState({animate: true})
      this.updateNumbers()
      $(window).off('scroll', this.animate)
    };
  },
  updateNumbers() {
    let bas,pre,bus,fun,mar = 0
    this.state.basic < 84 ? bas = (this.state.basic + 1) : bas = 84
    this.state.premium < 90 ? pre = (this.state.premium + 1) : pre = 90
    this.state.business < 95 ? bus = (this.state.business + 1) : bus = 95
    this.state.fund < 87 ? fun = (this.state.fund + 1) : fun = 87
    this.state.market < 60 ? mar = (this.state.market + 1) : mar = 60

    this.setState({
      basic: bas,
      premium: pre,
      business: bus,
      fund: fun,
      market: mar,
    })

    if (bus < 95) {
      window.setTimeout(this.updateNumbers,2)
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
              Formula Stocks uses state-of-the-art technology to compile and
              analyze an enormous amount of information, creating a new unique
              edge for outperforming the market. And, above all, we make it
              available only to a small number of members, giving them an
              advantage available nowhere else.<br/><br/>

              This scientifically based approach on stock selection has predicted
              winners with an 84%, 87%, 90% and 97% success rate in the past.<br/><br/>

              This contrasts strongly to the ≈60% win ratio of typical
              investments in the market.<br/><br/>

              To the right you see four different Formula Stocks products and their
              win ratio performance relative to the market.
            </p>
          </div>
          <div className="right">
            <div className="bar-chart">
              <div className="bar basic-bar" style={basStyle}><p>{this.state.basic}%</p></div>
              <div className="bar premium-bar" style={preStyle}><p>{this.state.premium}%</p></div>
              <div className="bar business-bar" style={busStyle}><p>{this.state.business}%</p></div>
              <div className="bar fund-bar" style={funStyle}><p>{this.state.fund}%</p></div>
              <div className="sp-bar" style={marStyle}><p>{this.state.market}%</p></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default InformationalAdvantage
