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
  componentWillUnmount() {
    store.session.off('change', this.updateState)
  },
  updateState() {
    this.setState({fetched: true})
  },
  render() {
    console.log(store.session.toJSON());
    if (!store.session.get('stripe').subscriptions && !store.session.get('stripe').canceled_at){
      console.log('returning null');
      return null
    }

    let plan = this.props.params.plan
    if (!plan && !store.session.get('stripe').canceled_at) {
      plan = store.session.get('stripe').subscriptions.data[0].plan.id
      plan = plan.slice(0, plan.indexOf('-'))
    }

    if (!plan && store.session.get('stripe').canceled_at) {
      plan = 'basic'
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
