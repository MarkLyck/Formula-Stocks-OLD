import React from 'react'

const Footer = React.createClass({
  render() {
    return (
      <footer>
        <div className="disclaimer-container">
          <p className="disclaimer">
          Formula Stocks is an information provider, not an investment advisory service,
          nor a registered investment advisor and does not offer individual investment advice.
          Unless otherwise specified, all return figures shown above are for illustrative purposes only.
          Actual returns will vary greatly and depend on personal and market circumstances.
          <br/><br/>
          Formula Stocks does not manage client funds, but acts solely as an information
          and technology supplier. Formula Stocks does not purport to tell or
          suggest which securities individual customers should buy or sell for themselves.
          Formula Stocks purchase or sell indicators, are not solicitations to buy or sell,
          but rather, information you can use as a starting point for doing additional independent
          research in order to allow you to form your own opinion regarding investments,
          and make your own informed decisions.
          <br/><br/>
          Formula Stocks assumes no responsibility or liability for your investment results.
          You understand and acknowledge that there is a high degree of risk involved in
          investing securities. This service does not constitute an offer, a solicitation
          to buy a security or to open a brokerage account.
          <br/><br/>
          It should not be assumed that the systems presented in these products will be profitable
          or that they will not result in losses. Past results of any investment system published by
          Formula Stocks are not necessarily indicative of future returns. In addition, information,
          system output, articles and other features of our products are provided for educational
          and informational purposes only and should not be construed as investment advice. Accordingly,
          you should not rely solely on this information in making any investment.
          You should check with your licensed financial advisor and tax advisor
          to determine the suitability of any investment, and/or read relevant prospectuses.
          Formula Stocks portfolios may or may not be adequately diversified for any particular
          risk profile as the required level of diversification differs from individual to individual,
          set your own individual maximum position size accordingly.
          <br/><br/>
          The real time test period 2009-2011 as well as early adopter results from 2009 - 2016
          reflects actual investment results. Other period statistics are the result of backtesting
          the strategies. Backtested performance results have certain inherent limitations,
          as they could potentially be designed with some benefit of hindsight,
          even though efforts have been taken to avoid such risk. Unlike an actual performance record
          (such as the 2009 - 2011 record or early adopter results from 2009 - 2016),
          backtested results do not represent actual trading and may not be impacted by brokerage
          and other slippage fees. Also since transactions may or may not actually have been executed,
          results may have under-or over-compensated for impact, if any, of certain market factors,
          such as lack of market liquidity or level of participation. Formula Stocks business analytics
          depend on the accuracy of the published accounts of public corporations.
          Such accuracy may from time to time be less than ideal. Formula Stocks strategies evolve
          and improve on a recurring basis, and any result and statistic is therefore subject
          to change without notice. Formula Stocks employees may or may not own equities mentioned
          in the service. No representation is being made that you are likely to achieve profits
          or losses similar to those shown.
          </p>
        </div>
        <div className="copyright">
          <p>© Formula Stocks 2016 - All rights reserved.</p>
        </div>
      </footer>
    )
  }
})

export default Footer
