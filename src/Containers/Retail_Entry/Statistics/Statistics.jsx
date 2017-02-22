import React from 'react'
import WinRateGraph from '../../Global/Components/WinRateGraph/SingleWinRateGraph'
import './statistics.css'

class Statistics extends React.Component {
  constructor(props) {
    super(props)

    this.state = { fsWinYears: 36, marketWinYears: 12, avgWin: 65, avgLoss: 18, winRate: 89, lossRate: 11 }
  }
  render() {
    let fsWinYearsStyle = { height: `89%` }
    let marWinYearsStyle = { height: `30%` }

    let fsAvgWinStyle = { height: `65%` }
    let fsAvgLossStyle = { height: `18%` }

    let fsWinRate = { height: `89%` }
    let fsLossRate = { height: `11%` }


    return (
      <section className="statistics section">
          <h2 className="title">Statistics</h2>
          <div className="divider"/>
          <div className="beside">
            <div className="left">
              <WinRateGraph plan="basic" name="Entry"/>
              <p>
                Historically, 89-92% of our recommendations have been successful. If you had bought random
                high-quality stocks, only approx. 59% of these would have earned a positive return. A
                staggering difference.
              </p>
            </div>
            <div className="right">
              <div className="bar-graph">
                <div className="graph-beside">
                  <div className="bar fs-bar" style={fsWinYearsStyle}><p>{this.state.fsWinYears}</p><p className="plan-name">Entry</p></div>
                  <div className="bar market" style={marWinYearsStyle}><p>{this.state.marketWinYears}</p><p className="plan-name">Market</p></div>
                </div>
                <h3>Outperforming years</h3>
              </div>
              <p>
                Recommendations and model portfolio are based on timeless and proven investment principles,
                mathematical probabilities, and sound logic. The model portfolio has outperformed the S&P 500
                in 75% of all years.
              </p>
            </div>
          </div>

          <div className="beside">
            <div className="left">
              <div className="bar-graph">
                <div className="graph-beside uneven">
                  <div className="bar fs-bar" style={fsAvgWinStyle}><p>+{this.state.avgWin}%</p><p className="plan-name">Win</p></div>
                  <div className="zero-line"/>
                  <div className="bar market negative" style={fsAvgLossStyle}><p>-{this.state.avgLoss}%</p><p className="plan-name">Loss</p></div>
                </div>
                <h3>Avg. win/loss per stock</h3>
              </div>
            </div>
            <div className="right winrate-graph">
              <div className="bar-graph">
                <div className="graph-beside">
                  <div className="bar fs-bar" style={fsWinRate}><p>{this.state.winRate}%</p><p className="plan-name">Wins</p></div>
                  <div className="bar market" style={fsLossRate}><p>{this.state.lossRate}%</p><p className="plan-name">Losses</p></div>
                </div>
                <h3>Win/loss ratio</h3>
              </div>
            </div>
          </div>

          <p>
            We specialize in high-probability investments – a high probability of long-term gain combined
            with a low probability of loss. We prefer to buy good businesses at fair prices with a margin
            of safety, shielding us from some downside, while enjoying the upside of owning businesses
            that earn a meaningful return on capital.
          </p>
      </section>
    )
  }
}

export default Statistics
