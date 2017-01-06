import React from 'react'

const FeatureList = ({ path }) => (
  <ul className="features column">
    <li className="row"><p>Plan</p></li>
    {path === '/pro/signup' ? (
      <li className="row"><p>Institutional Capital</p>
        <div className="info-circle">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
          <div className="explanation">
            <h3>Institutional capital</h3>
            <p>Whether the plan can handle high liquidity investments of $50 billion or more.</p>
          </div>
        </div>
      </li>
    ) : ''}
    <li className="row"><p>IIT formulas applied</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>IIT formulas applied</h3>
          <p>Number of Intelligent Investment Technologies used in each plan.</p>
        </div>
      </div>
    </li>
    <li className="row">
      <p>Annual growth</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Annual growth</h3>
            <p>The average yearly returns. Also known as CAGR (Compound Annual Growth Rate).</p>
        </div>
      </div>
    </li>
    <li className="row">
      <p>Win / Loss ratio</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Win / Loss ratio</h3>
          <p>The percentage of stocks each plan has sold with a profit.</p>
        </div>
      </div>
    </li>
    <li className="row"><p>Avg. gain as IRR</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Avg. gain as IRR</h3>
          <p>
            The average increase in a winning stock's price, measured as a time weighted Internal Rate of Return.
          </p>
        </div>
      </div>
    </li>
    <li className="row"><p>Avg. loss as IRR</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Avg. loss as IRR</h3>
          <p>
            The average loss in a losing stock's price, measured as a time weighted Internal Rate of Return.
          </p>
        </div>
      </div>
    </li>
    <li className="row"><p>Avg. number of pos. in portfolio</p></li>
    <li className="row"><p>IRR Geometric mean</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>IRR Geometric mean</h3>
          <p>The geometric mean of all IRRs (Time weighted Internal Rate of Returns). Example: Geometric mean of the following sequence: 10%, 5%, -100% is 1.10 * 1.05 * 0.0 = 0.0%</p>
        </div>
      </div>
    </li>
    <li className="row"><p>Sortino ratio</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Sortino ratio</h3>
          <p>This version of the ratio is calculated based upon yearly returns. It measures the performance and risk of an investment strategy relative to the downward deviation. Higher is better.</p>
        </div>
      </div>
    </li>
    <li className="row"><p>Gain-to-pain ratio</p>
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>Gain to pain ratio</h3>
          <p>
            Also known as GPR. <br/><br/>
            It represents the sum of all monthly returns divided by the sum of all monthly losses.<br/><br/>A GPR value above 1.5 is considered to be
            excellent; a GPR value of 1 is considered to be good, and a GPR value of less
            than 0 is considered to be bad.</p>
        </div>
      </div>
    </li>
  </ul>
)

export default FeatureList
