import React, { Component } from 'react'
import Transition from 'react-addons-css-transition-group'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSession, logIn, logInError } from '../../../actions/session'
import _ from 'underscore'

import Modal from '../Modal'
import ForgotPassword from './ForgotPassword'

import './login.css'

class Login extends Component {
  constructor() {
    super()
    this.closeModal = this.closeModal.bind(this)
    this.showForgotPasswordModal = this.showForgotPasswordModal.bind(this)
    this.login = this.login.bind(this)

    this.state = { formClasses: 'form-modal login form-bounce-down', showForgotPasswordModal: false }
  }

  componentDidMount() { this.props.actions.fetchSession() }

  closeModal(e) {
    if (e) {
      if ((_.toArray(e.target.classList).indexOf('modal-container') !== -1
      || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1)
      && !this.state.showForgotPasswordModal) {
        this.setState({slideOut: true, formClasses: 'form-modal login slide-out'})

        window.setTimeout(() => {
          browserHistory.push('/')
        }, 300)
      } else if ((_.toArray(e.target.classList).indexOf('modal-container') !== -1
      || _.toArray(e.target.classList).indexOf('close-modal') !== -1
      || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1)
      && this.state.showForgotPasswordModal)  {
        this.setState({showForgotPasswordModal: false})
      }
    }
  }

  showForgotPasswordModal() { this.setState({ showForgotPasswordModal: true }) }

  login(e) {
    e.preventDefault()
    const { actions } = this.props
    this.refs.password.blur()
    this.refs.email.blur()

    let email = this.refs.email.value.toLowerCase()
    let password = this.refs.password.value

    if (email && password) { actions.logIn(email, password) }
    else if (!email) { actions.logInError('Missing email') }
    else if (!password) { actions.logInError('Missing password') }
  }

  render() {
    const { session } = this.props
    let errorMsg
    let emailClasses = 'email'
    let passwordClasses = 'password'

    if (session.loginError) {
      if (session.loginError.indexOf('email') !== -1) { emailClasses = 'email error' }
      else if (session.loginError.indexOf('password') !== -1) { passwordClasses = 'password error' }
      else if (session.loginError.indexOf('Invalid') !== -1) {
        emailClasses = 'email error'
        passwordClasses = 'password error'
      }

      errorMsg = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{session.loginError}</h4>
        </div>)
    }

    let containerStyles = { background: "rgba(0,0,0,0.2)", zIndex: '2000' }
    if (this.state.slideOut) {
      containerStyles = { background: 'rgba(0,0,0,0)' }
    }

    let modalStyles;
    if (this.state.slideOut) {
      containerStyles = { background: 'rgba(0,0,0,0)' }
      modalStyles = { animation: '300ms FormSlideOut' }
    }

    let forgotPasswordModal;
    if (this.state.showForgotPasswordModal) {
      let modalStyles = { maxWidth: '400px' }

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

function mapStateToProps(state) {
  const { session } = state
  return { session }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchSession, logIn, logInError }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
