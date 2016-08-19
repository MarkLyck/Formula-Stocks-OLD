import React from 'react'
import {Link} from 'react-router'

import store from '../../store'

const Nav  = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentDidMount() {
    store.session.on('change', this.updateState)
  },
  updateState() {
    this.setState({fetched: true})
  },
  componentWillUnmount() {
    store.session.off('change', this.updateState)
  },

  // <div className="right">
  //   <Link to="/dashboard/account" className="user-btn"><i className="fa fa-user" aria-hidden="true"></i>{store.session.get('name')}</Link>
  //   <button onClick={store.session.logout.bind(store.session)}className="logout-btn"><i className="fa fa-power-off" aria-hidden="true"></i></button>
  // </div>
  render() {
    return (
      <nav className="dashboard-nav">
        <Link to="/"><img id="logo" src="assets/images/logo_horizontal.svg"/></Link>
      </nav>
    )
  }
})

export default Nav
