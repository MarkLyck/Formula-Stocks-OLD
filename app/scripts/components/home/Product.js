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
    let extraInfo = this.props.name === 'Premium' ? <p>Includes Basic</p> : this.props.name === 'Business' ? <p>Includes Basic & Premium</p> : this.props.name === 'Fund' ? <p>AUM capacity: unlimited</p> : undefined
    return (
      <div className="plan">
        <div className="top">
          <h3 className="bold">{this.props.name}</h3>
          <p className="bold price">${this.props.price}</p>
          <p className="billed">Billed {this.props.billed}</p>
        </div>
        <div className="main-stats">
          {extraInfo}
          <p>Buy & sell recommendations</p>
          <p>Model Portfolio Tracking</p>
          <p><span className="light-text-color">Avg. round trip trades p.a: </span>{this.props.info.roundtripTradesPerYear}</p>
          <p><span className="light-text-color">IIT formulas applied: </span>{this.props.info.IITFormulas}</p>
          <p><span className="light-text-color">Historical CAGR: </span>{this.props.stats.CAGR.toFixed(2)}%</p>
          <p><span className="light-text-color">Avg. winning positions: </span>{this.props.stats.WLRatio.toFixed(2)}%</p>
        </div>
        <button onClick={this.showModal} className="more-info filled-btn">More info</button>
        <button className="sign-up filled-btn" onClick={this.signup}>{this.props.signupText}</button>
      </div>
    )
  }
})

export default Product
