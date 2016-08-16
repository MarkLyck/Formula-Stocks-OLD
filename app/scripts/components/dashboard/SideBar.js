import React from 'react'
import {Link} from 'react-router'

const SideBar = React.createClass({
  getInitialState() {
    let dropdown;
    console.log(this.props.location);
    if (this.props.location.indexOf('suggestions') !== -1) {
      dropdown = 'suggestions'
    } else if (this.props.location.indexOf('portfolio') !== -1) {
      dropdown = 'portfolio'
    }
    return {dropdown: dropdown, plan: this.props.plan}
  },
  toggleDropdown(dropdown) {
    this.setState({dropdown: dropdown, plan: this.props.plan})
  },
  componentWillReceiveProps(props) {
    this.setState({plan: props.plan})
  },
  render() {
    // console.log(this.props);

    let suggestionsClass = 'suggestions side-bar-link'
    let portfoliosClass = 'portfolios side-bar-link'
    let suggestionsDropdown, portfoliosDropdown;

    let basicClass, premiumClass, businessClass, fundClass;
    if(this.state.plan === 'basic') {basicClass = 'selected'}
    if(this.state.plan === 'premium') {premiumClass = 'selected'}
    if(this.state.plan === 'business') {businessClass = 'selected'}
    if(this.state.plan === 'fund') {fundClass = 'selected'}

    if (this.state.dropdown === 'suggestions') {
      suggestionsClass = 'Suggestions side-bar-link selected'
      suggestionsDropdown = (
        <div className="dropdown">
          <Link className={basicClass} to="/dashboard/suggestions/basic">Basic Suggestions</Link>
          <Link className={premiumClass} to="/dashboard/suggestions/premium">Premium Suggestions</Link>
          <Link className={businessClass} to="/dashboard/suggestions/business">Business Suggestions</Link>
          <Link className={fundClass} to="/dashboard/suggestions/fund">Fund Suggestions</Link>
        </div>
      )
    } else if (this.state.dropdown === 'portfolio') {
      portfoliosClass = 'portfolios side-bar-link selected'
      portfoliosDropdown = (
        <div className="dropdown">
          <Link className={basicClass}  to="/dashboard/portfolio/basic">Basic Portfolio</Link>
          <Link className={premiumClass}  to="/dashboard/portfolio/premium">Premium Portfolio</Link>
          <Link className={businessClass}  to="/dashboard/portfolio/business">Business Portfolio</Link>
          <Link className={fundClass}  to="/dashboard/portfolio/fund">Fund Portfolio</Link>
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

          <li className={portfoliosClass} onClick={this.toggleDropdown.bind(null, 'portfolio')}>
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
