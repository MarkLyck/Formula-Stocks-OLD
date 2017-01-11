import React from 'react'
import Info from '../../Global/Components/Info/Info'

const FeatureList = ({ path }) => (
  <ul className="features column">
    <li className="row"><p>Plan</p></li>
    {path === '/pro/signup' ? (
      <li className="row"><p>Institutional Capital</p>
        <Info title="Institutional capital" explanation={<p>Whether the plan can handle high liquidity investments of $50 billion or more.</p>}/>
      </li>
    ) : ''}
    <li className="row"><p>IIT formulas applied</p>
      <Info title="IIT formulas applied" explanation={<p>Number of Intelligent Investment Technologies used in each plan.</p>}/>
    </li>
    <li className="row">
      <p>Annual growth</p>
      <Info title="Annual growth" explanation={<p>The average yearly returns. Also known as CAGR (Compound Annual Growth Rate).</p>}/>
    </li>
    <li className="row">
      <p>Win / Loss ratio</p>
      <Info title="Win / Loss ratio" explanation={<p>The percentage of stocks each plan has sold with a profit.</p>}/>
    </li>
    <li className="row">
      <p>Avg. gain as IRR</p>
      <Info title="Avg. gain as IRR" explanation={<p>The average increase in a winning stock's price, measured as a time weighted Internal Rate of Return.</p>}/>
    </li>
    <li className="row">
      <p>Avg. loss as IRR</p>
      <Info title="Avg. loss as IRR" explanation={<p>The average loss in a losing stock's price, measured as a time weighted Internal Rate of Return.</p>}/>
    </li>
    <li className="row"><p>Avg. positions in portfolio</p></li>
    <li className="row">
      <p>IRR Geometric mean</p>
      <Info title="IRR Geometric mean" explanation={<p>The geometric mean of all IRRs (Time weighted Internal Rate of Returns). Example: Geometric mean of the following sequence: 10%, 5%, -100% is 1.10 * 1.05 * 0.0 = 0.0%</p>}/>
    </li>
    <li className="row">
      <p>Sortino ratio</p>
      <Info title="Sortino ratio" explanation={<p>This version of the ratio is calculated based upon yearly returns. It measures the performance and risk of an investment strategy relative to the downward deviation. Higher is better.</p>}/>
    </li>
    <li className="row">
      <p>Gain-to-pain ratio</p>
      <Info title="Gain-to-pain ratio" explanation={<p>
        Also known as GPR. <br/><br/>
        It represents the sum of all monthly returns divided by the sum of all monthly losses.<br/><br/>A GPR value above 1.5 is considered to be
        excellent; a GPR value of 1 is considered to be good, and a GPR value of less
        than 0 is considered to be bad.
      </p>}/>
    </li>
  </ul>
)

export default FeatureList
