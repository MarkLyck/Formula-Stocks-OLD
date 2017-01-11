/* eslint-disable */

import React from 'react'
import Info from '../Info/Info'
import { Link } from 'react-router'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

const Product = ({ plan, billed, path }) => {

  let extraInfo =
    plan.name === 'basic' ? <div></div>
  : plan.name === 'premium' ? <div><p>Includes Basic</p></div>
  : plan.name === 'business' ? <div><p>Includes Premium</p></div>
  : ''

  if (path === '/pro') {
    extraInfo =
      plan.name === 'premium' ? <div><p><span className="light-text-color">License:</span> <span className="right-align">Personal</span></p></div>
    : plan.name === 'business' ? <div><p>Includes Premium</p><p><span className="light-text-color">License:</span> <span className="right-align">Personal/Corporate</span></p></div>
    : plan.name === 'fund' ? <div><p><span>AUM capacity:</span><span className="right-align">$50 billion</span></p><p><span className="light-text-color">License:</span> <span className="right-align">Institutional</span></p></div>
    : ''
  }

  let ctaText = plan.name === 'basic' ? 'Start your free month' : 'Sign Up'
  let prefix = path === '/pro' ? '/pro' : ''

  return (
  <div className={`prof-plan ${plan.name}`}>
    <div className="top">
      <h3>{plan.name}</h3>
      <p>${formatPrice(plan.price)} - {billed} {plan.name === 'basic' ? ' after 30 days' : ''}</p>
    </div>
    <ul className="statistics">
      {extraInfo}
      <li>
        <p className="light-text-color">IIT formulas applied</p>
        <Info title="IIT formulas applied" explanation={<p>Number of Intelligent Investment Technologies used in each plan.</p>}/>
        <p className="right-align">{plan.info.IITFormulas}</p>
      </li>
      <li>
        <p className="light-text-color">Annual growth</p>
        <Info title="Annual growth" explanation={<p>The average yearly returns. Also known as CAGR (Compound Annual Growth Rate).</p>}/>
        <p className="right-align">{plan.stats.CAGR.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Win/loss ratio</p>
        <Info title="Win/loss ratio" explanation={<p>The percentage of stocks each plan has sold with a profit.</p>}/>
        <p className="right-align">{plan.stats.WLRatio.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Avg. gain as IRR</p>
        <Info title="Avg. gain as IRR"
        explanation={<p>The average increase in a winning stock's price, measured as a time weighted Internal Rate of Return.</p>}/>
        <p className="right-align">{plan.info.avgGainPerPosition.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Avg. loss as IRR</p>
        <Info title="Avg. loss as IRR"
        explanation={<p>The average decrease in a losing stock's price, measured as a time weighted Internal Rate of Return.</p>}/>
        <p className="right-align">{plan.info.avgLossPerPosition.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Avg. positions in portfolio</p>
        <p className="right-align">{plan.info.avgNumOfPosInPortfolio}</p>
      </li>
      <li>
        <p className="light-text-color">Max drawdown in 47 years</p>
        <p className="right-align">{plan.info.maxDrawdown45y.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Max drawdown in 36 months</p>
        <p className="right-align">{plan.info.maxDrawdown36m.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">IRR Geometric mean</p>
        <Info title="IRR Geometric mean" explanation={<p>The geometric mean of all IRRs (Time weighted Internal Rate of Returns). Example: <br/><br/>Geometric mean of the following sequence: 10%, 5%, -100% is 1.10 * 1.05 * 0.0 = 0.0%</p>}/>
        <p className="right-align">{plan.info.IRRGeometricMean.toFixed(2)}%</p>
      </li>
      <li>
        <p className="light-text-color">Sortino ratio</p>
        <Info title="Sortino ratio" explanation={<p>his version of the ratio is calculated based upon yearly returns. It measures the performance and risk of an investment strategy relative to the downward deviation. Higher is better.</p>}/>
        <p className="right-align">{plan.info.sortinoRatio.toFixed(3)}</p>
      </li>
      <li>
        <p className="light-text-color">Gain-to-pain ratio</p>
        <Info title="Gain-to-pain ratio"
          explanation={<p>
            Also known as GPR. <br/><br/>
            It represents the sum of all monthly returns divided by the sum of all monthly losses.<br/><br/>A GPR value above 1.5 is considered to be
            excellent; a GPR value of 1 is considered to be good, and a GPR value of less
            than 0 is considered to be bad.</p>}/>
        <p className="right-align">{plan.info.gainToPainRatio.toFixed(3)}</p>
      </li>
    </ul>
    <Link to={`${prefix}/signup`} className="cta">{ctaText}</Link>
  </div>
)}

export default Product
