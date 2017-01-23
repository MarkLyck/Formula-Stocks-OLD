import React from 'react'
import MainButton from './MainButton'
import store from '../../../../store'
import { Link, browserHistory } from 'react-router'
import './sidebar.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.selectMenu = this.selectMenu.bind(this)

    let selected = 'portfolio'
    if (this.props.location.indexOf('suggestions') > -1) { selected = 'suggestions' }
    else if (this.props.location.indexOf('articles') > -1) { selected = 'articles' }
    else if (this.props.location.indexOf('admin') > -1) { selected = 'admin' }
    else if (this.props.location.indexOf('account') > -1) { selected = 'account' }

    this.state = { selected: selected, plan: this.props.plan }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ plan: newProps.plan })
  }

  selectMenu(selected) {
    browserHistory.push(`/dashboard/${selected}`)
    this.setState({ selected: selected })
  }

  renderSuggestionsMenu() {
    return (
      <ul className="sub-menu">
        <li className="submenu-section">
          <h3>BASIC</h3>
          <Link to="/dashboard/suggestions/basic" className={this.state.plan === 'basic' ? 'selected' : ''}>Suggestions</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>PREMIUM</h3>
          <Link to="/dashboard/suggestions/premium" className={this.state.plan === 'premium' ? 'selected' : ''}>Suggestions</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>BUSINESS</h3>
          <Link to="/dashboard/suggestions/business" className={this.state.plan === 'business' ? 'selected' : ''}>Suggestions</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>FUND</h3>
          <Link to="/dashboard/suggestions/fund" className={this.state.plan === 'fund' ? 'selected' : ''}>Suggestions</Link>
          <div className="submenu-divider"/>
        </li>
      </ul>
    )
  }

  renderPortfolioMenu() {
    return (
      <ul className="sub-menu">
        <li className="submenu-section">
          <h3>BASIC</h3>
          <Link to="/dashboard/portfolio/basic" className={(this.state.plan === 'basic' && this.props.location.indexOf('portfolio') > -1) || (this.props.location === '/dashboard' && this.props.plan === 'basic') ? 'selected' : ''}>Portfolio</Link>
          <Link to="/dashboard/trades/basic" className={this.state.plan === 'basic' && this.props.location.indexOf('trades') > -1 ? 'selected' : ''}>Recent trades</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>PREMIUM</h3>
          <Link to="/dashboard/portfolio/premium" className={(this.state.plan === 'premium' && this.props.location.indexOf('portfolio') > -1) || (this.props.location === '/dashboard' && this.props.plan === 'premium') ? 'selected' : ''}>Portfolio</Link>
          <Link to="/dashboard/trades/premium" className={this.state.plan === 'premium' && this.props.location.indexOf('trades') > -1 ? 'selected' : ''}>Recent trades</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>BUSINESS</h3>
          <Link to="/dashboard/portfolio/business" className={(this.state.plan === 'business' && this.props.location.indexOf('portfolio') > -1) || (this.props.location === '/dashboard' && this.props.plan === 'business') ? 'selected' : ''}>Portfolio</Link>
          <Link to="/dashboard/trades/business" className={this.state.plan === 'business' && this.props.location.indexOf('trades') > -1 ? 'selected' : ''}>Recent trades</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>FUND</h3>
          <Link to="/dashboard/portfolio/fund" className={(this.state.plan === 'fund' && this.props.location.indexOf('portfolio') > -1) || (this.props.location === '/dashboard' && this.props.plan === 'fund') ? 'selected' : ''}>Portfolio</Link>
          <Link to="/dashboard/trades/fund" className={this.state.plan === 'fund' && this.props.location.indexOf('trades') > -1 ? 'selected' : ''}>Recent trades</Link>
        </li>
      </ul>
    )
  }

  renderAdminMenu() {
    return (
      <ul className="sub-menu">
        <li className="submenu-section">
          <h3>PANEL</h3>
          <Link to="/dashboard/admin" className={this.props.location === '/dashboard/admin' ? 'selected' : ''}>Panel</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>USERS</h3>
          <Link to="/dashboard/admin/users" className={this.props.location.indexOf('users') > -1 ? 'selected' : ''}>Users</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>API</h3>
          <Link to="/dashboard/admin/api" className={this.props.location.indexOf('api') > -1 ? 'selected' : ''}>JSON</Link>
          <div className="submenu-divider"/>
        </li>
        <li className="submenu-section">
          <h3>Articles</h3>
          <Link to="/dashboard/admin/newarticle" className={this.props.location.indexOf('newarticle') > -1 ? 'selected' : ''}>New Article</Link>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <aside className="dashboard-sidebar">
        <ul className="main-menu">
          <MainButton selected={this.state.selected === 'suggestions'} title="Suggestions" select={this.selectMenu} icon="icon-flask"/>
          <MainButton selected={this.state.selected === 'portfolio'} title="Portfolio" select={this.selectMenu} icon="icon-chart"/>
          {store.session.get('type') === 5 ? <MainButton selected={this.state.selected === 'articles'} title="Articles" select={this.selectMenu} icon="icon-articles"/> : ''}
          {store.session.get('type') === 5 ? <MainButton selected={this.state.selected === 'admin'} title="Admin" select={this.selectMenu} icon="icon-dashboard"/> : ''}
          <MainButton selected={this.state.selected === 'account'} title="Account" select={this.selectMenu} icon="icon-account"/>
          <MainButton title="Log out" icon="icon-logout"/>
          <MainButton title="Support" icon="icon-support"/>
        </ul>
        {this.state.selected === 'suggestions' ? this.renderSuggestionsMenu() : ''}
        {this.state.selected === 'portfolio' ? this.renderPortfolioMenu() : ''}
        {this.state.selected === 'admin' ? this.renderAdminMenu() : ''}
      </aside>
    )
  }
}

export default SideBar
