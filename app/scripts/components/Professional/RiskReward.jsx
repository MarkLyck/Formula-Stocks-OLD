import React from 'react'

class RiskReward extends React.Component {
  render() {
    return (
      <section className="risk-reward">
        <h2 className="title">Risk vs. Reward</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <div className="chart-container">
              <img src="assets/images/omega_chart.svg"/>
              <div className="chart-indicators">
                <div className="chart-indicator business">Business</div>
                <div className="chart-indicator fund">Fund</div>
                <div className="chart-indicator premium">Premium</div>
                <div className="chart-indicator basic">Basic</div>
                <div className="chart-indicator djia">DJIA</div>
              </div>
            </div>
          </div>
          <div className="right">
            <p>
            Achieving a higher level of return is, of course,
            easy if it means accepting higher risk.
            One simply uses leverage, thus amplifying both risk and reward.<br/><br/>

            But our methods generally do the exact opposite.
            They deliver above-average returns at a below-average risk and without any
            form of leverage - an absolute rarity.

            One of the best and most modern risk/reward benchmarks is the Omega function,
            the output of which is depicted in the graph.<br/><br/>

            Higher levels indicate higher returns, and steeper slopes indicate lower risk.
            The yearly return distribution is significantly superior to
            DJIA at all thresholds and for all products.
            Depicted: yearly Omega Function.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default RiskReward
