import React from 'react'
import { Link } from 'react-router'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  return value
}

const Product = ({ plan, billed }) => {
  let extraInfo = plan.name === 'business' ? <p>Includes Premium</p> : plan.name === 'fund' ? <p>AUM capacity: $300 billion</p> : ''
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
      <p><span className="light-text-color">IIT formulas applied: </span>{plan.info.IITFormulas}</p>
      <p><span className="light-text-color">Annual growth: </span>{plan.stats.CAGR.toFixed(2)}%</p>
      <p><span className="light-text-color">Win/loss ratio: </span>{plan.stats.WLRatio.toFixed(2)}%</p>
      <p><span className="light-text-color">Avg. gain per position: </span>{plan.info.avgGainPerPosition}%</p>
      <p><span className="light-text-color">Avg. loss per position: </span>{plan.info.avgLossPerPosition}%</p>
      <p><span className="light-text-color">Avg. round trip trades p.a: </span>{plan.info.roundtripTradesPerYear}</p>
      <p><span className="light-text-color">Avg. number of pos. in portfolio: </span>{plan.info.avgNumOfPosInPortfolio}</p>
      <p><span className="light-text-color">Max drawdown in 45 years: </span>{plan.info.maxDrawdown45y}%</p>
      <p><span className="light-text-color">Max drawdown in 36 months: </span>{plan.info.maxDrawdown36m}%</p>
      <p><span className="light-text-color">IRR Arithmetic mean: </span>{plan.info.IRRArithmeticMean}%</p>
      <p><span className="light-text-color">IRR Geometric mean: </span>{plan.info.IRRGeometricMean}%</p>
      <p><span className="light-text-color">Sortino ratio: </span>{plan.info.sortinoRatio}</p>
      <p><span className="light-text-color">Gain-to-pain ratio: </span>{plan.info.gainToPainRatio}</p>
    </ul>
    <Link to="/signup">Sign Up</Link>
  </div>
)}

export default Product
