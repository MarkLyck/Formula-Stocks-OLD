import React from 'react'
import Scroll from 'react-scroll'
import SingleWinRateGraph from '../../Global/Components/WinRateGraph/SingleWinRateGraph'
import './introduction.css'

class Introduction extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="introduction section">
        <Element name="whatIsIt"/>
        <h2 className="title">Invest intelligently</h2>
        <div className="divider"/>
        <div className="beside">
          <p className="intro-text left">
            Formula Stocks offers a better way to invest. It estimates for you which stocks will go up, before
            they go up. Historically, 89% of the times that we have made such an estimate, it has proven
            successful in the long run.<br/><br/>

            The technology behind Formula Stocks is groundbreaking. Historically, Entry returns 18% p.a. You
            simply buy these stocks in your own account.

            The nature of all things future is, that we cannot promise a given return. We can promise better
            odds, and let the past speak for itself. In 2016 Entry returned +43.63%. Since 2009 average
            returns have been 22.56% per year.
          </p>
          <p className="left">
            Typically, when you invest in stocks, your basic expectation is to receive 6-7% p.a. on average.
            Usually a fund product will provide you a risk adjusted, long-term return in this neighborhood. Or,
            if it is a better performing fund, demand very high fees.
          </p>
          <p className="left">
            Join to better your returns, save on fees, and moderate your risk. Sign up for a
            30-day free trial to take it for a spin.
          </p>
          <div className="graph-container">
            <SingleWinRateGraph plan="basic" name="Entry"/>
          </div>
        </div>

      </section>
    )
  }
}

export default Introduction
