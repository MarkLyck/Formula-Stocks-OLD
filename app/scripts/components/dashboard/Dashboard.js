import React from 'react'

import store from '../../store'

import Nav from './Nav'
import SideBar from './SideBar'

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
  updateState() {
    this.setState({fetched: true})
  },
  render() {
    if (!store.session.get('customer').plan){
      return null
    }

    let plan = this.props.params.plan
    if (!plan) {
      plan = store.session.get('customer').plan
      plan = plan.slice(0, plan.indexOf('-'))
    }
    return (
      <div className="dashboard">
        <Nav/>
        <div className="container">
          <SideBar plan={plan} location={this.props.location.pathname}/>
          <div className="content">
            {React.cloneElement(this.props.children, {plan: plan, location: this.props.location.pathname})}
          </div>
        </div>
      </div>
    )
  }
})

export default Dashboard
