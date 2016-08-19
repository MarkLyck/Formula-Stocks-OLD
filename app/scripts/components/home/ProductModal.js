import React from 'react'

import store from '../../store'

const ProductModal = React.createClass({
  getInitialState() {
    return {plan: store.plans.get(this.props.planName.toLowerCase()).toJSON()}
  },
  componentWillReceiveProps(newProps) {
    this.setState({plan: store.plans.get(newProps.planName.toLowerCase()).toJSON()})
  },
  render() {
    console.log(store.plans.get(this.props.planName.toLowerCase()).toJSON());
    console.log(this.props.planName);
    return (
      <div className="product-modal">

        <div className="left">
          <h2 className="blue-color">{this.props.planName} Formula</h2>
          <div className="main-stats">
            <p>Buy & Sell recommendations</p>
            <p>Model Portfolio Tracking</p>
            <p><span className="light-text-color">Avg. round-trip trades per year: </span>{this.state.plan.info.roundtripTradesPerYear}</p>
            <p><span className="light-text-color">IIT formulas applied: </span>{this.state.plan.info.IITFormulas}</p>
            <p><span className="light-text-color">Historical 45 year CAGR: </span>{this.state.plan.stats.CAGR.toFixed(2)}%</p>
            <p><span className="light-text-color">Avg. winning positions: </span>{this.state.plan.stats.WLRatio.toFixed(2)}%</p>
          </div>
        </div>
        <div className="right">
          <div>
            <p><span className="light-text-color">Avg. gain per position:</span> 102.37%</p>
            <p><span className="light-text-color">Avg. loss per position:</span> 16.47%</p>
            <p><span className="light-text-color">Max drawdown in 45 years:</span> 40.88%</p>
            <p><span className="light-text-color">Max drawdown in 36 months:</span> 7.03%</p>
            <p><span className="light-text-color">IRR Arithmetic mean:</span> 108.01%</p>
            <p><span className="light-text-color">IRR Geometric mean:</span> 48.66%</p>
            <p><span className="light-text-color">Sortino ratio:</span> 6.728</p>
            <p><span className="light-text-color">Gain-to-pain ratio:</span> 2.886</p>
          </div>
        </div>
      </div>
    )
  }
})

export default ProductModal
