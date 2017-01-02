import React from 'react'
import store from '../../../../store.js'

import FeatureList from './FeatureList.jsx'
import PlanColumn from './PlanColumn.jsx'

class ChoosePlan extends React.Component {
  render() {
    return (
        <div className="choose-plan signup-content">
          <div className="left">
            <h2>Choose your plan</h2>
            <div className="plan-overview">
              <FeatureList/>
              <div className="plan-columns-container">
                <PlanColumn plan={store.plans.get('premium').toJSON()} selected={this.props.selected} selectPlan={this.props.selectPlan}/>
                <PlanColumn plan={store.plans.get('business').toJSON()} selected={this.props.selected} selectPlan={this.props.selectPlan}/>
                <PlanColumn plan={store.plans.get('fund').toJSON()} selected={this.props.selected} selectPlan={this.props.selectPlan}/>
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
              <p>{this.props.selected}</p>
            </div>
            <div className="plan-price info">
              <p>Price</p>
              <p>{this.props.renderPrice()}</p>
            </div>
            <label htmlFor="email">Enter your email</label>
            <input id="email" type="email" placeholder="Email address" ref="email"/>
            <label htmlFor="email">Choose a password</label>
            <input id="password" type="password" placeholder="Password" ref="password"/>
            <button className="next" onClick={this.props.nextPage}>Next</button>
          </div>
        </div>)
  }
}

export default ChoosePlan
