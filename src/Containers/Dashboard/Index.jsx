import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNewPlan } from '../../actions/plans'
import { fetchSession } from '../../actions/session'
import Lockr from 'lockr'

import store from '../../store'

import Nav from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'

import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import Notification from './Components/Notification/Notification'
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    if (!Lockr.get('stocks')) { Lockr.set('stocks', {}) }

    // this.updateState = this.updateState.bind(this)
    this.state = { fetched: false }
  }

  componentWillMount() {
    if (!localStorage.authtoken) {
      browserHistory.push('/')
    }
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchSession()
    window.Intercom("shutdown")
    // store.session.on('change', this.updateState)
  }

  // componentWillUnmount() {
  //   store.session.off('change', this.updateState)
  // }

  // updateState() {
  //   this.setState({ fetched: true })
  // }

  render() {
    let { selectedPlan, session, actions } = this.props
    if (!session.stripe) { return null }

    if (!this.props.params.plan) {
      let plan = session.stripe.subscriptions.data[0].plan.id
      plan = plan.slice(0, plan.indexOf('-'))
      actions.selectNewPlan = plan
    } else if (this.props.params.plan) {
      actions.selectNewPlan = this.props.params.plan
    }

    let notification;
    if (store.session.get('notification')) {
      notification = <Notification text={store.session.get('notification').text} type={store.session.get('notification').type}/>
    }


    return (
      <div className="dashboard">
        <SideBar plan={selectedPlan} location={this.props.location.pathname}/>
        <div className="container">
          <Nav plan={selectedPlan} location={this.props.location.pathname}/>
          <div className="db-content">
            {notification}
            <Breadcrumbs location={this.props.location.pathname} plan={selectedPlan}/>
            {React.cloneElement(this.props.children, { plan: selectedPlan, location: this.props.location.pathname })}
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  selectedPlan: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { plans, session } = state
  const { selectedPlan } = plans

  return {
    selectedPlan,
    session
  }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchSession, selectNewPlan }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
