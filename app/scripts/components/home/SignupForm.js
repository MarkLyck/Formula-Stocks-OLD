import React from 'react'

import store from '../../store'

const SignupForm = React.createClass({
  getInitialState: function() {
    return {formClasses: `signup ${this.props.formAnimation}`, error: ''}
  },
  componentWillReceiveProps(newProps) {
    this.setState({formClasses: `signup ${newProps.formAnimation}`})
  },
  signup: function(e) {
    e.preventDefault()
    let name = this.refs.name.value
    let email = this.refs.email.value.toLowerCase()
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
      store.session.set('name', name)
      store.session.set('email', email)
      store.session.set('password', password)
      this.props.goToModal('selectPlan')
    })
    .catch((errMsg) => {
      this.setState({formClasses: 'signup shake', error: errMsg})
      window.setTimeout(() => {
        this.setState({formClasses: 'signup', error: errMsg})
      }, 300)
    })
  },
  render() {
    console.log(this.state.formClasses);
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

    return (
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
    )
  }
})

export default SignupForm
