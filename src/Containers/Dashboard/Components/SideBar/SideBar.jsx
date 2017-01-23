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

    this.state = { selected: selected, plan: store.selectedPlan }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ plan: newProps.plan })
  }

  selectMenu(selected) {
    if (selected === 'suggestions' || selected === 'portfolio') {
      browserHistory.push(`/dashboard/${selected}/${store.selectedPlan}`)
    } else if(selected === 'portfolio trades') {
      browserHistory.push(`/dashboard/trades/${store.selectedPlan}`)
    } else {
      browserHistory.push(`/dashboard/${selected}`)
    }
    this.setState({ selected: selected })
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
          <MainButton selected={this.state.selected === 'portfolio trades'} title="Portfolio trades" select={this.selectMenu} icon="icon-trades"/>
          {store.session.get('type') === 5 ? <MainButton selected={this.state.selected === 'articles'} title="Articles" select={this.selectMenu} icon="icon-articles"/> : ''}
          {store.session.get('type') === 5 ? <MainButton selected={this.state.selected === 'admin'} title="Admin" select={this.selectMenu} icon="icon-dashboard"/> : ''}
          <MainButton selected={this.state.selected === 'account'} title="Account" select={this.selectMenu} icon="icon-account"/>
          <MainButton title="Log out" icon="icon-logout"/>
          <MainButton title="Support" icon="icon-support"/>
        </ul>
        {/* {this.state.selected === 'suggestions' ? this.renderSuggestionsMenu() : ''}
        {this.state.selected === 'portfolio' ? this.renderPortfolioMenu() : ''} */}
        {this.state.selected === 'admin' ? this.renderAdminMenu() : ''}
      </aside>
    )
  }
}

export default SideBar
