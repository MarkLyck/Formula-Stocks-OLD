import React from 'react'
import Lockr from 'lockr'
// import io from 'socket.io-client/dist/socket.io.min'

import store from '../../store'

import Nav from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'

import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import Notification from './Components/Notification/Notification'
import './dashboard.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    if (!Lockr.get('stocks')) { Lockr.set('stocks', {}) }

    this.updateState = this.updateState.bind(this)
    this.state = { fetched: false }
  }

  componentWillMount() {
    if (!localStorage.authtoken) {
      store.settings.history.push('/')
    }
  }

  componentDidMount() {
    window.Intercom("shutdown")
    store.session.on('change', this.updateState)

    // let socket = io.connect('http://localhost:8080')
    // socket.on('new_quotes', function(data) {
    //     console.log('Got new quote:', data)
    // })
  }

  componentWillUnmount() {
    store.session.off('change', this.updateState)
  }

  updateState() {
    this.setState({ fetched: true })
  }

  render() {
    if (!store.session.get('stripe').subscriptions) {
      return null
    }

    if (!store.selectedPlan && !this.props.params.plan) {
      let plan = store.session.get('stripe').subscriptions.data[0].plan.id
      plan = plan.slice(0, plan.indexOf('-'))
      store.selectedPlan = plan
    } else if (this.props.params.plan) {
      store.selectedPlan = this.props.params.plan
    }

    let notification;
    if (store.session.get('notification')) {
      notification = <Notification text={store.session.get('notification').text} type={store.session.get('notification').type}/>
    }


    return (
      <div className="dashboard">
        <SideBar plan={store.selectedPlan} location={this.props.location.pathname}/>
        <div className="container">
          <Nav plan={store.selectedPlan} location={this.props.location.pathname}/>
          <div className="db-content">
            {notification}
            <Breadcrumbs location={this.props.location.pathname} plan={store.selectedPlan}/>
            {React.cloneElement(this.props.children, { plan: store.selectedPlan, location: this.props.location.pathname })}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
