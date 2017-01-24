import React from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../../../store'
import Logo from './logo_horizontal.svg'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <nav className="dashboard-nav">
        <div className="left">
          <button onClick={this.selectPlan.bind(this, 'basic')} className={`plan ${this.state.selected === 'basic' ? 'selected' : ''}`}>Basic</button>
          <button onClick={this.selectPlan.bind(this, 'premium')} className={`plan ${this.state.selected === 'premium' ? 'selected' : ''}`}>Premium</button>
          <button onClick={this.selectPlan.bind(this, 'business')} className={`plan ${this.state.selected === 'business' ? 'selected' : ''}`}>Business</button>
          <button onClick={this.selectPlan.bind(this, 'fund')} className={`plan ${this.state.selected === 'fund' ? 'selected' : ''}`}>Fund</button>
        </div>
        <div className="right">
          <Link to="/"><img id="logo" src={Logo} alt="logo"/></Link>
        </div>
      </nav>
    )
  }
}

export default NavBar
