import React from 'react'
import store from '../../../store.js'
import { browserHistory } from 'react-router'

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

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
    this.selectPlan = this.selectPlan.bind(this)
    this.renderPrice = this.renderPrice.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.renderCloseBtn = this.renderCloseBtn.bind(this)

    let selected = localStorage.selectedPlan ? localStorage.selectedPlan : 'basic'

    this.state = {
      page: 1,
      selected: selected,
      gotInfo: false
    }
  }

  updateState() {
    this.setState({ gotInfo: true })
  }

  componentDidMount() {
    store.plans.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.plans.off('update', this.updateState)
  }

  renderPrice() {
    const plan = store.plans.get(this.state.selected).toJSON()
    let period = plan.name === 'basic' || plan.name === 'premium' ? 'monthly' : 'annually'
    return '$' + formatPrice(String(plan.price)) + ' ' + period
  }

  selectPlan(plan) {
    this.setState({ selected: plan })
  }

  closeModal(e) {
    if ((e.target.className === 'prof-modal-container' || e.target.className.indexOf('close-btn') > -1) && !store.isSubmitting) {
      if (this.props.location.pathname === '/pro/signup') {
        browserHistory.push('/pro')
      } else {
        browserHistory.push('/')
      }
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }
  lastPage() {
    this.setState({ page: this.state.page - 1 })
  }

  renderContent() {
    if (this.state.page === 1) {
      return <ChoosePlan selected={this.state.selected} selectPlan={this.selectPlan} renderPrice={this.renderPrice} nextPage={this.nextPage} path={this.props.location.pathname}/>
    } else {
      return <Billing selected={this.state.selected} renderPrice={this.renderPrice} nextPage={this.nextPage} lastPage={this.lastPage} path={this.props.location.pathname}/>
    }
  }

  renderCloseBtn() {
    if (this.props.location.pathname === '/pro/signup') {
      return <button className="close-btn" onClick={this.closeModal}><i className="material-icons close-btn">close</i></button>
    } else {
      return <button className="close-btn" onClick={this.closeModal}><i className="material-icons close-btn">close</i></button>
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

export default SignUp
