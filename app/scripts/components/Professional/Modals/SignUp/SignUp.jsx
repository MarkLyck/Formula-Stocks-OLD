import React from 'react'
import PlanColumn from './PlanColumn.jsx'
import FeatureList from './FeatureList.jsx'
import store from '../../../../store.js'
import { browserHistory } from 'react-router'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  return value
}

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
    this.selectPlan = this.selectPlan.bind(this)
    this.renderPrice = this.renderPrice.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.state = {
      page: 1,
      selected: 'premium',
      gotInfo: false
    }
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

  selectPlan(plan) {
    this.setState({ selected: plan })
  }

  renderPrice() {
    const plan = store.plans.get(this.state.selected).toJSON()
    let period = plan.name === 'basic' || plan.name === 'premium' ? 'monthly' : 'annually'
    return '$' + formatPrice(String(plan.price)) + ' ' + period
  }

  closeModal(e) {
    if (e.target.className === 'prof-modal-container') {
      browserHistory.push('/professional')
    }
  }

  render() {
    return (
      <div className="prof-modal-container" onClick={this.closeModal} ref="modalContainer">
        <div className="prof-modal signup-modal">
          <div className="beside">
            <div className="left">
              <h2>Choose your plan</h2>
              <div className="plan-overview">
                <FeatureList/>
                <div className="plan-columns-container">
                  <PlanColumn plan={store.plans.get('premium').toJSON()} selected={this.state.selected} selectPlan={this.selectPlan} showAll={this.state.showAll}/>
                  <PlanColumn plan={store.plans.get('business').toJSON()} selected={this.state.selected} selectPlan={this.selectPlan} showAll={this.state.showAll}/>
                  <PlanColumn plan={store.plans.get('fund').toJSON()} selected={this.state.selected} selectPlan={this.selectPlan} showAll={this.state.showAll}/>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="top">
                <div className="steps">
                  <div className="step"><div className="circle selected"/><p>Choose a plan</p></div>
                  <div className="step"><div className="circle"/><p>Billing</p></div>
                  <div className="step"><div className="circle"/><p>Done</p></div>
                </div>
                <div className="line"/>
              </div>

              <div className="plan-name info">
                <p>Plan</p>
                <p>{this.state.selected}</p>
              </div>
              <div className="plan-price info">
                <p>Price</p>
                <p>{this.renderPrice()}</p>
              </div>
              <label htmlFor="email">Enter your email</label>
              <input id="email" type="email" placeholder="Email address" ref="email"/>
              <label htmlFor="email">Choose a password</label>
              <input id="password" type="password" placeholder="Password" ref="password"/>
              <button className="next">Next</button>
            </div>

          </div>
          <div className="bottom-bar">
            <p>Formula Stocks ApS.</p>
            <p>By signing up you agree to our <a href="/terms">terms and condtions</a> & <a href="/privacy">privacy policy</a></p>
          </div>



        </div>
      </div>
    )
  }
}

export default SignUp
