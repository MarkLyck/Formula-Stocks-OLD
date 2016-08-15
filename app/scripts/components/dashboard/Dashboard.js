import React from 'react'

import Nav from './Nav'

const Dashboard = React.createClass({
  render() {
    return (
      <div className="dashboard">
        <Nav/>
        {this.props.children}
      </div>
    )
  }
})

export default Dashboard
