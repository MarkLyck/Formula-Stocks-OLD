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

  render() {
    return (
      <nav className="dashboard-nav">
        <Link to="/"><img id="logo" src="/assets/images/logo_horizontal.svg"/></Link>
      </nav>
    )
  }
})

export default Nav
