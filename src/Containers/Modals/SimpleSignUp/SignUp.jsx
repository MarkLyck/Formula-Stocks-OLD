import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createCustomer, setSessionItem } from '../../../actions/session'
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

    this.state = { page: 1, tax: 0 }
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

  nextPage() { this.setState({ page: 2 }) }
  setTax(tax) { this.setState({ tax: tax }) }

  renderContent() {
    const { plans, actions } = this.props
    if (this.state.page === 1) { return <AccountInfo
                                          nextPage={this.nextPage}
                                          setData={this.setData}
                                          setTax={this.setTax}
                                          setSessionItem={actions.setSessionItem} />
                                        }
    else { return <Billing tax={this.state.tax}
                    plan={plans.data[plans.selectedPlan]}
                    signUp={actions.createCustomer}
                    setSessionItem={actions.setSessionItem} /> }
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

function mapStateToProps(state) {
  const { plans } = state
  return { plans }
}

function mapDispatchToProps(dispatch) {
  const actions = { createCustomer, setSessionItem }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
