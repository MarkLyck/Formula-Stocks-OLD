import React from 'react'

import store from '../../store'

const Footer = React.createClass({
  showTerms() {
    store.session.set('showModal', 'terms')
  },
  showPrivacy() {
    store.session.set('showModal', 'privacy')
  },
  render() {
    return (
      <footer>
        <div className="disclaimer-container">
          <p className="disclaimer">
            Formula Stocks is an information provider, not an investment advisory service or a
            registered investment advisor and does not offer individual investment advice.
            Unless otherwise specified, all return figures shown above are for illustrative
            purposes only. Actual returns in the future will vary greatly and depend on
            personal and market circumstances. No representation is being made that you are
            likely to achieve profits or losses similar to those shown.<br/><br/>

            Formula Stocks does not manage client funds, but acts solely as an information
            supplier. Formula Stocks does not purport to tell which securities individual
            customers should buy or sell for themselves. Formula Stocks’ purchase and sales
            recommendations are not solicitations to buy or sell, but rather information you
            can use as a starting point for doing additional independent research in order to
            allow you to form your own opinion regarding investments and make your own informed
            decisions.<br/><br/>

            Formula Stocks assumes no responsibility or liability for your investment results.
            You understand and acknowledge that there is a high degree of risk involved in
            investing in securities. This service does not constitute an offer, a solicitation to
            buy a security, or to open a brokerage account.<br/><br/>

            Formula Stocks as a product underwent a 3 year pilot test program from 2009-2011.
            During this defined testing program, actual performance data, under normal real
            time market conditions, was recorded, and results reviewed by a state-licensed Big
            Four auditor. Based on the BUSINESS membership as it existed in its 2009-2011
            versions, we recorded an average return on equity employed to sustain securities
            trading of +66,54% in 2009, +52,56% in 2010, +16,84% in 2011. This reflects factors
            of market liquidity, trading costs and slippage, financial risk, human factors,
            and was not carried out with any benefit of hindsight.<br/><br/>

            Due to continual development, the website displays up-to-date calculated data
            refreshed weekly. This backtested performance results have certain inherent
            limitations, as they could potentially be designed with some benefit of hindsight,
            even though best efforts has been taken to avoid such risk. Unlike an actual
            performance record, backtested results do not represent actual trading and may not
            be impacted by brokerage and other slippage fees. Also, since transactions may or
            may not actually have been executed, results may have under- or over-compensated
            for impact, if any, of certain market factors, such as lack of market liquidity or
            level of participation.<br/><br/>

            Past results of any investment system are not necessarily indicative of future
            results. It should not be assumed that the systems presented in these products will
            be profitable or that they cannot result in losses. In addition, information,
            system output, articles, and other features of our products are provided for
            educational and informational purposes only and should not be construed as
            investment advice. Accordingly, you should not rely solely on this information in
            making any investment. Unless experienced as an investor, one should check with a
            licensed financial advisor to determine the suitability of any investment and/or
            read relevant stock prospectuses. Formula Stocks portfolios may or may not be
            adequately diversified for any particular risk profile as the required level of
            diversification differs from individual to individual.<br/><br/>

            Formula Stocks business analytics depends on the accuracy of the published accounts
            of public corporations. Such accuracy may from time to time be less than ideal.
            Formula Stocks strategies evolve and improve on a recurring basis, and any result
            and statistic is therefore subject to change without notice.
          </p>
          <p className="white-color disclaimer agreement">By visiting this site, you agree to our <a className="blue-color" onClick={this.showTerms}>Terms and Conditions</a> & <a className="blue-color" onClick={this.showPrivacy}>Privacy Policy</a></p>
        </div>

        <div className="copyright">
          <div className="contact-info">
            <p>Formula Stocks ApS     Ribe Landevej 39      DK-6100 Haderslev      Denmark.</p>
          </div>
          <p>© Formula Stocks 2016 - All rights reserved.</p>
        </div>
      </footer>
    )
  }
})

export default Footer
