import React from 'react'

const ProductModal = React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.planName} Formula</h2>
        <div className="left">

        </div>
        <div className="right">
          <ul>
            <li>Avg. gain per position: 102.37%</li>
            <li>Avg. loss per position: 16.47%</li>
            <li>Max drawdown in 45 years: 40.88%</li>
            <li>Max drawdown in 36 months: 7.03%</li>
            <li>IRR Arithmetic mean: 108.01%</li>
            <li>IRR Geometric mean: 48.66%</li>
            <li>Sortino ratio: 6.728</li>
            <li>Gain-to-pain ratio: 2.886</li>
            <li>Gain-to-pain ratio: 2.886</li>
          </ul>
        </div>
      </div>
    )
  }
})

export default ProductModal
