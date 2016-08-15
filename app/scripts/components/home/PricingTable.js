import React from 'react'
import store from '../../store'

import Product from './Product'



const PricingTable = React.createClass({
  getInitialState() {
    return {
      // basicStats: store.plans.basic.data.get('stats')
      basicStats: store.plans.get('basic').get('stats')
    }
  },
  componentDidMount() {
    store.plans.on('update', this.updateState)
  },
  updateState() {
    this.setState({basicStats: store.plans.get('basic').get('stats')})
  },
  render() {
    return (
      <section className="pricing-table">
        <div className="content">
          <h2 className="title">Features & Pricing</h2>
          <div className="divider"></div>
          <h3 className="subtitle">Compare the products and find the right solution for you</h3>
          <div className="plans">
            <Product name="Basic" price="50" stats={store.plans.get('basic').get('stats')} billed="Monthly" signupText="Start Free Month"/>
            <Product name="Premium" price="100" stats={store.plans.get('premium').get('stats')} billed="Monthly" signupText="Get Started"/>
            <Product name="Business" price="20,000" stats={store.plans.get('business').get('stats')} billed="Yearly" signupText="Get Started"/>
            <Product name="Fund" price="120,000" stats={store.plans.get('fund').get('stats')} billed="Yearly" signupText="Get Started"/>
          </div>
          <p className="disclaimer">
            The pricing tables are not a representation, warranty or gurantee of future investment performance. Making investments always involve varying degrees of risk.
            The above numbers are based on historical data from 1975 - 2009, and data from 2009 - 2016 which reflects actual investment results.
          </p>
        </div>
      </section>
    )
  }
})

export default PricingTable
