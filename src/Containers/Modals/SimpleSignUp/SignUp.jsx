import React from 'react'
import store from '../../../store.js'
import { browserHistory } from 'react-router'
import AccountInfo from './AccountInfo'

import '../modal.css'
import './signup.css'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    // eslint-disable-next-line
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
    this.renderContent = this.renderContent.bind(this)

    this.state = { page: 1 }
  }

  closeModal(e) {
    if ((e.target.className === 'simple-signup-modal-container' || e.target.className.indexOf('close-btn') > -1 || e.target.className.indexOf('close-icon') > -1) && !store.isSubmitting) {
      if (this.props.location.pathname === '/pro/signup') {
        browserHistory.push('/pro')
      } else {
        browserHistory.push('/')
      }
    }
  }

  nextPage() {
    console.log('next page')
  }

  renderContent() {
    if (this.state.page === 1) { return <AccountInfo nextPage={this.nextPage}/> }
  }

  render() {
    return (
      <div className="simple-signup-modal-container" onClick={this.closeModal} ref="modalContainer">
        <div className="simple-signup-modal signup-modal">
          <button className="close-btn" onClick={this.closeModal}><i className="material-icons close-icon">close</i></button>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default SignUp
