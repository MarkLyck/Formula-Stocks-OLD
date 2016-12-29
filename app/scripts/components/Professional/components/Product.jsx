import React from 'react'
import { Link } from 'react-router'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  return value
}

const Product = ({ plan, billed }) => {
  let extraInfo = plan.name === 'business' ? <p>Includes Premium</p> : plan.name === 'fund' ? <p><span>AUM capacity:</span><span className="right-align">$300 billion</span></p> : ''
  return (
  <div className="prof-plan">
    <div className="top">
      <h3>{plan.name}</h3>
      <p>${formatPrice(plan.price)} Billed: {billed}</p>
    </div>
    <ul className="statistics">
      <p>Buy & sell recommendations</p>
      <p>Model portfolio</p>
      {extraInfo}
      <p><span className="light-text-color">IIT formulas applied: </span><span className="right-align">{plan.info.IITFormulas}</span></p>
      <p><span className="light-text-color">Annual growth: </span><span className="right-align">{plan.stats.CAGR.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Win/loss ratio: </span><span className="right-align">{plan.stats.WLRatio.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Avg. gain per position: </span><span className="right-align">{plan.info.avgGainPerPosition.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Avg. loss per position: </span><span className="right-align">{plan.info.avgLossPerPosition.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Avg. round trip trades p.a: </span><span className="right-align">{plan.info.roundtripTradesPerYear}</span></p>
      <p><span className="light-text-color">Avg. number of pos. in portfolio: </span><span className="right-align">{plan.info.avgNumOfPosInPortfolio}</span></p>
      <p><span className="light-text-color">Max drawdown in 45 years: </span><span className="right-align">{plan.info.maxDrawdown45y.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Max drawdown in 36 months: </span><span className="right-align">{plan.info.maxDrawdown36m.toFixed(2)}%</span></p>
      <p><span className="light-text-color">IRR Arithmetic mean: </span><span className="right-align">{plan.info.IRRArithmeticMean.toFixed(2)}%</span></p>
      <p><span className="light-text-color">IRR Geometric mean: </span><span className="right-align">{plan.info.IRRGeometricMean.toFixed(2)}%</span></p>
      <p><span className="light-text-color">Sortino ratio: </span><span className="right-align">{plan.info.sortinoRatio}</span></p>
      <p><span className="light-text-color">Gain-to-pain ratio: </span><span className="right-align">{plan.info.gainToPainRatio}</span></p>
    </ul>
    <Link to="/signup" className="cta">Get Started</Link>
  </div>
)}

export default Product
