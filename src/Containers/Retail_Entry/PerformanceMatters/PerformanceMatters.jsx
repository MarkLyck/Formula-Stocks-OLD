import React from 'react'
import './performanceMatters.css'

class PerformanceMatters extends React.Component {
  render() {
    return (
      <section className="performance-matters section">
        <h2 className="title">Why performance matters</h2>
        <div className="divider"/>
        <p>
          Assume that you would like to get an ~18% yearly return. After all, who would not? Through the
          effects of compounding this would be much, much more rewarding than the standard 6% you normally
          expect from stocks. Example in a tax free account:<br/><br/>
        </p>
        <div className="compare-bars">
          <p className="description blue-color semi-bold">$1,000 invested with an 18% yearly return over 30 years.</p>
          <div className="bar-container">
            <div className="fs-bar bar"><p className="dollars">$143,370</p></div>
          </div>
          <p className="description semi-bold">$1,000 invested with a 6% yearly return over 30 years.</p>
          <div className="market-bar-container">
            <div className="market-bar bar"/><p className="dollars">$5,743</p>
          </div>
        </div>
        <p>
          So you see, 18% in this example is 25 times better than 6%. Compounding is an exponential function,
          that makes time work for you.<br/><br/>

          Certainty of any future rate of return is impossible, since the future has not happened yet.
          However, we could examine 3 different ways in which it might have been possible to obtain similar results
          historically:<br/><br/>

          1) Using leverage 2 times equity. That might have provided the return in good years, but a crisis
          year likely would have destroyed the capital. Risk is simply too high.<br/>
          2) A hedge fund with 18% return from inception, likely indicates high fees, e.g. 2% of capital + 20%
          of results. Implied leverage means a higher risk proposition.<br/><br/>

          Or, you could simply have used Formula Stocks. 18% was the average return over the last 50
          years. No leverage. Low fee.
        </p>
        {/* <div className="options">
          <div className="option">
            <h3 className="semi-bold">Formula Stocks</h3>
            <p>
              Using Formula Stocks Entry, 18% was the average return achievable p.a. over the last 47 years.
              Zero leverage keeps risks moderate too.  A subscription is $50 monthly.
            </p>
          </div>
          <div className="option">
            <h3 className="semi-bold">2X Leverage</h3>
            <p>
              Using leverage. A standard 6-7% return leveraged two times would theoretically provide 18%+.
              But with such leverage volatility becomes too high, and a crisis would likely wipe out the
              capital, thus such returns are really illusory.
            </p>
          </div>
          <div className="option">
            <h3 className="semi-bold">Hedge funds</h3>
            <p>
              Finding a hedge fund that has achieved 18% annual growth since inception. Expect a high fee,
              typically 2% of the capital plus 20% of returns. Expect leverage too, so you would be taking on
              a higher risk as well.
            </p>
          </div>
        </div>
        <p>Formula Stocks offers better value, and more moderate risk.</p> */}
      </section>
    )
  }
}

export default PerformanceMatters
