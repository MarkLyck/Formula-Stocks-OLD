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
    <li className="row"><p>IIT's applied</p>
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
      <p>Expectancy</p>
      <Info title="Expectancy" explanation={(
        <p>
          The mathematical expectancy is a measure of the average expected outcome of a
          transaction. It is defined as the (probability of win * average win) - (probability of
          loss * average loss).
        </p>)}
      />
    </li>
    <li className="row"><p>Avg. positions in portfolio</p></li>
    <li className="row">
      <p>IRR Geometric mean</p>
      <Info title="IRR Geometric mean" explanation={<p>The geometric mean of all IRRs (Time weighted Internal Rate of Returns). Example: Geometric mean of the following sequence: 10%, 5%, -100% is 1.10 * 1.05 * 0.0 = 0.0%</p>}/>
    </li>
    <li className="row">
      <p>Sortino ratio</p>
      <Info title="Sortino ratio" explanation={<p>The Sortino ratio measures the performance and risk of an investment strategy relative to the downward deviation. A sortino ratio of 1 can be considered a neutral value. This version is calculated based on yearly returns. Higher is better.</p>}/>
    </li>
    <li className="row">
      <p>Gain-to-pain ratio</p>
      <Info title="Gain-to-pain ratio" explanation={<p>
        It represents the sum of all monthly returns divided by the sum of all monthly losses.<br/><br/>
        A GPR value of less than 0 is considered to be bad. A GPR value of 1 is considered to be good, and a GPR value above 1.5 is considered to be excellent.
      </p>}/>
    </li>
  </ul>
)

export default FeatureList
