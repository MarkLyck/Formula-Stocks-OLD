import React from 'react'

import Nav from './Nav'
import SideBar from './SideBar'

const Dashboard = React.createClass({
  render() {
    return (
      <div className="dashboard">
        <Nav/>
        <div className="container">
          <SideBar/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Dashboard
