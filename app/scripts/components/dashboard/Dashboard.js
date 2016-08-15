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
          {React.cloneElement(this.props.children, this.props.params)}
        </div>
      </div>
    )
  }
})

export default Dashboard
