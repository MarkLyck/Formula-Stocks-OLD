import React from 'react'
// import moment from 'moment'

import store from '../../../store'
import cc from '../../../cc'

import Modal from '../../Modals/Modal'
import './myAccount.css'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)

    this.selectPlan = this.selectPlan.bind(this)
    this.changePlan = this.changePlan.bind(this)
    this.cancelSubscription = this.cancelSubscription.bind(this)

    this.showConfirmationModal = this.showConfirmationModal.bind(this)
    this.showCancelModal = this.showCancelModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.newSubscription = this.newSubscription.bind(this)

    let currPlan = 'premium'
    if (store.session.get('stripe').subscriptions && !store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      currPlan = store.session.get('stripe').subscriptions.data[0].plan.id
      currPlan = currPlan.slice(0, currPlan.indexOf('-'))
    } else { currPlan = 'unsubscribed' }

    if (currPlan === 'basic') { currPlan = "entry" }

    this.state = { selectedPlan: false, showModal: false, charging: false, currPlan: currPlan }
  }

  cancelSubscription() {
    store.session.set('cancelReason', this.refs.cancelReason.value)
    store.session.updateUser()
    cc.cancelSubscription()
    this.closeModal()
  }

  selectPlan(plan) { this.setState({ selectedPlan: plan }) }

  changePlan() {
    this.setState({ charging: true })
    let cycle = 'monthly'
    if (this.state.selectedPlan === 'business' || this.state.selectedPlan === 'fund') {
      cycle = 'annually'
    }

    if (this.state.currPlan !== 'unsubscribed') {
      cc.updateSubscription(this.state.selectedPlan, cycle)
      .then(() => {
        let type = 2
        if (this.state.selectedPlan === 'basic') { type = 1 }
        else if (this.state.selectedPlan === 'business') { type = 3 }
        else if (this.state.selectedPlan === 'fund') { type = 4 }

        store.session.set('notification', {
          text: `You are now subscribed to the ${this.state.selectedPlan} model`,
          type: 'notification'
        })
        store.session.set('type', type)
        store.session.updateUser()
        this.setState({ charging: false, showModal: false })
      })
      .catch(() => {
        store.session.set('notification', {
          text: `Failed to change plan`,
          type: 'error'
        })
        this.setState({ charging: false, showModal: false })
      })
    } else {
      cc.newSubscription(this.state.selectedPlan, cycle)
      .then(() => {
        store.session.set('notification', {
          text: `You are now subscribed to the ${this.state.selectedPlan} model`,
          type: 'notification'
        })
        this.setState({charging: false, showModal: false})
      })
      .catch(() => {
        store.session.set('notification', {
          text: `Failed to subscribe to the ${this.state.selectedPlan} model`,
          type: 'error'
        })
        this.setState({ charging: false, showModal: false })
      })
    }
  }

  showConfirmationModal() {
    if (this.state.selectedPlan) { this.setState({ showModal: 'confirmation' }) }
  }

  showCancelModal() { this.setState({ showModal: 'cancelling' }) }
  closeModal() { this.setState({ showModal: false }) }

  newSubscription() {
    let cycle = 'monthly'
    if (this.state.selectedPlan === 'business' || this.state.selectedPlan === 'fund') {
      cycle = 'annually'
    }
    cc.newSubscription(this.state.selectedPlan, cycle)
  }

  render() {
    let basicClass, premiumClass, businessClass, fundClass = 'white'
    if      (this.state.selectedPlan === 'basic')    { basicClass = 'blue selected' }
    else if (this.state.selectedPlan === 'premium')  { premiumClass = 'blue selected' }
    else if (this.state.selectedPlan === 'business') { businessClass = 'blue selected' }
    else if (this.state.selectedPlan === 'fund')     { fundClass = 'blue selected' }

    let currPlan
    if (store.session.get('stripe').subscriptions && store.session.get('stripe').subscriptions.data[0]) {
      currPlan = store.session.get('stripe').subscriptions.data[0].plan.id
      currPlan = currPlan.slice(0, currPlan.indexOf('-'))
      currPlan += ' model'
    }
    if (store.session.get('stripe').subscriptions.data[0].canceled_at) {
      currPlan = 'Unsubscribed'
    }

    let changePlanBtn = <button onClick={this.showConfirmationModal} className="change-plan-btn">Next</button>

    let bottomBtn = <button onClick={this.showCancelModal} className="filled-btn cancel-btn red">Cancel subscription</button>
    let changeTitle = 'Change your subscription'
    if (store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      changePlanBtn = <button onClick={this.showConfirmationModal} className="change-plan-btn">Subscribe to: <span className="capitalize"> {this.state.selectedPlan}</span></button>
      bottomBtn = undefined
      changeTitle = 'Select a plan'
    }

    let basicDisabled, premiumDisabled, businessDisabled, fundDisabled = false
    if      (currPlan === 'basic model')    { basicClass = 'current'; basicDisabled = true }
    else if (currPlan === 'premium model')  { premiumClass = 'current'; premiumDisabled = true }
    else if (currPlan === 'business model') { businessClass = 'current'; businessDisabled = true }
    else if (currPlan === 'fund model')     { fundClass = 'current'; fundDisabled = true }

    let modal
    if (this.state.showModal === 'confirmation') {

      let cycle = 'monthly'
      let price
      if      (this.state.selectedPlan === 'basic')    { price = 50 }
      else if (this.state.selectedPlan === 'premium')  { price = 100 }
      else if (this.state.selectedPlan === 'business') { price = 20000; cycle="annually" }
      else if (this.state.selectedPlan === 'fund')     { price = 140000; cycle="annually" }

      const modalStyles = { maxWidth: '400px' }

      let chargeText = <p>We will charge <span className="bold">${cc.commafy(price)}</span> to the card on file.</p>
      if(store.plans.get(this.state.selectedPlan).get('type') < store.session.get('type')) {
        chargeText = <p>on your next billing date we will charge <span className="bold">${cc.commafy(price)}</span> to the card on file.</p>
      }

      let chargeBtn = <button className="filled-btn" onClick={this.changePlan}>Subscribe for ${cc.commafy(price)} {cycle}</button>
      if (this.state.charging) {
        chargeBtn = <button className="filled-btn"><i className="fa fa-spinner fa-pulse fa-2x fa-fw white-color"></i></button>
      }

      modal = (
        <Modal closeModal={this.closeModal} modalStyles={modalStyles}>
          <div className="change-plan-confirmation">
            <h2>Confirm plan change</h2>
            {chargeText}
            <p className="card-on-file"><i className="fa fa-credit-card-alt" aria-hidden="true"></i>{store.session.get('stripe').sources.data[0].last4}</p>
            {chargeBtn}
          </div>
        </Modal>
      )
    } else if (this.state.showModal === 'cancelling') {
      const modalStyles = { maxWidth: '400px' }
      let cancelButton = <button className="filled-btn" onClick={this.cancelSubscription}>Cancel subscription</button>
      if (this.state.cancelling) {
        cancelButton = <button className="filled-btn"><i className="fa fa-spinner fa-pulse fa-2x fa-fw white-color"></i></button>
      }

      modal = (
        <Modal closeModal={this.closeModal} modalStyles={modalStyles}>
          <div className="cancel-confirmation">
            <h2>We're sorry to see you go.</h2>
            <p>Please take a second to let us know why you are cancelling. - Thank you for trying us out!</p>
            <textarea ref="cancelReason"/>
            {cancelButton}
          </div>
        </Modal>
      )
    }

    if (currPlan === 'basic model') { currPlan = 'entry model' }

    return (
      <div className="my-account-page">
        <div className="account-info">
          <h3 className="db-heading">My account</h3>
          <div className="db-card">
            <h3 className="name">{store.session.get('name')}</h3>
            <h3 className="capitalize">{currPlan}</h3>
            <h3 className="email">{store.session.get('email')}</h3>
            {/* <h3 className="billing-date white-color"><i className="fa fa-calendar white-color" aria-hidden="true"></i>Next billing date: {moment.unix(store.session.get('stripe').subscriptions.data[0].current_period_end).format('MMMM Do YYYY')}</h3> */}
          </div>
        </div>

        <div className="change-plan">
          <h3 className="db-heading">{changeTitle}</h3>
          <div className="db-card">
            <div className={basicClass + ' plan'} disabled={basicDisabled} onClick={this.selectPlan.bind(null, 'basic')}><h3 className="plan-name">Entry</h3><h3 className="price">$50<br/><span className="disclaimer">monthly</span></h3></div>
            <div className={premiumClass + ' plan'} disabled={premiumDisabled} onClick={this.selectPlan.bind(null, 'premium')}><h3 className="plan-name">Premium</h3><h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3></div>
            <div className={businessClass + ' plan'} disabled={businessDisabled} onClick={this.selectPlan.bind(null, 'business')}><h3 className="plan-name">Business</h3><h3 className="price">$20,000<br/><span className="disclaimer">yearly</span></h3></div>
            <div className={fundClass + ' plan fund'} disabled={fundDisabled} onClick={this.selectPlan.bind(null, 'fund')}><h3 className="plan-name">Fund</h3><h3 className="price">$140,000<br/><span className="disclaimer">yearly</span></h3></div>
            {changePlanBtn}
          </div>
        </div>

        {bottomBtn}
        {modal}
      </div>
    )
  }
}

export default MyAccount
