import React from 'react'
import Transition from 'react-addons-css-transition-group'
import _ from 'underscore'

import store from '../../store'
import Modal from '../Modal'

const Login = React.createClass({
  getInitialState: function() {
    return {formClasses: 'form-modal login form-bounce-down', error: ''}
  },
  login: function(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    store.session.login(email, password)
    .then(() => {
      this.closeModal()
    })
    .catch((errMsg) => {
      console.log('ERROR: ', errMsg);
      this.setState({formClasses: 'form-modal login login-shake', error: errMsg})
      window.setTimeout(() => {
        this.setState({formClasses: 'form-modal login', error: errMsg})
      }, 300)
    })
  },
  closeModal(e) {
    if (e) {
      if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1 ) {
        this.setState({slideOut: true, formClasses: 'form-modal login slide-out'})

        window.setTimeout(() => {
          store.settings.history.push('/')
        }, 300)
      }
    }
  },
  render: function() {
    let errorMsg
    let emailClasses = 'email'
    let passwordClasses = 'password'
    let verifyPasswordClasses = 'verify-password'

    if (this.state.error) {
      if (this.state.error.indexOf('Email') !== -1) {
        emailClasses = 'email error'
      } else if (this.state.error.indexOf('Password') !== -1) {
        passwordClasses = 'password error'
      } else if (this.state.error.indexOf('Wrong') !== -1) {
        emailClasses = 'email error'
        passwordClasses = 'password error'
      }
      errorMsg = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }

    let containerStyles = {
      top: "75px",
      background: "rgba(0,0,0,0.5)",
    }
    if (this.state.slideOut) {
      containerStyles = {
        top: "75px",
        background: 'rgba(0,0,0,0)'
      }
    }

    let modalStyles;
    if (this.state.slideOut) {
      containerStyles = {
        top: "75px",
        background: 'rgba(0,0,0,0)'
      }
      modalStyles = {
        animation: '300ms FormSlideOut'
      }
    }


    return (
      <div onClick={this.closeModal} className="modal-container fade-in" style={containerStyles}>
        <Transition
          transitionName="bounce-down"
          transitionEnterTimeout={30000}
          transitionLeaveTimeout={30000}>

          <div key="login-modal" onScroll={this.scroll} style={modalStyles} className={this.state.formClasses} ref="modal">

            <form onSubmit={this.login} className={this.state.formClasses}>
              <h3>Login</h3>
              {errorMsg}
              <div className={emailClasses}>
                <input type="text" placeholder="Email" ref="email" autoFocus="true"/>
              </div>
              <div className={passwordClasses}>
                <input type="password" placeholder="Password" ref="password"/>
              </div>
              <input type="submit" id="submit-btn" value="Login"/>
            </form>

          </div>
        </Transition>
      </div>
    )
  }
})

export default Login
