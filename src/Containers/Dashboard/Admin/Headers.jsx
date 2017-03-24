import React from 'react'
import $ from 'jquery'
import _ from 'underscore'
import moment from 'moment'

import admin from '../../../admin'

class AdminPanelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.getVisitsCount = this.getVisitsCount.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.state = {
      fetched: false,
      visitors: 0,
      newsletterSubs: admin.newsletterSubs.toJSON(),
      users: []
    }
  }

  componentDidMount() {
    admin.visits.fetch()

    this.getVisitsCount()
    this.getUsers()
  }

  getUsers() {
    this.setState({ users: [] })
    $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/`)
    .then((users) => {
      this.setState({ users: users })
    })
  }

  getVisitsCount() {
    this.setState({ visitors: 0 })
    admin.getVisitCount()
    .then(count => this.setState({ visitors: count }))
  }

  render() {
    const subscribers = this.state.users.filter((user) => {
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

    const trials = this.state.users.filter((user) => {
      if (user.stripe) {
        if (user.stripe.subscriptions) {
          if (user.stripe.subscriptions.data) {
            if (user.stripe.subscriptions.data[0].status === 'trialing'
                && !user.stripe.subscriptions.data[0].cancel_at_period_end
                && user.type === 1
                && user.stripe.subscriptions.data[0].trial_end > moment().unix()) {
                  console.log('trial: ', user);
                return true
            }
          }
        }
      }
      return false
    })

    const stayedThroughTrial = this.state.users.filter(user => {
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

    const conversionRate = stayedThroughTrial / (this.state.users.length - 4) * 100

    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue" onClick={this.getVisitsCount}>
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.visitors}</h3>
              <p className="white-color">Unique Visitors</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border" onClick={this.getUsers}>
            <div className="symbol">
              <i className="fa fa-flask blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{subscribers.length}</h3>
              <p className="blue-color">Subscribers</p>
            </div>
          </li>

          <li className="panel green"  onClick={this.getUsers}>
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
