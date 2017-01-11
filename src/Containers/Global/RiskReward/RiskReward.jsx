import React from 'react'
import OmegaGrah from './omega_chart.svg'
import './riskReward.css'

class RiskReward extends React.Component {
  render() {
    return (
      <section className="risk-reward section">
        <h2 className="title">Risk versus reward</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="chart-container">
            <img src={OmegaGrah} alt="Omega graph"/>
            <div className="chart-indicators">
              <div className="chart-indicator business">Business</div>
              <div className="chart-indicator fund">Fund</div>
              <div className="chart-indicator premium">Premium</div>
              <div className="chart-indicator basic">Basic</div>
              <div className="chart-indicator djia">DJIA</div>
            </div>
          </div>
          <p className="right-text">
            Achieving a higher level of return is easy if it means accepting higher risk.
            One simply uses leverage, thus amplifying both risk and reward.<br/><br/>

            Our methods generally do the exact opposite. They deliver above-average returns at
            a below-average risk and without any leverage - an absolute rarity. One of the best
            and most modern risk/reward benchmarks is the Omega function, depicted in the
            graph.<br/><br/>
          </p>
          <p className="disclaimer right-text">
            The graph shows a yearly Omega Function. Higher levels indicate higher returns, and
            steeper slopes indicate lower risk. The yearly return distribution is
            significantly superior to DJIA at all thresholds and for all membership levels.
          </p>
        </div>
      </section>
    )
  }
}

export default RiskReward
