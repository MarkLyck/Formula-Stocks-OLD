import React from 'react'
import './statistics.css'

class Statistics extends React.Component {
  render() {
    return (
      <section className="statistics section">
          <h2 className="title">Statistics</h2>
          <div className="divider"/>
          <div className="beside">
            <div className="left">
              <p>
                Historically, 89-92% of our recommendations have been successful. If you had bought random
                high-quality stocks, only approx. 59% of these would have earned a positive return. A
                staggering difference.
              </p>
            </div>
            <div className="right">
              <p>
                Recommendations and model portfolio are based on timeless and proven investment principles,
                mathematical probabilities, and sound logic. The model portfolio has outperformed the S&P 500
                in 88% of all years.
              </p>
            </div>
          </div>

          <div className="beside">
            <div className="left">

            </div>
            <div className="right">

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
