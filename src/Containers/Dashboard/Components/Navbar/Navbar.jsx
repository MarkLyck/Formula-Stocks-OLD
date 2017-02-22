import React from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../../../store'
import Logo from './logo_horizontal.svg'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.renderPlanButtons = this.renderPlanButtons.bind(this)
    this.state = { selected: store.selectedPlan }
  }

  selectPlan(plan) {
    store.plans.trigger('plan-change')
    store.selectedPlan = plan
    if (this.props.location.indexOf('portfolio') > -1 || this.props.location === '/dashboard') {
      browserHistory.push(`/dashboard/portfolio/${plan}`)
    } else if (this.props.location.indexOf('suggestions') > -1) {
      browserHistory.push(`/dashboard/suggestions/${plan}`)
    } else if (this.props.location.indexOf('trades') > -1) {
      browserHistory.push(`/dashboard/trades/${plan}`)
    }
    this.setState({ selected: plan })
  }

  renderPlanButtons() {
    if (this.props.location.indexOf('portfolio') === -1
      && this.props.location.indexOf('suggestions') === -1
      && this.props.location.indexOf('trades') === -1
      && this.props.location.indexOf('admin') === -1
      && this.props.location !== '/dashboard'
      && this.props.location !== '/dashboard/') {
        return <div className="left"/>
    } else if (this.props.location.indexOf('admin') > -1) {
      return (<div className="left">
        <button onClick={this.gotoAdminPage.bind(this, '')} className={`plan ${this.props.location === '/dashboard/admin/' || this.props.location === '/dashboard/admin' ? 'selected' : ''}`}>Panel</button>
        <button onClick={this.gotoAdminPage.bind(this, 'users')} className={`plan ${this.props.location.indexOf('users') > -1 ? 'selected' : ''}`}>Users</button>
        <button onClick={this.gotoAdminPage.bind(this, 'api')} className={`plan ${this.props.location.indexOf('api') > -1 ? 'selected' : ''}`}>API</button>
        <button onClick={this.gotoAdminPage.bind(this, 'newarticle')} className={`plan ${this.props.location.indexOf('article') > -1 ? 'selected' : ''}`}>New article</button>
      </div>)
    }
    return (<div className="left">
      <button onClick={this.selectPlan.bind(this, 'basic')} className={`plan ${this.state.selected === 'basic' ? 'selected' : ''}`}>Entry</button>
      <button onClick={this.selectPlan.bind(this, 'premium')} className={`plan ${this.state.selected === 'premium' ? 'selected' : ''}`}>Premium</button>
      <button onClick={this.selectPlan.bind(this, 'business')} className={`plan ${this.state.selected === 'business' ? 'selected' : ''}`}>Business</button>
      <button onClick={this.selectPlan.bind(this, 'fund')} className={`plan ${this.state.selected === 'fund' ? 'selected' : ''}`}>Fund</button>
    </div>)
  }

  gotoAdminPage(page) {
    browserHistory.push(`/dashboard/admin/${page}`)
  }

  render() {
    return (
      <nav className="dashboard-nav">
        {this.renderPlanButtons()}
        <div className="right">
          <Link to="/"><img id="logo" src={Logo} alt="logo"/></Link>
        </div>
      </nav>
    )
  }
}

export default NavBar
