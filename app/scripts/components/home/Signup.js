import $ from 'jquery'
import React from 'react'

import store from '../../store'
import Modal from '../Modal'

const Signup = React.createClass({
  getInitialState: function() {
    return {formClasses: 'form-modal signup slide-in', error: ''}
  },
  signup: function(e) {
    e.preventDefault()
    console.log('this: ', this);
    let username = this.refs.username.value
    let password = this.refs.password.value
    let verifyPassword = this.refs.verifyPassword.value
    store.session.signup(username, password, verifyPassword)
      .then(() => {
        this.props.closeModal()
      })
      .catch((errMsg) => {
        console.log('ERROR: ', errMsg);
        this.setState({formClasses: 'form-modal signup shake', error: errMsg})
        window.setTimeout(() => {
          this.setState({formClasses: 'form-modal signup', error: errMsg})
        }, 300)
      })

  },
  render: function() {
    let errorMsg
    let userClasses = 'username'
    let passwordClasses = 'password'
    let verifyPasswordClasses = 'verify-password'

    if (this.state.error) {
      if (this.state.error.indexOf('User') !== -1) {
        userClasses = 'username error'
      } else if (this.state.error.indexOf('match') !== -1) {
        passwordClasses = 'password error'
        verifyPasswordClasses = 'verify-password error'
      } else if (this.state.error.indexOf('Password') !== -1) {
        passwordClasses = 'password error'
      }
      errorMsg = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }
    return (
      <form onSubmit={this.signup} className={this.state.formClasses} ref="signupModal" style={this.props.modalStyles}>
        <h3>Signup</h3>
        {errorMsg}
        <div className={userClasses}>
          <input type="text" placeholder="Username" ref="username" autoFocus="true"/>
        </div>
        <div className={passwordClasses}>
          <input type="password" placeholder="Password" ref="password"/>
        </div>
        <div className={verifyPasswordClasses}>
          <input type="password" placeholder="Verify Password" ref="verifyPassword"/>
        </div>
        <input type="submit" id="submit-btn" />
      </form>
    )
  }
})

export default Signup
