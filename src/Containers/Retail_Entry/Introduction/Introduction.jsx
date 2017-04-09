import React from 'react'
import { Element } from 'react-scroll'
import SingleWinRateGraph from '../../Global/Components/WinRateGraph/SingleWinRateGraph'
import './introduction.css'

const Introduction = ({portfolioYields, portfolioReturn, winRate, }) => {
  let lastYearReturns = 57.00
  if (portfolioYields.length) {
    let janBalance, decBalance
    portfolioYields.forEach(point => {
      if (point.date.year === "2016") {
        if (point.date.month === '1') { janBalance = point.balance }
        else if (point.date.month === '12') { decBalance = point.balance }
      }
    })
    lastYearReturns = (decBalance - janBalance) / janBalance * 100
  }

  return (
    <section className="introduction section">
      <Element name="whatIsIt"/>
      <h2 className="title">Invest intelligently</h2>
      <div className="divider"/>
      <div className="beside">
        <p className="intro-text left">
          Formula Stocks offers a better way to invest. It estimates which stocks will go up, before they go
          up. {winRate}% of the times we made such an estimate, it proved to be successful in the long run. You
          simply buy these stocks in your own account.<br/><br/>

          Investing using these estimates, our Entry portfolio returned {lastYearReturns.toFixed(2)}% in 2016. Cumulative returns
          since 2009 are {portfolioReturn.toFixed(0)}%<sup>*</sup> vs. the S&P500's 176%. It is based on groundbreaking technology, which
          really makes a difference for our members.
        </p>
        <p className="left">
          Typically, when you invest in stocks, your basic expectation is to receive 6-7% p.a. on average.
          Usually a fund product will provide you a risk adjusted, long-term return in this neighborhood.
          Or, if it is a better performing fund, demand very high fees.
        </p>
        <p className="left">
          Join to better your returns, save on fees, and moderate your risk. Sign up for a 30-day free trial
          without any obligations.
        </p>
        <p className="disclaimer">*Past performance is not neccesarily indicative of future results.</p>
        <div className="graph-container">
          <SingleWinRateGraph plan="basic" name="Entry"/>
        </div>
      </div>
    </section>
  )
}

export default Introduction
