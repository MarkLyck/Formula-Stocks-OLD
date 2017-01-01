import React from 'react'
import PlanColumn from './PlanColumn.jsx'
import FeatureList from './FeatureList.jsx'
import store from '../../../../store.js'

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

  render() {
    return (
      <div className="prof-modal-container">
        <div className="prof-modal signup-modal">
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
                {/* <div className="step"><div className="circle"/><p>Create Account</p></div> */}
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
            <input type="email" placeholder="Email address"/>
            <input type="password" placeholder="Password"/>
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
