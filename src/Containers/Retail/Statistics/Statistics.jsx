import React from 'react'
import SingleWinRateGraph from '../../../components/Graphs/WinRateGraph/WinRateGraph'
import './statistics.css'

const Statistics = ({ stats, info }) => {
  const fsWinYears = 36
  const marketWinYears = 12

  let winRate = stats ? stats.WLRatio : 90

  let fsWinYearsStyle = { height: `${winRate}%` }
  let marWinYearsStyle = { height: `30%` }

  let avgWinPercent = info ? Math.floor(info.avgGainPerPosition) : 65
  let avgLossPercent = info ? Math.floor(info.avgLossPerPosition) : 18

  let fsAvgWinStyle = { height: `${avgWinPercent}%` }
  let fsAvgLossStyle = { height: `${avgLossPercent}%` }

  let fsWinRate = { height: `${Math.floor(winRate)}%` }
  let fsLossRate = { height: `${Math.ceil(100 - winRate)}%` }

  return (
    <section className="statistics section">
        <h2 className="title">Statistics</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <SingleWinRateGraph fsWinRate={Math.floor(winRate)} marketWinRate={59} name="Entry"/>
            <p>
              Historically, 89-92% of our recommendations have been successful. If you had bought random
              high-quality stocks, only approx. 59% of these would have earned a positive return. A
              staggering difference.
            </p>
          </div>
          <div className="right">
            <div className="bar-graph">
              <div className="graph-beside">
                <div className="bar fs-bar" style={fsWinYearsStyle}><p>{fsWinYears}</p><p className="plan-name">Entry</p></div>
                <div className="bar market" style={marWinYearsStyle}><p>{marketWinYears}</p><p className="plan-name">Market</p></div>
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
                <div className="bar fs-bar" style={fsAvgWinStyle}><p>+{avgWinPercent}%</p><p className="plan-name">Win</p></div>
                <div className="zero-line"/>
                <div className="bar market negative" style={fsAvgLossStyle}><p>-{avgLossPercent}%</p><p className="plan-name">Loss</p></div>
              </div>
              <h3>Avg. win/loss per stock</h3>
            </div>
          </div>
          <div className="right winrate-graph">
            <div className="bar-graph">
              <div className="graph-beside">
                <div className="bar fs-bar" style={fsWinRate}><p>{Math.floor(winRate)}%</p><p className="plan-name">Wins</p></div>
                <div className="bar market" style={fsLossRate}><p>{Math.ceil(100 - winRate)}%</p><p className="plan-name">Losses</p></div>
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

export default Statistics
