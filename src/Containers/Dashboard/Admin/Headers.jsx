import React from 'react'
import _ from 'underscore'
import moment from 'moment'

class AdminPanelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.getVisitsCount = this.getVisitsCount.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
  }

  getVisitsCount() { this.props.fetchVisitsCount() }
  fetchUsers() { this.props.fetchUsers() }

  render() {
    const { users = [], visitsCount } = this.props
    const subscribers = users.filter((user) => {
      if (user.stripe) {
        if (user.stripe.subscriptions) {
          if (user.stripe.subscriptions.data) {
            if (user.stripe.subscriptions.data[0].trial_end
              && !user.stripe.subscriptions.data[0].cancel_at_period_end
              && user.stripe.subscriptions.data[0].trial_end < moment().unix()) {
              return true
            }
            if (user.type > 1 && user.type < 5 && !user.stripe.subscriptions.data[0].cancel_at_period_end) {
              return true
            }
          }
        }
      }
      return false
    })

    const trials = users.filter((user) => {
      if (user.stripe) {
        if (user.stripe.subscriptions) {
          if (user.stripe.subscriptions.data) {
            if (user.stripe.subscriptions.data[0].status === 'trialing'
                && !user.stripe.subscriptions.data[0].cancel_at_period_end
                && user.type === 1
                && user.stripe.subscriptions.data[0].trial_end > moment().unix()) {
                return true
            }
          }
        }
      }
      return false
    })

    const stayedThroughTrial = users.filter(user => {
      if (user.stripe && user.email !== 'demo@formulastocks.com') {
        if (user.stripe.subscriptions) {
          if (user.stripe.subscriptions.data) {
            if (user.stripe.subscriptions.data[0].trial_end && (user.stripe.subscriptions.data[0].canceled_at > user.stripe.subscriptions.data[0].trial_end)) {
              return true
            } else if (
              (!user.stripe.subscriptions.data[0].canceled_at && user.type < 5)
              || (user.type > 1 && user.type < 5 && user.email !== 'demo@formulastocks.com')) {
              return true
            }
          }
        }
      }
      return false
    }).length

    const conversionRate = stayedThroughTrial / (users.length - 4) * 100

    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue" onClick={this.getVisitsCount}>
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{visitsCount}</h3>
              <p className="white-color">Unique Visitors</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border" onClick={this.fetchUsers}>
            <div className="symbol">
              <i className="fa fa-flask blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{subscribers.length}</h3>
              <p className="blue-color">Subscribers</p>
            </div>
          </li>

          <li className="panel green" onClick={this.getUsers}>
            <div className="symbol">
              <i className="fa fa-hourglass-half white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{trials.length}</h3>
              <p className="white-color">Trials</p>
            </div>
          </li>

          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-hourglass-end green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{conversionRate ? conversionRate.toFixed(2) : ''}%</h3>
              <p className="green-color">Trial Conversion rate</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
}

export default AdminPanelHeader
