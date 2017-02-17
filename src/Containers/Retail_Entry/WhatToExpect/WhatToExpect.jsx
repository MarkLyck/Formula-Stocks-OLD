import React from 'react'
import './whatToExpect.css'
import PortfolioScreen from './Portfolio.jpg'
import Stock from './Stock'

class WhatToExpect extends React.Component {
  constructor() {
    super()

    this.state = {
      latestSells: [
        {
          name: 'Gentex Corporation',
          ticker: 'GNTX',
          purchase_price: 15.30,
          sell_price: 20.89
        },
        {
          name: 'Brocade Communications Systems',
          ticker: 'BRCD',
          purchase_price: 9.25,
          sell_price: 12.47
        },
        {
          name: 'Western Digital Corporation',
          ticker: 'WDC',
          purchase_price: 42.90,
          sell_price: 79.73
        },
        {
          name: 'National presto ind.',
          ticker: 'NPK',
          purchase_price: 85.34,
          sell_price: 106.40
        },
        {
          name: 'Cubic Corporation',
          ticker: 'CUB',
          purchase_price: 42.50,
          sell_price: 47.95
        },
        {
          name: 'Ingram micro',
          ticker: 'IM',
          purchase_price: 23.12,
          sell_price: 37.44
        },
        {
          name: 'KMG Chemicals, Inc.',
          ticker: 'KMG',
          purchase_price: 19.67,
          sell_price: 33.78
        },
        {
          name: 'Kadant Inc.',
          ticker: 'KAI',
          purchase_price: 41.34,
          sell_price: 62.60
        },
        {
          name: 'Hurco Companies',
          ticker: 'HURC',
          purchase_price: 28.69,
          sell_price: 32.60
        },
        {
          name: 'Applied Industrial Technologies',
          ticker: 'AIT',
          purchase_price: 41.73,
          sell_price: 59.85
        }
      ]
    }
  }
  render() {

    let portfolio = this.state.latestSells.map((stock, i) => {
      return <Stock stock={stock} key={i}/>
    })

    return (
      <section className="what-to-expect section">
        <h2 className="title">What to expect</h2>
        <div className="divider"/>
        <div className="beside">
          <p className="left">
            Our recommendations are long term, the average holding period is 2.24 years. When you
            first buy a stock, the immediate price changes may well be random in the very short term. But over
            time the price will gradually come to reflect the value of the better choices we make.<br/><br/>

            Our Entry product has picked succesful investments 89% of the time. This compares to 59% for a
            typical stock product or market index.<br/><br/>

            The mathematical expectation from a Formula Stock's selection is very well defined, and has
            above-average odds of succes, higher than normal return characteristics, and a lower than average
            risk. This has been fully reflected in our actual results.
          </p>
          <img src={PortfolioScreen} className="screen" alt="portfolio"/>
          <p>
            If you choose to use Formula Stocks consistently, diversified, and for a number of years, odds are
            extremely good that you will obtain better returns than offered by most investment methods.<br/><br/>

            Here are the latest 10 sales performed by the Entry product
          </p>
        </div>
        <table className="portfolio-table">
          <thead className="labels">
            <tr>
              <th>Name</th>
              <th>Bought at</th>
              <th>Sold at</th>
              <th>Return</th>
            </tr>
          </thead>
          {portfolio}
        </table>
      </section>)
  }
}

export default WhatToExpect
