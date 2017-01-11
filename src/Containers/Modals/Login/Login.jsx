import React from 'react'
import Transition from 'react-addons-css-transition-group'
import _ from 'underscore'

import store from '../../../store'
import Modal from '../Modal'
import ForgotPassword from './ForgotPassword'

import './login.css'

class Login extends React.Component {
  constructor() {
    super()
    this.closeModal = this.closeModal.bind(this)
    this.showForgotPasswordModal = this.showForgotPasswordModal.bind(this)
    this.login = this.login.bind(this)

    this.state = {
      formClasses: 'form-modal login form-bounce-down',
      error: '',
      showForgotPasswordModal: false
    }
  }
  closeModal(e) {
    if (e) {
      if ((_.toArray(e.target.classList).indexOf('modal-container') !== -1
      || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1)
      && !this.state.showForgotPasswordModal) {
        this.setState({slideOut: true, formClasses: 'form-modal login slide-out'})

        window.setTimeout(() => {
          store.settings.history.push('/')
        }, 300)
      } else if ((_.toArray(e.target.classList).indexOf('modal-container') !== -1
      || _.toArray(e.target.classList).indexOf('close-modal') !== -1
      || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1)
      && this.state.showForgotPasswordModal)  {
        this.setState({showForgotPasswordModal: false})
      }
    }
  }

  showForgotPasswordModal() {
    this.setState({showForgotPasswordModal: true})
  }

  login(e) {
    e.preventDefault()
    this.refs.password.blur()
    this.refs.email.blur()
    let email = this.refs.email.value.toLowerCase()
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
  }

  render() {
    let errorMsg
    let emailClasses = 'email'
    let passwordClasses = 'password'

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
      background: "rgba(0,0,0,0.2)",
      zIndex: '2000'
    }
    if (this.state.slideOut) {
      containerStyles = {
        background: 'rgba(0,0,0,0)'
      }
    }

    let modalStyles;
    if (this.state.slideOut) {
      containerStyles = {
        background: 'rgba(0,0,0,0)'
      }
      modalStyles = {
        animation: '300ms FormSlideOut'
      }
    }

    let forgotPasswordModal;
    if (this.state.showForgotPasswordModal) {
      let modalStyles = {
        maxWidth: '400px',

      }

      forgotPasswordModal = (
        <Modal modalStyles={modalStyles} closeModal={() => {}}>
          <ForgotPassword closeModal={this.closeModal}/>
        </Modal>
      )
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
              <a className="white forgot-pw blue-color" onClick={this.showForgotPasswordModal}>Forgot your password?</a>
            </form>

          </div>
        </Transition>
        {forgotPasswordModal}
      </div>
    )
  }
}

export default Login
