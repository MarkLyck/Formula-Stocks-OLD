import React from 'react'
import $ from 'jquery'

import store from '../../store'
import admin from '../../admin'

const AdminPanelHeader = React.createClass({
  getInitialState() {
    return {
      fetched: false,
      visitors: admin.visits.toJSON(),
      newsletterSubs: admin.newsletterSubs.toJSON(),
      users: []
    }
  },
  componentDidMount() {
    admin.visits.on('update', this.updateState)
    admin.newsletterSubs.on('update', this.updateState)
    admin.visits.fetch()
    admin.newsletterSubs.fetch()
    $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/`)
    .then((users) => {
      this.setState({users: users})
    })
  },
  componentWillUnmount() {
    admin.visits.off('change update', this.updateState)
  },
  updateState() {
    this.setState({visitors: admin.visits.toJSON()})
    this.setState({newsletterSubs: admin.newsletterSubs.toJSON()})
  },
  render() {
    let subscribers = this.state.users.filter((user) => {
      if (user.type > 0 && user.type < 5 && user.name !== 'FS Demo') {
        return true;
      } else {
        return false;
      }
    })
    let trials = this.state.users.filter((user) => {
      if (user.type === 0) {
        return true
      } else {
        return false
      }
    })

    // let conversionRate = 0.00;
    // if (subscribers.length !== 0) {
    //   conversionRate = 100 - this.state.visitors.length / subscribers.length * 100
    // }
    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.visitors.length}</h3>
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
              <i className="fa fa-list white-color"></i>
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
})

export default AdminPanelHeader
