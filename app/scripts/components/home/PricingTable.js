import React from 'react'
import Scroll from 'react-scroll'
import store from '../../store'
import cc from '../../cc'

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
    let Element = Scroll.Element
    let modal;
    if (this.state.modal) {
      modal = (<Modal closeModal={this.closeModal}><ProductModal planName={this.state.modal}/></Modal>)
    }

    return (
      <section className="pricing-table section">
        <Element name="pricing"/>
        <div className="content">
          <h2 className="title">Features & pricing</h2>
          <div className="divider"></div>
          <h3 className="subtitle">Compare the membership levels and find the right solution for you.</h3>
          <div className="plans">
            <Product showModal={this.showModal} name="Basic" price={cc.commafy(store.plans.get('basic').get('price'))} stats={store.plans.get('basic').get('stats')} billed="Monthly" signupText="Start Free Month" info={store.plans.get('basic').get('info')}/>
            <Product showModal={this.showModal} name="Premium" price={cc.commafy(store.plans.get('premium').get('price'))} stats={store.plans.get('premium').get('stats')} billed="Monthly" signupText="Get Started" info={store.plans.get('premium').get('info')}/>
            <Product showModal={this.showModal} name="Business" price={cc.commafy(store.plans.get('business').get('price'))} stats={store.plans.get('business').get('stats')} billed="Yearly" signupText="Get Started" info={store.plans.get('business').get('info')}/>
          </div>
          <p className="disclaimer">
            Information in pricing tables does not represent, warrant, or guarantee any specific level of future investment performance.
            Historical numbers are based on backtested performance from 1975-2009, whereas data from 2009-2016 reflects following the strategies in real-time.
            Investing always involves varying degrees of risk.
          </p>
        </div>
        {modal}
      </section>
    )
  }
})

export default PricingTable
