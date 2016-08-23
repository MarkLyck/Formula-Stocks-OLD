import React from 'react'

import store from '../../store'

const SelectPlanForm = React.createClass({
  getInitialState() {
    return {planFormClasses: `select-plan-form ${this.props.formAnimation}`, selectedPlan: 'premium'}
  },
  componentWillReceiveProps(newProps) {
    this.setState({planFormClasses: `select-plan-form ${newProps.formAnimation}`})
  },
  componentDidMount() {
    if (this.props.plan) {
      this.setState({selectedPlan: this.props.plan})
    }
  },
  selectPlan(plan, e) {
    e.preventDefault()
    this.setState({selectedPlan: plan})
  },
  next(e) {
    e.preventDefault()
    this.props.goToModal('payment', {plan: this.state.selectedPlan})
    // if (this.state.selectedPlan === 'basic') {
    //   store.session.signup(store.session.get('email'), store.session.get('password'))
    // } else {
    //   this.props.goToModal('payment', {plan: this.state.selectedPlan})
    // }
  },
  render() {
    let basicClass = ''
    let premiumClass = ''
    let businessClass = ''
    let fundClass = ''

    if(this.state.selectedPlan === 'basic') {basicClass = 'selected'}
    if(this.state.selectedPlan === 'premium') {premiumClass = 'selected'}
    if(this.state.selectedPlan === 'business') {businessClass = 'selected'}
    if(this.state.selectedPlan === 'fund') {fundClass = 'selected'}

    let submitText = 'Next'

    return (
      <form className={this.state.planFormClasses}>
        <h3 className="modal-title">Select a Plan</h3>
        <div className="plans">
          <button className={basicClass} onClick={this.selectPlan.bind(null, 'basic')}><h3 className="plan-name">Basic</h3><h3 className="price">Free trial<br/><span className="disclaimer">$50 monthly after first month</span></h3></button>
          <button className={premiumClass} onClick={this.selectPlan.bind(null, 'premium')}><h3 className="plan-name">Premium</h3><h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3></button>
          <button className={businessClass} onClick={this.selectPlan.bind(null, 'business')}><h3 className="plan-name">Business</h3><h3 className="price">$20,000<br/><span className="disclaimer">annually</span></h3></button>
          <button className={fundClass} onClick={this.selectPlan.bind(null, 'fund')}><h3 className="plan-name">Fund</h3><h3 className="price">$120,000<br/><span className="disclaimer">annually</span></h3></button>
        </div>
        <button onClick={this.next} className="filled-btn">{submitText}</button>
      </form>
    )
  }
})

export default SelectPlanForm
