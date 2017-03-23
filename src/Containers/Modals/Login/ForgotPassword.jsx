import React from 'react'
import $ from 'jquery'

import store from '../../../store'
import './forgotPassword.css'

class ForgotPassword extends React.Component{
  constructor() {
    super()
    this.resetPassword = this.resetPassword.bind(this)
    this.state = { posting: false, success: false, error: false, email: '' }
  }

  resetPassword(e) {
    e.preventDefault()
    let email = this.refs.email.value

    $.ajax({
      url: `https://baas.kinvey.com/rpc/kid_rJRC6m9F/${email}/user-password-reset-initiate`,
      type: 'POST',
    })
    .then((r) => {
      this.setState({success: true, email: email})
    })
    .fail((e) => {
      console.error('error: ', e)
      this.setState({error: e})
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
