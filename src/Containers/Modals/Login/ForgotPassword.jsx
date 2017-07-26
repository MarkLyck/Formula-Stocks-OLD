import React, { Component } from 'react'
import store from '../../../store'

import './forgotPassword.css'

class ForgotPassword extends Component {
  state = { posting: false, success: false, error: false, email: '' }

  resetPassword = (e) => {
    e.preventDefault()
    let email = this.refs.email.value

    const resetPasswordHeaders = new Headers()
    resetPasswordHeaders.append('Authorization', `Basic ${store.getState().settings.basicAuth}`)
    resetPasswordHeaders.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: resetPasswordHeaders,
    }

    fetch(`https://baas.kinvey.com/rpc/${store.getState().settings.appKey}/${email}/user-password-reset-initiate`, options)
      .then(r => {
        this.setState({success: true, email: email})
        this.props.closeModal()
      })
      .catch(() => {
        this.setState({success: true, email: email})
      })
  }
  render() {
    let content = (
      <div>
        <h2>Forgot your password?</h2>
        <p>Enter your email below, and we'll send you a link to reset your password.</p>
        <form onSubmit={this.resetPassword}>
          <input type="email" placeholder="Email" ref="email"/>
          <input type="submit" value="Reset password"/>
        </form>
      </div>
    )
    if (this.state.success) {
      content = (
        <div>
          <h2>Success!</h2>
          <i className="fa fa-check green-color" aria-hidden="true"></i>
          <p>We sent an email to <span className="blue-color">{this.state.email}</span> with, a link to reset your password.</p>
          <button className="filled-btn close-modal" onClick={this.props.closeModal}>Got it!</button>
        </div>
      )
    }
    return (
      <div className="forgot-pw-modal">
        {content}
      </div>
    )
  }
}

export default ForgotPassword
