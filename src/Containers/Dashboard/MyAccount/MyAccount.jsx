import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNewPlan } from '../../../actions/plans'
import { cancelSubscription, updateSubscription, newSubscription, updateUser, setSessionItem } from '../../../actions/session'
import { showNotification } from '../../../actions/notifications'

import cc from '../../../cc'

import Modal from '../../Modals/Modal'
import './myAccount.css'

class MyAccount extends Component {
  state = { selectedPlan: '', showModal: false }

  cancelSubscription = () => {
    const { actions } = this.props
    actions.setSessionItem('cancelReason', this.refs.cancelReason.value)
    actions.cancelSubscription()
    this.closeModal()
  }

  selectPlan = (plan) => this.setState({ selectedPlan: plan })

  changePlan = () => {
    const { actions } = this.props
    let cycle = this.state.selectedPlan === 'business' || this.state.selectedPlan === 'fund' ? 'annually' : 'monthly'

    if (this.state.currPlan !== 'unsubscribed') {
      actions.updateSubscription(this.state.selectedPlan, cycle)
      this.closeModal()
    } else {
      actions.newSubscription(this.state.selectedPlan, cycle)
      this.closeModal()
    }
  }

  showConfirmationModal = () => { if (this.state.selectedPlan) { this.setState({ showModal: 'confirmation' }) } }
  showCancelModal = () => this.setState({ showModal: 'cancelling' })
  closeModal = () => this.setState({ showModal: false })

  render() {
    const { session } = this.props
    let entryClass, premiumClass, businessClass, fundClass = 'white'
    if      (this.state.selectedPlan === 'entry')    { entryClass = 'blue selected' }
    else if (this.state.selectedPlan === 'premium')  { premiumClass = 'blue selected' }
    else if (this.state.selectedPlan === 'business') { businessClass = 'blue selected' }
    else if (this.state.selectedPlan === 'fund')     { fundClass = 'blue selected' }

    let currPlan = !session.stripe.subscriptions.data[0].canceled_at
      ? session.stripe.subscriptions.data[0].plan.id.split('-')[0]
      : 'unsubscribed'
    if (currPlan === 'basic') { currPlan = "entry" }

    let changePlanBtn = <button onClick={this.showConfirmationModal} className="change-plan-btn">Next</button>
    let cancelBtn = <button onClick={this.showCancelModal} className="filled-btn cancel-btn red">Cancel subscription</button>

    let changeTitle = 'Change your subscription'
    if (currPlan === 'unsubscribed') {
      cancelBtn = undefined
      changeTitle = 'Select a plan'
      changePlanBtn = <button onClick={this.showConfirmationModal} className="change-plan-btn">Subscribe to:
                        <span className="capitalize">{this.state.selectedPlan}</span>
                      </button>
    }

    let entryDisabled, premiumDisabled, businessDisabled, fundDisabled = false
    if      (currPlan === 'entry')    { entryClass = 'current'; entryDisabled = true }
    else if (currPlan === 'premium')  { premiumClass = 'current'; premiumDisabled = true }
    else if (currPlan === 'business') { businessClass = 'current'; businessDisabled = true }
    else if (currPlan === 'fund')     { fundClass = 'current'; fundDisabled = true }

    let modal
    if (this.state.showModal === 'confirmation') {

      let cycle = 'monthly'
      let price
      if      (this.state.selectedPlan === 'entry')    { price = 50 }
      else if (this.state.selectedPlan === 'premium')  { price = 100 }
      else if (this.state.selectedPlan === 'business') { price = 20000; cycle="annually" }
      else if (this.state.selectedPlan === 'fund')     { price = 140000; cycle="annually" }

      const modalStyles = { maxWidth: '400px' }

      let chargeText = <p>You will be charge <span className="bold">${cc.commafy(price)}</span> to the card on file.</p>
      let chargeBtn = <button className="filled-btn" onClick={this.changePlan}>Subscribe for ${cc.commafy(price)} {cycle}</button>
      if (this.state.charging) {
        chargeBtn = <button className="filled-btn"><i className="fa fa-spinner fa-pulse fa-2x fa-fw white-color"></i></button>
      }

      modal = (
        <Modal closeModal={this.closeModal} modalStyles={modalStyles}>
          <div className="change-plan-confirmation">
            <h2>Confirm plan change</h2>
            {chargeText}
            <p className="card-on-file">
              <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
              {session.stripe.sources.data[0].last4}
            </p>
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

    return (
      <div className="my-account-page">
        <div className="account-info">
          <h3 className="db-heading">My account</h3>
          <div className="db-card">
            <h3 className="name">{session.name}</h3>
            <h3 className="capitalize">{currPlan !== 'unsubscribed' ? currPlan + ' model' : currPlan}</h3>
            <h3 className="email">{session.email}</h3>
          </div>
        </div>

        <div className="change-plan">
          <h3 className="db-heading">{changeTitle}</h3>
          <div className="db-card">
            <div className={entryClass + ' plan'} disabled={entryDisabled} onClick={this.selectPlan.bind(null, 'entry')}>
              <h3 className="plan-name">Entry</h3>
              <h3 className="price">$50<br/><span className="disclaimer">monthly</span></h3>
            </div>
            <div className={premiumClass + ' plan'} disabled={premiumDisabled} onClick={this.selectPlan.bind(null, 'premium')}>
              <h3 className="plan-name">Premium</h3>
              <h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3>
            </div>
            <div className={businessClass + ' plan'} disabled={businessDisabled} onClick={this.selectPlan.bind(null, 'business')}>
              <h3 className="plan-name">Business</h3>
              <h3 className="price">$20,000<br/><span className="disclaimer">yearly</span></h3>
            </div>
            <div className={fundClass + ' plan fund'} disabled={fundDisabled} onClick={this.selectPlan.bind(null, 'fund')}>
              <h3 className="plan-name">Fund</h3>
              <h3 className="price">$140,000<br/><span className="disclaimer">yearly</span></h3>
            </div>
            {changePlanBtn}
          </div>
        </div>

        {cancelBtn}
        {modal}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plans, session } = state
  const { selectedPlan } = plans

  return { plans, selectedPlan, session }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    selectNewPlan,
    cancelSubscription,
    setSessionItem,
    updateUser,
    updateSubscription,
    newSubscription,
    showNotification
  }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
