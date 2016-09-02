import React from 'react'
import _ from 'underscore'
import $ from 'jquery'
import {Link} from 'react-router'

import store from '../../store'

const SideBar = React.createClass({
  getInitialState() {
    let selected;
    let dropDown = false;
    if (this.props.location.indexOf('suggestions') !== -1) {
      selected = 'suggestions'
      if ($(window).width() > 800) {
        dropDown = true
      }
    } else if (this.props.location.indexOf('portfolio') !== -1 || this.props.location === '/dashboard') {
      selected = 'portfolio'
      if ($(window).width() > 800) {
        dropDown = true
      }
    } else if (this.props.location.indexOf('account') !== -1) {
      selected = 'account'
    } else if (this.props.location.indexOf('admin') !== -1) {
      selected = 'admin'
      if ($(window).width() > 800) {
        dropDown = true
      }
    }
    return {plan: this.props.plan, selected: selected, dropDown: dropDown}
  },
  toggleDropdown(dropdown, e) {
    if (_.toArray(e.target.classList).indexOf('dropdown-link') === -1) {
      if (!this.state.dropDown || dropdown !== this.state.selected) {
        this.setState({selected: dropdown, plan: this.props.plan, dropDown: true})
      } else if ($(window).width() < 800) {
        this.setState({dropDown: false})
      } else {
        this.setState({selected: dropdown, plan: this.props.plan, dropDown: true})
      }
    }
  },
  componentWillReceiveProps(props) {
    this.setState({plan: props.plan})
  },
  gotoPath(path) {
    if ($(window).width() < 800) {
      this.setState({dropDown: false})
    }
    store.settings.history.push(path)
  },
  gotoAccount() {
    this.setState({selected: 'account', plan: ''})
    store.settings.history.push('/dashboard/account')
  },
  gotoAdmin() {
    this.setState({selected: 'admin', plan: ''})
    store.settings.history.push('/dashboard/admin')
  },
  gotoArticles() {
    this.setState({selected: 'articles', plan: ''})
    store.settings.history.push('/dashboard/articles')
  },
  logout() {
    store.session.logout()
  },
  render() {
    let suggestionsClass = 'suggestions side-bar-link'
    let portfoliosClass = 'portfolios side-bar-link'
    let myAccountClass = 'myaccount side-bar-link'
    let adminClass = 'admin side-bar-link'
    let articlesClass = 'articles side-bar-link'
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

      if (this.state.dropDown) {
        suggestionsDropdown = (
          <div className="dropdown plan-dd">
            <a className={'dropdown-link ' + SbasicClass} onClick={this.gotoPath.bind(null, '/dashboard/suggestions/basic')}>Basic suggestions</a>
            <a className={'dropdown-link ' + SpremiumClass} onClick={this.gotoPath.bind(null, '/dashboard/suggestions/premium')}>Premium suggestions</a>
            <a className={'dropdown-link ' + SbusinessClass} onClick={this.gotoPath.bind(null, '/dashboard/suggestions/business')}>Business suggestions</a>
            <a className={'dropdown-link ' + SfundClass} onClick={this.gotoPath.bind(null, '/dashboard/suggestions/fund')}>Fund suggestions</a>
          </div>
        )
      }
    } else if (this.state.selected === 'portfolio') {
      if (this.props.location.indexOf('portfolio') !== -1 || this.props.location === '/dashboard') {
        if(this.state.plan === 'basic') {PbasicClass = 'selected'}
        else if(this.state.plan === 'premium') {PpremiumClass = 'selected'}
        else if(this.state.plan === 'business') {PbusinessClass = 'selected'}
        else if(this.state.plan === 'fund') {PfundClass = 'selected'}
      }

      portfoliosClass = 'portfolios side-bar-link selected'
      if (this.state.dropDown) {
        portfoliosDropdown = (
          <div className="dropdown plan-dd">
            <a className={'dropdown-link ' + PbasicClass} onClick={this.gotoPath.bind(null, '/dashboard/portfolio/basic')}>Basic portfolio</a>
            <a className={'dropdown-link ' + PpremiumClass} onClick={this.gotoPath.bind(null, '/dashboard/portfolio/premium')}>Premium portfolio</a>
            <a className={'dropdown-link ' + PbusinessClass} onClick={this.gotoPath.bind(null, '/dashboard/portfolio/business')}>Business portfolio</a>
            <a className={'dropdown-link ' + PfundClass} onClick={this.gotoPath.bind(null, '/dashboard/portfolio/fund')}>Fund portfolio</a>
          </div>
        )
      }
    } else if (this.state.selected === 'account') {
      myAccountClass = 'myaccount side-bar-link selected'
    }
    else if (this.state.selected === 'articles'|| this.props.location.indexOf('articles') > -1) {
     articlesClass = 'articles side-bar-link selected'
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

        if (this.state.dropDown) {
          adminDropdown = (
            <div className="dropdown admin-dd">
              <a className={'dropdown-link ' + adminPanelClass} onClick={this.gotoPath.bind(null, '/dashboard/admin')}>Panel</a>
              <a className={'dropdown-link ' + adminAPIClass}  onClick={this.gotoPath.bind(null, '/dashboard/admin/api')}>JSON</a>
              <a className={'dropdown-link ' + newArticleClass}  onClick={this.gotoPath.bind(null, '/dashboard/admin/newarticle')}>New Article</a>
            </div>
          )
        }
      }

      admin = (
        <li className={adminClass} onClick={this.toggleDropdown.bind(null, 'admin')}>
          <button className="admin-btn"><h3><i className="fa fa-tachometer" aria-hidden="true"></i></h3><i className="fa fa-angle-down" aria-hidden="true"></i></button>
          {adminDropdown}
        </li>
      )
    }

    return (
      <aside className="side-bar">
        <ul className="side-bar-links">

          <li className={suggestionsClass} onClick={this.toggleDropdown.bind(null, 'suggestions')}>
            <button className="suggestions-btn"><h3><i className="fa fa-flask" aria-hidden="true"></i></h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {suggestionsDropdown}
          </li>

          <li className={portfoliosClass} onClick={this.toggleDropdown.bind(null, 'portfolio')}>
            <button className="portfolios-btn"><h3><i className="fa fa-line-chart" aria-hidden="true"></i></h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {portfoliosDropdown}
          </li>

          <li className={articlesClass}>
            <button className="articles-btn" onClick={this.gotoArticles}><h3><i className="fa fa-newspaper-o" aria-hidden="true"></i></h3></button>
          </li>

          <li className={myAccountClass}>
            <button className="my-account-btn" onClick={this.gotoAccount}><h3><i className="fa fa-user" aria-hidden="true"></i></h3></button>
          </li>

          {admin}

          <li className="my-account side-bar-link logout">
            <button className="logout-btn" onClick={this.logout}><h3><i className="fa fa-power-off" aria-hidden="true"></i></h3></button>
          </li>

        </ul>
      </aside>
    )
  }
})

export default SideBar
