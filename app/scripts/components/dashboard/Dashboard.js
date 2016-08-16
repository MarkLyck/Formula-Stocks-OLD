import React from 'react'

import Nav from './Nav'
import SideBar from './SideBar'

const Dashboard = React.createClass({
  render() {
    return (
      <div className="dashboard">
        <Nav/>
        <div className="container">
          <SideBar plan={this.props.params.plan} location={this.props.location.pathname}/>
          <div className="content">
            {React.cloneElement(this.props.children, {plan: this.props.params.plan, location: this.props.location.pathname})}
          </div>
        </div>
      </div>
    )
  }
})

export default Dashboard
