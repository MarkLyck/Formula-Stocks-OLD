import React from 'react'
// import moment from 'moment'
import MainButton from './MainButton'
import { browserHistory } from 'react-router'
import './sidebar.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.selectMenu = this.selectMenu.bind(this)

    let selected = 'portfolio'
    if (this.props.location.indexOf('suggestions') > -1) { selected = 'suggestions' }
    else if (this.props.location.indexOf('trades') > -1) { selected = 'portfolio trades' }
    else if (this.props.location.indexOf('articles') > -1) { selected = 'articles' }
    else if (this.props.location.indexOf('admin') > -1) { selected = 'admin' }
    else if (this.props.location.indexOf('account') > -1) { selected = 'account' }

    this.state = { selected: selected }
  }

  selectMenu(selected) {
    if (selected === 'suggestions' || selected === 'portfolio') {
      browserHistory.push(`/dashboard/${selected}/${this.props.selectedPlan}`)
    } else if(selected === 'portfolio trades') {
      browserHistory.push(`/dashboard/trades/${this.props.selectedPlan}`)
    } else {
      browserHistory.push(`/dashboard/${selected}`)
    }
    this.setState({ selected: selected })
  }

  render() {
    let newSuggestions = 0
    // if (moment(store.plans.get(this.state.plan).toJSON().lastUpdated).unix() > moment(store.session.toJSON().lastSeenSuggestions).unix()) {
      // TEST THIS BEFORE REALEASING
      // newSuggestions = store.plans.get(this.state.plan).get('suggestions').filter(sugg => !sugg.model || sugg.action === "SELL").length
    // }
    return (
      <aside className="dashboard-sidebar">
        <ul className="main-menu">
          <MainButton selected={this.state.selected === 'suggestions'} title="Suggestions" select={this.selectMenu} icon="icon-flask" notification={newSuggestions}/>
          <MainButton selected={this.state.selected === 'portfolio'} title="Portfolio" select={this.selectMenu} icon="icon-chart"/>
          <MainButton selected={this.state.selected === 'portfolio trades'} title="Portfolio trades" select={this.selectMenu} icon="icon-trades"/>
          <MainButton selected={this.state.selected === 'articles'} title="Articles" select={this.selectMenu} icon="icon-articles"/>
          {this.props.userType === 5 ? <MainButton selected={this.state.selected === 'admin'} title="Admin" select={this.selectMenu} icon="icon-dashboard"/> : ''}
          <MainButton selected={this.state.selected === 'account'} title="Account" select={this.selectMenu} icon="icon-account"/>
          <MainButton title="Log out" icon="icon-logout"/>
          <MainButton title="Support" icon="icon-support"/>
        </ul>
      </aside>
    )
  }
}

export default SideBar
