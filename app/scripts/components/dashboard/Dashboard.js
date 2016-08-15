import React from 'react'

import Nav from './Nav'
import SideBar from './SideBar'

const Dashboard = React.createClass({
  render() {
    // console.log(this);
    return (
      <div className="dashboard">
        <Nav/>
        <div className="container">
          <SideBar plan={this.props.params.plan}/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Dashboard
