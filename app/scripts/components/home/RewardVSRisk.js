import React from 'react'

const RewardVSRisk = React.createClass({
  render() {
    return (
      <section className="split-section reward-vs-risk">
        <div className="content">
          <h2 className="title">More <span className="blue-color">reward</span>, less <span className="blue-color">risk</span></h2>
          <div className="divider"></div>
          <div className="wrapper">
            <div className="left">
              <img src="assets/images/omega_chart.svg"/>
            </div>
            <div className="right">
              <p>
                Achieving a higher level of return is, of course, easy if it means accepting higher risk.
                One simply uses leverage, thus amplifying both risk and reward.<br/><br/>

                But our methods generally do the exact opposite. They deliver above-average returns
                at a below-average risk and without any form of leverage - an absolute rarity.
              </p>
              <p className="disclaimer">
                One of the best and most modern risk/reward benchmarks
                is the Omega function, the output of which, is depicted on the left.<br/><br/>

                Higher levels indicate higher returns,
                and steeper slopes indicate lower risk.
                The yearly return distribution is significantly superior to DJIA at all thresholds
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
