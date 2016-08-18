import React from 'react'

import store from '../../store'
import cc from '../../cc'

const MyAccount = React.createClass({
  getInitialState() {
    let currPlan = 'premium'
    if (store.session.get('stripe').subscriptions && !store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      currPlan = store.session.get('stripe').subscriptions.data[0].plan.id
      currPlan = currPlan.slice(0, currPlan.indexOf('-'))
    }
    return {selectedPlan: currPlan}
  },
  cancelSubscription() {
    cc.cancelSubscription()
  },
  selectPlan(plan) {
    this.setState({selectedPlan: plan})
  },
  changePlan() {
    let cycle = 'monthly'
    if (this.state.selectedPlan === 'business' || this.state.selectedPlan === 'fund') {
      cycle = 'annually'
    }
    cc.updateSubscription(this.state.selectedPlan, cycle)
  },
  newSubscription() {
    let cycle = 'monthly'
    if (this.state.selectedPlan === 'business' || this.state.selectedPlan === 'fund') {
      cycle = 'annually'
    }
    cc.newSubscription(this.state.selectedPlan, cycle)
  },
  render() {

    let basicClass = 'white'
    let premiumClass = 'white'
    let businessClass = 'white'
    let fundClass = 'white'

    if(this.state.selectedPlan === 'basic') {basicClass = 'blue selected'}
    if(this.state.selectedPlan === 'premium') {premiumClass = 'blue selected'}
    if(this.state.selectedPlan === 'business') {businessClass = 'blue selected'}
    if(this.state.selectedPlan === 'fund') {fundClass = 'blue selected'}

    // console.log(store.session.toJSON());

    let currPlan;
    console.log(store.session.get('stripe').subscriptions.data[0].canceled_at !== null);
    if (store.session.get('stripe').subscriptions && !store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      currPlan = store.session.get('stripe').subscriptions.data[0].plan.id
      currPlan = currPlan.slice(0, currPlan.indexOf('-'))
      currPlan = currPlan + ' Formula'
    }

    if (store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      currPlan = 'Unsubscribed'
    }

    let changePlanBtn = <button onClick={this.changePlan} className="change-plan filled-btn">Change plan</button>
    let bottomBtn = <button onClick={this.cancelSubscription} className="filled-btn cancel-btn red">Cancel Subscription</button>
    let changeTitle = 'Change your subscription'
    if (store.session.get('stripe').subscriptions.data[0].canceled_at !== null) {
      changePlanBtn = <button onClick={this.newSubscription} className="change-plan filled-btn">Subscribe to: <span className="capitalize"> {this.state.selectedPlan}</span></button>
      bottomBtn = undefined;
      changeTitle = 'Select a plan'
    }



    return (
      <div className="my-account-page">
        <section className="top">
          <div className="profile-info blue">
            <h2 className="name white-color">{store.session.get('name')}</h2>
            <h3 className="white-color capitalize"><i className="fa fa-flask white-color" aria-hidden="true"></i> {currPlan}</h3>
            <h3 className="email white-color"><i className="fa fa-envelope white-color" aria-hidden="true"></i>{store.session.get('email')}</h3>
          </div>
        </section>

        <div className="change-plan-container">
          <h2>{changeTitle}</h2>
          <button className={basicClass} onClick={this.selectPlan.bind(null, 'basic')}><h3 className="plan-name">Basic</h3><h3 className="price">$50<br/><span className="disclaimer">monthly</span></h3></button>
          <button className={premiumClass} onClick={this.selectPlan.bind(null, 'premium')}><h3 className="plan-name">Premium</h3><h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3></button>
          <button className={businessClass} onClick={this.selectPlan.bind(null, 'business')}><h3 className="plan-name">Business</h3><h3 className="price">$20,000<br/><span className="disclaimer">annually</span></h3></button>
          <button className={fundClass} onClick={this.selectPlan.bind(null, 'fund')}><h3 className="plan-name">Fund</h3><h3 className="price">$120,000<br/><span className="disclaimer">annually</span></h3></button>
          {changePlanBtn}
        </div>

        {bottomBtn}
      </div>
    )
  }
})

export default MyAccount
