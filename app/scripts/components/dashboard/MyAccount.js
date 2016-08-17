import React from 'react'

import store from '../../store'
import cc from '../../cc'

const MyAccount = React.createClass({
  getInitialState() {
    return {selectedPlan: 'premium'}
  },
  cancelSubscription() {
    cc.cancelSubscription()
  },
  selectPlan(plan) {
    this.setState({selectedPlan: plan})
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

    console.log(store.session.toJSON());

    let currPlan;
    if (store.session.get('stripe').subscriptions && !store.session.get('stripe').canceled_at) {
      currPlan = store.session.get('stripe').subscriptions.data[0].plan.id
      currPlan = currPlan.slice(0, currPlan.indexOf('-'))
      currPlan = currPlan + ' Formula'
    }

    if (!currPlan && store.session.get('stripe').canceled_at) {
      currPlan = 'Unsubscribed'
    }

    return (
      <div className="my-account-page">
        <section className="top">
          <div className="profile-info">
            <h2 className="name">{store.session.get('name')}</h2>
            <h3><i className="fa fa-flask" aria-hidden="true"></i> {currPlan}</h3>
            <h3 className="email"><i className="fa fa-envelope" aria-hidden="true"></i>{store.session.get('email')}</h3>
          </div>
        </section>

        <div className="change-plan-container">
          <h2>Change your subscription</h2>
          <button className={basicClass} onClick={this.selectPlan.bind(null, 'basic')}><h3 className="plan-name">Basic</h3><h3 className="price">$50<br/><span className="disclaimer">monthly</span></h3></button>
          <button className={premiumClass} onClick={this.selectPlan.bind(null, 'premium')}><h3 className="plan-name">Premium</h3><h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3></button>
          <button className={businessClass} onClick={this.selectPlan.bind(null, 'business')}><h3 className="plan-name">Business</h3><h3 className="price">$20,000<br/><span className="disclaimer">annually</span></h3></button>
          <button className={fundClass} onClick={this.selectPlan.bind(null, 'fund')}><h3 className="plan-name">Fund</h3><h3 className="price">$120,000<br/><span className="disclaimer">annually</span></h3></button>
          <button className="change-plan filled-btn">Change plan</button>
        </div>

        <button onClick={this.cancelSubscription} className="filled-btn cancel-btn red">Cancel Subscription</button>
      </div>
    )
  }
})

export default MyAccount
