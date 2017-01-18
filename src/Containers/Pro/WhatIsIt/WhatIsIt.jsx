import React from 'react'
import Scroll from 'react-scroll'

import PortfolioScreenshot from './Portfolio.jpg'
import './whatIsIt.css'

class WhatIsIt extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="what-is-it section">
        <Element name="whatIsIt"/>
        <h2 className="title">What is it?</h2>
        <div className="divider"/>
        <p>
          We develop technology designed to identify stocks with a high probability of yielding
          positive investment returns. We use this to offer you actionable purchase and sales
          recommendations and a capital allocation strategy, which would have outperformed the
          S&P 500 89% of the time over the last 47 years.<br/><br/>

          Use it to better your investment performance and save time. On this page we will
          offer you more information on how it works, and why it could be useful to you.
        </p>
        <h2 className="title">Introduction</h2>
        <div className="divider"/>
        <p>
          We use technology to analyze businesses in greater detail than the human cerebral
          cortex is able to; this includes estimating their most likely future based on complex data.
          The human brain is not wired for evaluating hundreds of data points simultaneously
          and does not perform this task well. Humans simply prefer stories. But stories
          inherently produce bias, and bias dampens investment performance.<br/><br/>

          Our intelligent technology delivers unbiased business analysis. This analysis is
          carried out on an expert level, and based on more experience than the typical analyst can
          provide. This rational, non-emotional, analytical process provides for better and more
          accurate business decisions devoid of bias, fear, greed, and indecision.<br/><br/>

          It started 14 years ago, when we began a pioneering product development cycle using
          machine learning. We would like to invite you on a tour of a groundbreaking product
          that may be able to assist you in obtaining better performance for you or your
          customers.
        </p>
          <img className="screenshot" src={PortfolioScreenshot} alt="portfolio"/>
        <p>
          What does it do? It beats the market averages by understanding businesses and
          strategies better than the competition, thus gaining a durable informational
          advantage or edge.<br/><br/>

          How does it do it? Formula Stocks uses expert systems, big data, and machine
          learning to develop a set of technologies, which we label Intelligent Investment
          Technologies™ or IITs™. Through this technology we have learned more about what really
          works in certain equity investing contexts than is generally known and discounted by
          the market, and upon this solid foundation we have built new and better investment
          methods.<br/><br/>

          How can it help you or your customers? We offer products that can improve return on
          capital, whether personal, corporate, or institutional.
        </p>
      </section>)
  }
}

export default WhatIsIt
