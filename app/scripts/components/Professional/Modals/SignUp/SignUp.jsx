import React from 'react'
import store from '../../../../store.js'
import { Link, browserHistory } from 'react-router'

import ChoosePlan from './ChoosePlan.jsx'
import Billing from './Billing.jsx'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
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

    this.state = {
      page: 2,
      selected: 'premium',
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
    if (e.target.className === 'prof-modal-container') {
      browserHistory.push('/pro')
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  renderContent() {
    if (this.state.page === 1) {
      return <ChoosePlan selected={this.state.selected} selectPlan={this.selectPlan} renderPrice={this.renderPrice} nextPage={this.nextPage}/>
    } else if (this.state.page === 2) {
      return <Billing selected={this.state.selected} renderPrice={this.renderPrice} nextPage={this.nextPage}/>
    }
  }

  render() {
    return (
      <div className="prof-modal-container" onClick={this.closeModal} ref="modalContainer">
        <div className="prof-modal signup-modal">
          {this.renderContent()}
          <div className="bottom-bar">
            <p>Statistics are calculated from backtested data. We make no guarantee of future performance. See our <Link to='/terms'>Terms of service</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
