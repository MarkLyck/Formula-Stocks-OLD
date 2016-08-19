import React from 'react'

import store from '../../store'

const Product = React.createClass({
  signup() {
    store.settings.history.push('/signup')
  },
  showModal() {
    this.props.showModal(this.props.name)
  },
  render() {
    return (
      <div className="plan">
        <div className="top">
          <h3 className="bold">{this.props.name}</h3>
          <p className="bold price">${this.props.price}</p>
          <p className="billed">Billed {this.props.billed}</p>
        </div>
        <div className="main-stats">
          <p>Buy & Sell recommendations</p>
          <p>Model Portfolio Tracking</p>
          <p><span className="light-text-color">Avg. round-trip trades per year: </span>{this.props.info.roundtripTradesPerYear}</p>
          <p><span className="light-text-color">IIT formulas applied: </span>{this.props.info.IITFormulas}</p>
          <p><span className="light-text-color">Historical 45 year CAGR: </span>{this.props.stats.CAGR.toFixed(2)}%</p>
          <p><span className="light-text-color">Avg. winning positions: </span>{this.props.stats.WLRatio.toFixed(0)}%</p>
        </div>
        <button onClick={this.showModal} className="more-info filled-btn">More info</button>
        <button className="sign-up filled-btn" onClick={this.signup}>{this.props.signupText}</button>
      </div>
    )
  }
})

export default Product
