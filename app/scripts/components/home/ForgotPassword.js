import React from 'react'
import $ from 'jquery'

import store from '../../store'

const ForgotPassword = React.createClass({
  resetPassword(e) {
    e.preventDefault()
    // console.log('resetting pw');
    console.log(this.refs);
    let email = this.refs.email.value

    if (store.session.validateEmail(email)) {
      console.log('valid email');
      $.ajax({
        url: `https://baas.kinvey.com/rpc/kid_rJRC6m9F/${email}/user-password-reset-initiate`,
        type: 'POST',
      })
    } else {
      console.log('invalid email');
    }
  },
  render() {
    return (
      <div className="forgot-pw-modal">
        <h2>Forgot your password?</h2>
        <p>Enter your email below, and we'll send you a link to reset your password.</p>
        <form onSubmit={this.resetPassword}>
          <input type="email" placeholder="Email" ref="email"/>
          <input type="submit" value="Reset password"/>
        </form>
      </div>
    )
  }
})

export default ForgotPassword
