import React from 'react'
import store from '../../store'

import Product from './Product'

import Modal from '../Modal'
import ProductModal from './ProductModal'

const PricingTable = React.createClass({
  getInitialState() {
    return {
      modal: false
    }
  },
  componentDidMount() {
    store.plans.on('update', this.updateState)
  },
  componentWillUnmount() {
    store.plans.off('update', this.updateState)
  },
  updateState() {
    this.setState({basicStats: store.plans.get('basic').get('stats')})
  },
  showModal(planName) {
    this.setState({modal: planName})
  },
  closeModal() {
    this.setState({modal: false})
  },
  render() {
    let modal;
    if (this.state.modal) {
      modal = (<Modal closeModal={this.closeModal}><ProductModal planName={this.state.modal}/></Modal>)
    }

    return (
      <section className="pricing-table">
        <div className="content">
          <h2 className="title">Features & Pricing</h2>
          <div className="divider"></div>
          <h3 className="subtitle">Compare the products and find the right solution for you</h3>
          <div className="plans">
            <Product showModal={this.showModal} name="Basic" price="50" stats={store.plans.get('basic').get('stats')} billed="Monthly" signupText="Start Free Month" info={store.plans.get('basic').get('info')}/>
            <Product showModal={this.showModal} name="Premium" price="100" stats={store.plans.get('premium').get('stats')} billed="Monthly" signupText="Get Started" info={store.plans.get('premium').get('info')}/>
            <Product showModal={this.showModal} name="Business" price="20,000" stats={store.plans.get('business').get('stats')} billed="Yearly" signupText="Get Started" info={store.plans.get('business').get('info')}/>
            <Product showModal={this.showModal} name="Fund" price="120,000" stats={store.plans.get('fund').get('stats')} billed="Yearly" signupText="Get Started" info={store.plans.get('fund').get('info')}/>
          </div>
          <p className="disclaimer">
            Information in pricing tables does not represent, warrant or guarantee any specific level of future investment performance.
            Historical numbers are based on backtested performance from 1975 - 2009, whereas data from 2009 - 2016 reflects actual investment results.
            Investing always involve varying degrees of risk.
          </p>
        </div>
        {modal}
      </section>
    )
  }
})

export default PricingTable
