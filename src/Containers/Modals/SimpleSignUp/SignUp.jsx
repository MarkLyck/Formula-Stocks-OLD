import React from 'react'
import store from '../../../store.js'
import { browserHistory } from 'react-router'
import AccountInfo from './AccountInfo'
import Billing from './Billing'

import '../modal.css'
import './signup.css'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.setTax = this.setTax.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.state = { page: 2, tax: 0 }
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
    this.setState({ page: 2 })
  }

  setTax(tax) {
    this.setState({ tax: tax })
  }

  renderContent() {
    if (this.state.page === 1) { return <AccountInfo nextPage={this.nextPage} setTax={this.setTax}/> }
    else { return <Billing tax={this.state.tax} plan="basic"/> }
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
