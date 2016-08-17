import React from 'react'

const RewardVSRisk = React.createClass({
  render() {
    return (
      <section className="split-section reward-vs-risk">
        <div className="content">
          <h2 className="title">More <span className="blue-color">Reward</span>, Less <span className="blue-color">Risk</span></h2>
          <div className="divider"></div>
          <div className="wrapper">
            <div className="left">
              <img src="assets/images/omega_chart.svg"/>
            </div>
            <div className="right">
              <p>
                Achieving a higher level of return is, of course, easy if it means accepting higher risk.
                One simply uses leverage, this amplifying both risk and reward.
                But our methods generally do the exact opposite.
                They deliver above-average returns at a below average risk - an absolute rarity.
              </p>
              <p className="disclaimer">
                Omega function. Higher levels indicate higher returns,
                and steeper slopes indicate lower risk.
                This yearly return distribution is significantly supperior to DIJA at all tresholds
                and for all products. Depicted: Yearly Omega Function
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

export default RewardVSRisk
