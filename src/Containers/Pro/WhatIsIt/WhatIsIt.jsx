import React from 'react'
import Scroll from 'react-scroll'

// import PortfolioScreenshot from './Portfolio.jpg'
import './whatIsIt.css'

const Element = Scroll.Element

const WhatIsIt = () => (
  <section className="what-is-it section">
    <Element name="whatIsIt"/>
    <h2 className="title">Invest intelligently</h2>
    <div className="divider"/>
    <p>
      Formula Stocks offers a better tool for active investors.<br/><br/>

      Prediction is the essence of science. We specialize in predicting which stocks will go up in the future. 92% of the times we
      made a stock recommendation in the past, it proved successful in the long run. You can access these recommendations as a
      subscriber and use them in your own portfolio.<br/><br/>

      Investing using these recommendations, our BUSINESS portfolio returned 106.98% in 2016. Cumulative returns since 2009 are
      1,433% vs. the S&P500's 176%.(*), without the use of leverage or frequent trading. It is based on groundbreaking cognitive
      technology making a real difference for market professionals.<br/><br/>

      Formula Stocks offer 3 equity products for personal, professional and institutional investors: Premium, Business and Fund.
      Each offers quantitative equity analysis, based on artificial intelligence logic developed at and available only through
      Formula Stocks.<br/><br/>

      Join to increase your ROI and moderate your risk. Ask for a free demo account to experience the service in greater detail, or
      request more information.
    </p>
    {/* <img className="screenshot" src={PortfolioScreenshot} alt="portfolio"/> */}
  </section>
)

export default WhatIsIt
