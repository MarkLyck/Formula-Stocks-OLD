import React from 'react'
import {Link} from 'react-router'

import store from '../../store'

const SideBar = React.createClass({
  getInitialState() {
    let selected;
    if (this.props.location.indexOf('suggestions') !== -1) {
      selected = 'suggestions'
    } else if (this.props.location.indexOf('portfolio') !== -1 || this.props.location === '/dashboard') {
      selected = 'portfolio'
    } else if (this.props.location.indexOf('account') !== -1) {
      selected = 'account'
    } else if (this.props.location.indexOf('admin') !== -1) {
      selected = 'admin'
    }

    return {plan: this.props.plan, selected: selected}
  },
  toggleDropdown(dropdown) {
    this.setState({selected: dropdown, plan: this.props.plan})
  },
  componentWillReceiveProps(props) {
    this.setState({plan: props.plan})
  },
  gotoAccount() {
    this.setState({selected: 'account', plan: ''})
    store.settings.history.push('/dashboard/account')
  },
  gotoAdmin() {
    this.setState({selected: 'admin', plan: ''})
    store.settings.history.push('/dashboard/admin')
  },
  logout() {
    store.session.logout()
  },
  render() {
    let suggestionsClass = 'suggestions side-bar-link'
    let portfoliosClass = 'portfolios side-bar-link'
    let myAccountClass = 'myaccount side-bar-link'
    let adminClass = 'admin side-bar-link'
    let suggestionsDropdown, portfoliosDropdown, adminDropdown;

    let SbasicClass, SpremiumClass, SbusinessClass, SfundClass;
    let PbasicClass, PpremiumClass, PbusinessClass, PfundClass;

    if (this.state.selected === 'suggestions') {
      if (this.props.location.indexOf('suggestions') !== -1) {
        if(this.state.plan === 'basic') {SbasicClass = 'selected'}
        else if(this.state.plan === 'premium') {SpremiumClass = 'selected'}
        else if(this.state.plan === 'business') {SbusinessClass = 'selected'}
        else if(this.state.plan === 'fund') {SfundClass = 'selected'}
      }
      suggestionsClass = 'suggestions side-bar-link selected'
      suggestionsDropdown = (
        <div className="dropdown">
          <Link className={SbasicClass} to="/dashboard/suggestions/basic">Basic Suggestions</Link>
          <Link className={SpremiumClass} to="/dashboard/suggestions/premium">Premium Suggestions</Link>
          <Link className={SbusinessClass} to="/dashboard/suggestions/business">Business Suggestions</Link>
          <Link className={SfundClass} to="/dashboard/suggestions/fund">Fund Suggestions</Link>
        </div>
      )
    } else if (this.state.selected === 'portfolio') {
      if (this.props.location.indexOf('portfolio') !== -1 || this.props.location === '/dashboard') {
        if(this.state.plan === 'basic') {PbasicClass = 'selected'}
        else if(this.state.plan === 'premium') {PpremiumClass = 'selected'}
        else if(this.state.plan === 'business') {PbusinessClass = 'selected'}
        else if(this.state.plan === 'fund') {PfundClass = 'selected'}
      }

      portfoliosClass = 'portfolios side-bar-link selected'
      portfoliosDropdown = (
        <div className="dropdown">
          <Link className={PbasicClass}  to="/dashboard/portfolio/basic">Basic Portfolio</Link>
          <Link className={PpremiumClass}  to="/dashboard/portfolio/premium">Premium Portfolio</Link>
          <Link className={PbusinessClass}  to="/dashboard/portfolio/business">Business Portfolio</Link>
          <Link className={PfundClass}  to="/dashboard/portfolio/fund">Fund Portfolio</Link>
        </div>
      )
    } else if (this.state.selected === 'account') {
      myAccountClass = 'myaccount side-bar-link selected'
    }

    let admin;
    if (store.session.get('type') === 5) {
      let adminPanelClass, adminAPIClass, newArticleClass;

      if (this.state.selected === 'admin') {
        adminClass = 'admin side-bar-link selected'

        if (this.props.location.indexOf('admin') !== -1) {
          if (this.props.location.indexOf('api') !== -1) {adminAPIClass = 'selected'}
          else if (this.props.location === '/dashboard/admin') {adminPanelClass = 'selected'}
          else if (this.props.location === '/dashboard/admin/newarticle') {newArticleClass = 'selected'}
        }

        adminDropdown = (
          <div className="dropdown">
            <Link className={adminPanelClass} to="/dashboard/admin">Panel</Link>
            <Link className={adminAPIClass}  to="/dashboard/admin/api">JSON</Link>
            <Link className={newArticleClass}  to="/dashboard/admin/newarticle">New Article</Link>
          </div>
        )
      }

      admin = (
        <li className={adminClass}>
          <button onClick={this.toggleDropdown.bind(null, 'admin')}><h3><i className="fa fa-tachometer" aria-hidden="true"></i>Admin</h3><i className="fa fa-angle-down" aria-hidden="true"></i></button>
          {adminDropdown}
        </li>
      )
    }

    return (
      <aside className="side-bar">
        <ul className="side-bar-links">

          <li className={suggestionsClass} onClick={this.toggleDropdown.bind(null, 'suggestions')}>
            <button><h3><i className="fa fa-flask" aria-hidden="true"></i>Suggestions</h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {suggestionsDropdown}
          </li>

          <li className={portfoliosClass} onClick={this.toggleDropdown.bind(null, 'portfolio')}>
            <button><h3><i className="fa fa-line-chart" aria-hidden="true"></i>Portfolios</h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {portfoliosDropdown}
          </li>

          <li className={myAccountClass}>
            <button onClick={this.gotoAccount}><h3><i className="fa fa-user" aria-hidden="true"></i>My Account</h3></button>
          </li>

          {admin}

          <li className="my-account side-bar-link logout">
            <button onClick={this.logout}><h3><i className="fa fa-power-off" aria-hidden="true"></i>Log out</h3></button>
          </li>

        </ul>
      </aside>
    )
  }
})

export default SideBar
