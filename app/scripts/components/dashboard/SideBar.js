import React from 'react'
import {Link} from 'react-router'

const SideBar = React.createClass({
  getInitialState() {
    return {dropdown: 'suggestions', plan: this.props.plan}
  },
  toggleDropdown(dropdown) {
    this.setState({dropdown: dropdown, plan: this.props.plan})
  },
  componentWillReceiveProps(props) {
    this.setState({plan: props.plan})
  },
  render() {
    console.log(this.props.plan);

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
          <Link className={basicClass} to="/dashboard/suggestions/basic">Basic</Link>
          <Link className={premiumClass} to="/dashboard/suggestions/premium">Premium</Link>
          <Link className={businessClass} to="/dashboard/suggestions/business">Business</Link>
          <Link className={fundClass} to="/dashboard/suggestions/fund">Fund</Link>
        </div>
      )
    } else if (this.state.dropdown === 'portfolios') {
      portfoliosClass = 'portfolios side-bar-link selected'
      portfoliosDropdown = (
        <div className="dropdown">
          <Link className={basicClass}  to="/dashboard/portfolio/basic">Basic</Link>
          <Link className={premiumClass}  to="/dashboard/portfolio/premium">Premium</Link>
          <Link className={businessClass}  to="/dashboard/portfolio/business">Business</Link>
          <Link className={fundClass}  to="/dashboard/portfolio/fund">Fund</Link>
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
