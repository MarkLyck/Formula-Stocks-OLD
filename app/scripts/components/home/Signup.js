import $ from 'jquery'
import _ from 'underscore'
import React from 'react'

import store from '../../store'
import Modal from '../Modal'

const Signup = React.createClass({
  getInitialState: function() {
    return {formClasses: 'signup bounce-down', error: ''}
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
  render: function() {
    let errorMsg
    let nameClasses = 'name input-wrapper'
    let emailClasses = 'email input-wrapper'
    let passwordClasses = 'password input-wrapper'
    let verifyPasswordClasses = 'verify-password input-wrapper'

    if (this.state.error) {
      if (this.state.error.indexOf('User') !== -1) {
        userClasses = 'username error input-wrapper'
      } else if (this.state.error.indexOf('match') !== -1) {
        passwordClasses = 'password error input-wrapper'
        verifyPasswordClasses = 'verify-password error'
      } else if (this.state.error.indexOf('Password') !== -1) {
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

    return (
      <Modal closeModal={this.closeModal} containerStyles={containerStyles} modalStyles={modalStyles}>
        <form onSubmit={this.signup} className={this.state.formClasses} ref="signupModal">
          <h3>Signup</h3>
          {errorMsg}
          <div className={nameClasses}>
            <input type="text" placeholder="Name" ref="name" autoFocus="true"/>
          </div>
          <div className={emailClasses}>
            <input type="text" placeholder="Email" ref="email"/>
          </div>
          <div className={passwordClasses}>
            <input type="password" placeholder="Password" ref="password"/>
          </div>
          <div className={verifyPasswordClasses}>
            <input type="password" placeholder="Verify Password" ref="verifyPassword"/>
          </div>
          <input type="submit" id="submit-btn" value="Next"/>
        </form>
      </Modal>
    )
  }
})

export default Signup
