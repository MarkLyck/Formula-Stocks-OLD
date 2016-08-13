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
    store.plans.get('basic').on('change', this.updateState)
  },
  updateState() {
    // console.log('change');
    this.setState({basicStats: store.plans.get('basic').get('stats')})
  },
  render() {
    console.log(store.plans);
    return (
      <section className="pricing-table">
        <div className="content">
          <h2 className="title">Features & Pricing</h2>
          <div className="divider"></div>
          <h3 className="subtitle">Compare the products and find the right solution for you</h3>
          <div className="plans">
            <Product name="Basic" price="50" stats={store.plans.get('basic').get('stats')} billed="Monthly" signupText="Start Month Now"/>
            <Product name="Premium" price="100" stats={store.plans.get('premium').get('stats')} billed="Monthly" signupText="Sign Up"/>
            <Product name="Business" price="20,000" stats={store.plans.get('business').get('stats')} billed="Yearly" signupText="Sign Up"/>
            <Product name="Fund" price="120,000" stats={store.plans.get('fund').get('stats')} billed="Yearly" signupText="Sign Up"/>
          </div>
        </div>
      </section>
    )
  }
})

export default PricingTable
