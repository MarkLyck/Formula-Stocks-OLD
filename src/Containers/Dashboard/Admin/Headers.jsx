import React from 'react'
import $ from 'jquery'
import _ from 'underscore'
import moment from 'moment'

import admin from '../../../admin'

class AdminPanelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.calculateVisitors = this.calculateVisitors.bind(this)

    this.state = {
      fetched: false,
      visitors: admin.visits.toJSON(),
      newsletterSubs: admin.newsletterSubs.toJSON(),
      users: []
    }
  }

  componentDidMount() {
    admin.visits.on('update', this.updateState)
    admin.newsletterSubs.on('update', this.updateState)
    admin.visits.fetch()
    admin.newsletterSubs.fetch()
    $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/`)
    .then((users) => {
      this.setState({users: users})
    })
  }

  componentWillUnmount() {
    admin.visits.off('change update', this.updateState)
  }

  updateState() {
    this.setState({visitors: admin.visits.toJSON()})
    this.setState({newsletterSubs: admin.newsletterSubs.toJSON()})
  }

  calculateVisitors() {
    return this.state.visitors.length ? (this.state.visitors.length) : 0
  }

  render() {
    let subscribers = this.state.users.filter((user) => {
      if (user.stripe) {
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
      return false
    })
    let trials = this.state.users.filter((user) => {
      if (user.stripe) {
        if (user.stripe.subscriptions.data) {
          if (user.stripe.subscriptions.data[0].status === 'trialing'
              && !user.stripe.subscriptions.data[0].cancel_at_period_end
              && user.type === 1
              && user.stripe.subscriptions.data[0].trial_end > moment().unix()) {
              return true
          }
        }
      }
      return false
    })

    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.calculateVisitors()}</h3>
              <p className="white-color">Unique Visitors</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-flask blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{subscribers.length}</h3>
              <p className="blue-color">Subscribers</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-hourglass-start white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{trials.length}</h3>
              <p className="white-color">Trials</p>
            </div>
          </li>


          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-paper-plane green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{this.state.newsletterSubs.length}</h3>
              <p className="green-color">Newsletter subs.</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
}

export default AdminPanelHeader
