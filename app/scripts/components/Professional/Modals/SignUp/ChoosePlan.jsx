import React from 'react'
import $ from 'jquery'
import store from '../../../../store.js'

import FeatureList from './FeatureList.jsx'
import PlanColumn from './PlanColumn.jsx'

class ChoosePlan extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.renderNextBtn = this.renderNextBtn.bind(this)
    this.renderError = this.renderError.bind(this)

    this.state = { validating: false, error: '', errorType: '' }
  }

  checkForDuplicates(email) {
    return $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/?query={"email":"${email}"}`)
  }

  submit() {
    this.setState({ validating: true, error: '', errorType: '' })
    const email = this.refs.email.value.toLowerCase()
    const password = this.refs.password.value
    if (email && password) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(email)) {
        this.checkForDuplicates(email)
        .then(response => {
          if (response.length === 0) {
            store.session.set('email', email)
            store.session.set('password', password)
            this.props.nextPage()
          } else {
            this.setState({ validating: false, error: 'Email already exists', errorType: 'email'})
          }
        })
      } else {
        this.setState({ validating: false, error: 'Invalid email', errorType: 'email'})
      }
    } else if (!email) {
      this.setState({ validating: false, error: 'Enter your email', errorType: 'email'})
    } else if (!password) {
      this.setState({ validating: false, error: 'Choose a password', errorType: 'password'})
    }
  }

  renderNextBtn() {
    if (!this.state.validating) {
      return <button className="next" onClick={this.submit}>Next</button>
    } else {
      return <div className="next"><i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i></div>
    }
  }

  renderError(errorChecker) {
    if (errorChecker === this.state.errorType) {
      return <p className="error"><i className="fa fa-exclamation" aria-hidden="true"></i>{this.state.error}</p>
    }
  }

  render() {
    const emailClass = this.state.error.toLowerCase().indexOf('email') > -1 ? 'red-outline' : ''
    const passwordClass = this.state.error.indexOf('password') > -1 ? 'red-outline' : ''

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
            { this.state.error.toLowerCase().indexOf('email') === -1 ? <label htmlFor="email">Enter your email</label> : this.renderError('email')}
            <input id="email" className={emailClass} type="email" placeholder="Email address" ref="email"/>
            { this.state.error.indexOf('password') === -1 ? <label htmlFor="password">Choose a password</label> : this.renderError('password')}
            <input id="password" className={passwordClass} type="password" placeholder="Password" ref="password"/>
            {this.renderNextBtn()}
          </div>
        </div>)
  }
}

export default ChoosePlan
