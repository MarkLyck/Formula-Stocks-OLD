import React from 'react'
import Scroll from 'react-scroll'
import store from '../../store'
import Product from './components/Product.jsx'

class Pricing extends React.Component {
  constructor() {
    super()

    this.updateState = this.updateState.bind(this)
    this.state = { gotInfo: false }
  }

  updateState() {
    this.setState({ gotInfo: true })
  }

  componentDidMount() {
    store.plans.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.plans.off('update', this.updateState)
  }

  render() {
    const Element = Scroll.Element
    const ScrollLink = Scroll.Link
    return (
      <section className="prof-pricing">
        <Element name="pricing"/>
        <h2 className="title">Pricing</h2>
        <div className="divider"/>
        <p>
          <span className="bold">Premium</span> is a membership which historically has provided over 20% annual growth<sup>*</sup>. It is a personal license, intended for non-commercial use.
        </p>
        <p>
          <span className="bold">Business</span> is designed for accredited or enterprising investors focusing on performance with a margin of safety, at the expense of diversification.
        </p>
        <p>
          <span className="bold">Fund</span> is for institutional capital and anyone investing on behalf of others. Capable of handling large AUMs. Strong diversification. Deep liquidity.
        </p>
        <div className="prof-plans">
          <Product plan={store.plans.get('premium').toJSON()} billed="Monthly"/>
          <Product plan={store.plans.get('business').toJSON()} billed="Annually"/>
          <Product plan={store.plans.get('fund').toJSON()} billed="Annually"/>
        </div>
        <p>All memberships include buy & sell recommendations and actively managed model portfolios.</p>
        <p className="disclaimer"><sup>*</sup>Information in pricing tables does not represent, warrant, or guarantee any specific level of future investment performance. Historical numbers are based on backtested performance from 1975-2009, whereas data from 2009-2016 reflects following the strategies in real-time. Investing always involves varying degrees of risk.</p>
        <p className="not-convinced">Not quite convinced yet?</p>
        <ScrollLink className="learn-more" to="brochure" smooth={true} offset={-100} duration={1000}>Learn more</ScrollLink>
      </section>
    )
  }
}

export default Pricing
