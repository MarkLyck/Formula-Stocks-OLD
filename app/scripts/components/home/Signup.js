import $ from 'jquery'
import _ from 'underscore'
import React from 'react'

import store from '../../store'
import Modal from '../Modal'

const Signup = React.createClass({
  getInitialState: function() {
    return {formClasses: 'signup bounce-down', error: '', selectedPlan: 'premium', planFormClasses: 'select-plan-form slide-in-right'}
  },
  signup: function(e) {
    e.preventDefault()
    let name = this.refs.name.value
    let email = this.refs.email.value
    let password = this.refs.password.value
    let verifyPassword = this.refs.verifyPassword.value

    let user = {
      name: name,
      email: email,
      password: password,
      verifyPassword: verifyPassword
    }

    store.session.validateNewUser(user)
    .then(() => {
      console.log('VALID NAME: ', name);
      store.session.set('name', name)
      store.session.set('email', email)
      store.session.set('password', password)
      this.setState({formClasses: 'signup slide-out-left', error: ''})
    })
    .catch((errMsg) => {
      this.setState({formClasses: 'signup shake', error: errMsg})
      window.setTimeout(() => {
        this.setState({formClasses: 'signup', error: errMsg})
      }, 300)
    })
  },
  closeModal(e) {
    if (e) {
      if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1 ) {
        this.setState({slideOut: true, formClasses: 'signup slide-out'})
        window.setTimeout(() => {
          store.settings.history.push('/')
        }, 300)
      }
    }
  },
  selectPlan(plan) {
    this.setState({selectedPlan: plan})
  },
  render: function() {
    let errorMsg
    let nameClasses = 'name input-wrapper'
    let emailClasses = 'email input-wrapper'
    let passwordClasses = 'password input-wrapper'
    let verifyPasswordClasses = 'verify-password input-wrapper'

    if (this.state.error) {
      console.log(this.state.error);
      if (this.state.error.indexOf('name') !== -1) {
        nameClasses = 'name error input-wrapper'
      } else if (this.state.error.indexOf('email') !== -1) {
        emailClasses = 'email error input-wrapper'
      } else if (this.state.error.indexOf('match') !== -1) {
        passwordClasses = 'password error input-wrapper'
        verifyPasswordClasses = 'verify-password error input-wrapper'
      } else if (this.state.error.toLowerCase().indexOf('password') !== -1) {
        passwordClasses = 'password error input-wrapper'
      }
      errorMsg = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }

    let containerStyles = {animation: '300ms fadeIn'}

    if (this.state.slideOut) {
      containerStyles = {background: 'rgba(0,0,0,0)'}
    }

    let modalStyles = {
      width: '60%',
      maxWidth: '400px',
      background: 'none',
    }

    let basicClass = ''
    let premiumClass = ''
    let businessClass = ''
    let fundClass = ''

    if(this.state.selectedPlan === 'basic') {basicClass = 'selected'}
    if(this.state.selectedPlan === 'premium') {premiumClass = 'selected'}
    if(this.state.selectedPlan === 'business') {businessClass = 'selected'}
    if(this.state.selectedPlan === 'fund') {fundClass = 'selected'}



    return (
      <Modal closeModal={this.closeModal} containerStyles={containerStyles} modalStyles={modalStyles}>
        {
        // <form onSubmit={this.signup} className={this.state.formClasses} ref="signupModal">
        //   <h3>Signup</h3>
        //   {errorMsg}
        //   <div className={nameClasses}>
        //     <input type="text" placeholder="Name" ref="name" autoFocus="true"/>
        //   </div>
        //   <div className={emailClasses}>
        //     <input type="text" placeholder="Email" ref="email"/>
        //   </div>
        //   <div className={passwordClasses}>
        //     <input type="password" placeholder="Password" ref="password"/>
        //   </div>
        //   <div className={verifyPasswordClasses}>
        //     <input type="password" placeholder="Verify Password" ref="verifyPassword"/>
        //   </div>
        //   <input type="submit" id="submit-btn" value="Next"/>
        // </form>
      }

        <form className={this.state.planFormClasses}>
          <h3 className="modal-title">Select a Plan</h3>
          <div className="plans">
            <button className={basicClass} onClick={this.selectPlan.bind(null, 'basic')}><h3 className="plan-name">Basic</h3><h3 className="price">Free trial<br/><span className="disclaimer">$50 monthly after first month</span></h3></button>
            <button className={premiumClass} onClick={this.selectPlan.bind(null, 'premium')}><h3 className="plan-name">Premium</h3><h3 className="price">$100<br/><span className="disclaimer">monthly</span></h3></button>
            <button className={businessClass} onClick={this.selectPlan.bind(null, 'business')}><h3 className="plan-name">Business</h3><h3 className="price">$20,000<br/><span className="disclaimer">annually</span></h3></button>
            <button className={fundClass} onClick={this.selectPlan.bind(null, 'fund')}><h3 className="plan-name">Fund</h3><h3 className="price">$120,000<br/><span className="disclaimer">annually</span></h3></button>
          </div>
          <button className="filled-btn">Next</button>
        </form>

      </Modal>
    )
  }
})

export default Signup
