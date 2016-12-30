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
        <div className="prof-plans">
          <Product plan={store.plans.get('premium').toJSON()} billed="Monthly"/>
          <Product plan={store.plans.get('business').toJSON()} billed="Annually"/>
          <Product plan={store.plans.get('fund').toJSON()} billed="Annually"/>
        </div>
        <p className="disclaimer">Information in pricing tables does not represent, warrant, or guarantee any specific level of future investment performance. Historical numbers are based on backtested performance from 1975-2009, whereas data from 2009-2016 reflects following the strategies in real-time. Investing always involves varying degrees of risk.</p>
        <p className="not-convinced">Not quite convinced yet?</p>
        <ScrollLink className="learn-more" to="backtested" smooth={true} offset={-100} duration={1000}>Learn more</ScrollLink>
      </section>
    )
  }
}

export default Pricing
