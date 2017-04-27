import React from 'react'
import { Element, Link } from 'react-scroll'
import Product from '../Product/Product'
import './pricing.css'

class Pricing extends React.Component {
  renderDescription() {
    if (this.props.path === '/pro') {
      return (
        <div>
          <p>
            <span className="bold">Premium</span> is a membership which historically has provided over 20% annual growth<sup>*</sup>. It is a personal license, intended for non-commercial use.
          </p>
          <p>
            <span className="bold">Business</span> is designed for accredited or enterprising investors focusing on performance with a margin of safety, at the expense of diversification.
          </p>
          <p>
            <span className="bold">Fund</span> is for institutional capital and anyone investing on behalf of others. Capable of handling large AUMs. Strong diversification. Deep liquidity.
          </p>
        </div>
      )
    }
  }

  render() {
    const { planData } = this.props

    return (
      <section className="prof-pricing section">
        <Element name="pricing"/>
        <h2 className="title">Pricing</h2>
        <div className="divider"/>
        {this.renderDescription()}
        <div className="prof-plans">
          <Product plan={planData['premium']} billed="Monthly" path={this.props.path}/>
          <Product plan={planData['business']} billed="Annually" path={this.props.path}/>
          <Product plan={planData['fund']} billed="Annually" path={this.props.path}/>
        </div>
        <p>All memberships include buy and sell recommendations and actively managed model portfolios.</p>
        <p className="disclaimer"><sup>*</sup>The information in the pricing tables does not represent, warrant, or guarantee any specific level of future investment performance. Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results in real time. Investing always involves varying degrees of risk.</p>
        <p className="not-convinced">Not signed up yet?</p>
        <Link className="learn-more button" to={this.props.path === '/pro' ? "brochure" : 'pilotTest'} smooth={true} offset={-100} duration={1000}>Learn more</Link>
      </section>
    )
  }
}

export default Pricing
