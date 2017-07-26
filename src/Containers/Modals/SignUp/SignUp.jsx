import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../../../OLD_store'
import { browserHistory } from 'react-router'
import { createCustomer, signingUp, doneSigningUp, setSessionItem } from '../../../actions/session'

import ChoosePlan from './ChoosePlan.jsx'
import Billing from './Billing.jsx'

import '../modal.css'
import './signup.css'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    // eslint-disable-next-line
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

class SignUp extends Component {
  constructor(props) {
    super(props)

    let selected = localStorage.selectedPlan ? localStorage.selectedPlan : 'basic'

    this.state = {
      page: 1,
      selected: selected,
      gotInfo: false
    }
  }

  updateState = () => this.setState({ gotInfo: true })

  renderPrice = () => {
    const { plans } = this.props
    const plan = plans.data[this.state.selected]
    if (plan) {
        let period = plan.name === 'basic' || plan.name === 'premium' ? 'monthly' : 'annually'
        return '$' + formatPrice(String(plan.price)) + ' ' + period
    }
  }

  selectPlan = (plan) => this.setState({ selected: plan })

  closeModal = (e) => {
    if ((e.target.className === 'prof-modal-container' || e.target.className.indexOf('close-btn') > -1 || e.target.className.indexOf('close-icon') > -1) && !store.isSubmitting) {
      if (this.props.location.pathname === '/pro/signup') {
        browserHistory.push('/pro')
      } else {
        browserHistory.push('/')
      }
    }
  }

  nextPage = () => this.setState({ page: this.state.page + 1 })
  lastPage = () => this.setState({ page: this.state.page - 1 })

  renderContent = () => {
    const { actions, location, session, plans } = this.props
    if (this.state.page === 1) {
      return <ChoosePlan
              selected={this.state.selected}
              selectPlan={this.selectPlan}
              renderPrice={this.renderPrice}
              nextPage={this.nextPage}
              path={location.pathname}
            />
    } else {
      return <Billing
                  selected={this.state.selected}
                  renderPrice={this.renderPrice}
                  signUp={actions.createCustomer}
                  signingUp={actions.signingUp}
                  doneSigningUp={actions.doneSigningUp}
                  nextPage={this.nextPage}
                  lastPage={this.lastPage}
                  path={location.pathname}
                  session={session}
                  setSessionItem={actions.setSessionItem}
                  plans={plans}
              />
    }
  }

  renderCloseBtn = () => {
    if (this.props.location.pathname === '/pro/signup') {
      return <button className="close-btn" onClick={this.closeModal}><i className="material-icons close-icon">close</i></button>
    } else {
      return <button className="close-btn" onClick={this.closeModal}><i className="material-icons close-icon">close</i></button>
    }
  }

  render() {
    return (
      <div className="prof-modal-container" onClick={this.closeModal} ref="modalContainer">
        <div className="prof-modal signup-modal">
          {this.renderCloseBtn()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plans, session } = state
  return { plans, session }
}

function mapDispatchToProps(dispatch) {
  const actions = { createCustomer, signingUp, doneSigningUp, setSessionItem }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
