import React from 'react'
import {Link} from 'react-router'

const SideBar = React.createClass({
  getInitialState() {
    return {dropdown: 'suggestions'}
  },
  toggleDropdown(dropdown) {
    this.setState({dropdown: dropdown})
  },
  render() {
    let suggestionsClass = 'Suggestions side-bar-link'
    let portfoliosClass = 'Suggestions side-bar-link'
    let suggestionsDropdown;
    let portfoliosDropdown;

    if (this.state.dropdown === 'suggestions') {
      suggestionsClass = 'Suggestions side-bar-link selected'
      suggestionsDropdown = (
        <div className="dropdown">
          <Link to="/dashboard/suggestions/basic">Basic</Link>
          <Link to="/dashboard/suggestions/premium">Premium</Link>
          <Link to="/dashboard/suggestions/business">Business</Link>
          <Link to="/dashboard/suggestions/fund">Fund</Link>
        </div>
      )
    } else if (this.state.dropdown === 'portfolios') {
      portfoliosClass = 'portfolios side-bar-link selected'
      portfoliosDropdown = (
        <div className="dropdown">
          <Link to="/dashboard/portfolio/basic">Basic</Link>
          <Link to="/dashboard/portfolio/premium">Premium</Link>
          <Link to="/dashboard/portfolio/business">Business</Link>
          <Link to="/dashboard/portfolio/fund">Fund</Link>
        </div>
      )
    }

    return (
      <aside className="side-bar">
        <ul className="side-bar-links">

          <li className={suggestionsClass} onClick={this.toggleDropdown.bind(null, 'suggestions')}>
            <button><h3><i className="fa fa-flask" aria-hidden="true"></i>Suggestions</h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {suggestionsDropdown}
          </li>

          <li className={portfoliosClass} onClick={this.toggleDropdown.bind(null, 'portfolios')}>
            <button><h3><i className="fa fa-line-chart" aria-hidden="true"></i>Portfolios</h3> <i className="fa fa-angle-down" aria-hidden="true"></i></button>
            {portfoliosDropdown}
          </li>

          <li className="my-account side-bar-link">
            <button><h3><i className="fa fa-user" aria-hidden="true"></i>My Account</h3></button>
          </li>
          <li className="my-account side-bar-link logout">
            <button><h3><i className="fa fa-power-off" aria-hidden="true"></i>Log out</h3></button>
          </li>

        </ul>
      </aside>
    )
  }
})

export default SideBar
