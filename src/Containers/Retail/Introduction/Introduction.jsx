import React from 'react'
import { Element } from 'react-scroll'
import SingleWinRateGraph from '../../../components/Graphs/WinRateGraph/SingleWinRateGraph'
import './introduction.css'

const Introduction = ({ portfolioYields, portfolioReturn, winRate }) => {
  let returns2016 = 69.25
  let returns2017 = 31.32
  if (portfolioYields.length) {
    let janBalance2016, decBalance2016, janBalance2017, decBalance2017
    portfolioYields.forEach(point => {
      if (point.date.year === "2016") {
        if (point.date.month === '1') { janBalance2016 = point.balance }
        else if (point.date.month === '12') { decBalance2016 = point.balance }
    } else if (point.date.year === "2017") {
      if (point.date.month === '1') { janBalance2017 = point.balance }
      else if (point.date.month === '12') { decBalance2017 = point.balance }
    }
    })
    returns2016 = (decBalance2016 - janBalance2016) / janBalance2016 * 100
    returns2017 = (decBalance2017 - janBalance2017) / janBalance2017 * 100
  }

  return (
    <section className="introduction section">
      <Element name="whatIsIt"/>
      <h2 className="title">Invest intelligently</h2>
      <div className="divider"/>
      <div className="beside">
        <p className="intro-text left">
          Formula Stocks offers a better way to invest. We forecast which stocks will go up, before they go up. {winRate}%
          of the time we have made such an estimate, it has proved a successful long term investment.
          You simply buy these stocks in your own account.<br/><br/>

          Investing using these estimates, cumulative returns since 2009 have been {portfolioReturn.toFixed(0)}%<sup>*</sup> vs.
          the S&P500's 225%. Our Entry portfolio returned {returns2017.toFixed(2)}% in 2017 and {returns2016.toFixed(2)}% in 2016.

          Powered by Artificial Intelligence forecasting, this performance strongly exceeds the 6-7% average returns
          typically expected from the stock market. 
        </p>
        <p className="left">
          Join us to better your returns, save on fees, and moderate your risk. Sign up for a 30-day free trial
          without any obligations.
        </p>
        <p className="disclaimer">*Past performance is not neccesarily indicative of future results.</p>
        <div className="graph-container">
          <SingleWinRateGraph fsWinRate={winRate} marketWinRate={59} name="Entry"/>
        </div>
      </div>
    </section>
  )
}

export default Introduction
