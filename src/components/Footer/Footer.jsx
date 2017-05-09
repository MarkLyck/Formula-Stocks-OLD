import React from 'react'

import Terms from '../Legal/TermsAndConditions'
import Privacy from '../Legal/PrivacyPolicy'
import House from './House.png'

import './footer.css'

class Footer extends React.Component {
  constructor() {
    super()
    this.toggleTerms = this.toggleTerms.bind(this)
    this.togglePrivacy = this.togglePrivacy.bind(this)

    this.state = { showTerms: false, showPrivacy: false }
  }

  toggleTerms() { this.setState({ showTerms: !this.state.showTerms }) }
  togglePrivacy() { this.setState({ showPrivacy: !this.state.showPrivacy }) }

  render() {
    return (
      <footer>
        <div className="disclaimer-container">
          <p className="disclaimer">
            Formula Stocks is an information provider, not an investment advisory service or a registered
            investment advisor, does not offer individual investment advice and does not manage client funds.
            Unless otherwise specified, all return figures shown above are for illustrative purposes only.<br/><br/>

            Formula Stocks does not purport to tell which securities individual customers should buy or sell
            for themselves and recommendations are not solicitations to buy or sell a security, Like a
            newsletter Formula Stocks offer a model portfolio, which members can choose to use as an input in
            their own decisionmaking process. Formula Stocks assumes no responsibility or liability for your
            investment results. You understand and acknowledge that there is risk involved in investing in
            securities.<br/><br/>

            The Formula Stocks product underwent a 3-year pilot program from 2009- to 2011. In this testing
            period, actual performance data, under normal real time market conditions, was recorded, and
            results reviewed by a state-licensed Big Four auditor. Based on the BUSINESS membership in its
            2009-2011 versions, we recorded an average return on equity employed to sustain securities
            trading of +78.94% in 2009, +44.64% in 2010, and +17.51% in 2011. This reflects all factors of
            market liquidity, trading costs and slippage, financial risk, human factors, and was not carried
            out with any benefit of hindsight.<br/><br/>

            For technical reasons the website displays up-to-date calculated data refreshed daily and weekly
            based on backtested data. Backtested performance results have certain inherent limitations, as
            they could potentially be designed with some benefit of hindsight, even though efforts have been
            made to avoid such risk. Unlike an actual performance record, backtested results do not represent
            actual trading and may not be impacted by brokerage and other slippage fees. Also, since
            transactions may or may not have been executed, results may have under- or over-compensated for
            impact, if any, of certain market factors, such as lack of market liquidity or level of
            participation.<br/><br/>

            Past results of any investment system are not necessarily indicative of future results. No
            representation is being made that you are likely to achieve profits or losses similar to those
            shown here. In addition, information, system output, articles, and other features of our products
            are provided for educational and informational purposes only and should not be construed as
            investment advice. It remains the user’s exclusive responsibility to review and evaluate the
            content and to determine whether to accept or reject any content. Formula Stocks expresses no
            opinion as to whether any of the website content is appropriate for a user’s investment portfolio,
            strategy, financial situation, or investment objective(s).<br/><br/>

            Formula Stocks strategies evolve and improve on a recurring basis, and any result and statistic is
            therefore subject to change without notice.
          </p>
          <p className="white-color disclaimer agreement">By visiting this site, you agree to our <a className="blue-color" onClick={this.toggleTerms}>Terms and Conditions</a> & <a className="blue-color" onClick={this.togglePrivacy}>Privacy Policy</a></p>
          {this.state.showTerms ? <div className="terms-container"><button className="close-btn" onClick={this.toggleTerms}><i className="material-icons">close</i></button><Terms/></div> : ''}
          {this.state.showPrivacy ? <div className="terms-container"><button className="close-btn" onClick={this.togglePrivacy}><i className="material-icons">close</i></button><Privacy/></div> : ''}
        </div>

        <div className="copyright">
          <img className="headquarters" src={House} alt="headquarters"/>
          <div className="contact-info">
            <p>Contact us at: <a href="mailto:info@formulastocks.com">info@formulastocks.com</a></p>
            <p>© Formula Stocks ApS 2017 - All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
