import React from 'react'

import store from '../../store'

import Nav from './Nav'
import SideBar from './SideBar'

import Breadcrumbs from './Breadcrumbs'
import Notification from './Notification'

const Dashboard = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentWillMount() {
    if (!localStorage.authtoken) {
      store.settings.history.push('/')
    }
  },
  componentDidMount() {
    store.session.on('change', this.updateState)
  },
  componentWillUnmount() {
    store.session.off('change', this.updateState)
  },
  updateState() {
    this.setState({fetched: true})
  },
  render() {
    if (!store.session.get('stripe').subscriptions) {
      return null
    }

    let plan = this.props.params.plan
    if (!plan && !store.session.get('stripe').canceled_at && store.session.get('stripe').canceled_at !== null) {
      plan = store.session.get('stripe').subscriptions.data[0].plan.id
      plan = plan.slice(0, plan.indexOf('-'))
    }

    if (!plan && store.session.get('stripe').canceled_at) {
      plan = 'basic'
    }

    let notification;
    if (store.session.get('notification')) {
      notification = <Notification text={store.session.get('notification').text} type={store.session.get('notification').type}/>
    }

    return (
      <div className="dashboard">
        <Nav/>
        <div className="container">
          <SideBar plan={plan} location={this.props.location.pathname}/>
          <div className="db-content">
            {notification}
            <Breadcrumbs location={this.props.location.pathname} plan={plan}/>
            {React.cloneElement(this.props.children, {plan: plan, location: this.props.location.pathname})}
          </div>
        </div>
      </div>
    )
  }
})

export default Dashboard
