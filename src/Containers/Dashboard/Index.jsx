import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNewPlan } from '../../actions/plans'
import { fetchSession } from '../../actions/session'
import Lockr from 'lockr'

import Nav from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'

import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import Notifications from './Components/Notifications/Notifications'
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    if (!Lockr.get('stocks')) { Lockr.set('stocks', {}) }
  }

  componentWillMount() {
    if (!localStorage.authtoken) { browserHistory.push('/') }
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchSession()
    window.Intercom("shutdown")
  }

  render() {
    let { selectedPlan, session, actions } = this.props
    if (!session.stripe) { return null }

    let planNames = ['entry', 'basic', 'premium', 'busiess', 'fund']

    if (this.props.params.plan !== selectedPlan && planNames.indexOf(this.props.params.plan) > -1) {
      actions.selectNewPlan(this.props.params.plan)
    }

    return (
      <div className="dashboard">
        <SideBar selectedPlan={selectedPlan} userType={session.type} location={this.props.location.pathname}/>
        <div className="container">
          <Nav selectedPlan={selectedPlan} selectNewPlan={actions.selectNewPlan} location={this.props.location.pathname}/>
          <div className="db-content">
            <Notifications/>
            <Breadcrumbs location={this.props.location.pathname}/>
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

  return { selectedPlan, session }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchSession, selectNewPlan }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
