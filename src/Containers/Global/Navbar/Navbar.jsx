import React from 'react'
import $ from 'jquery'
import { Link, browserHistory } from 'react-router'
import Scroll from 'react-scroll'
import store from '../../../store'
import './navbar.css'
import Logo from './logo_horizontal.svg'

const ScrollLink = Scroll.Link
const scroll = Scroll.animateScroll

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    this.renderUserLinks = this.renderUserLinks.bind(this)
    this.gotoSignup = this.gotoSignup.bind(this)
    this.checkScroll = this.checkScroll.bind(this)

    this.state = { navbar: 'static', showMenu: false }
  }

  componentDidMount() {
    $(window).on('scroll', this.checkScroll)
  }

  checkScroll() {
    if ($(window).scrollTop() < 560) {
      if (this.state.navbar !== 'static') {
        this.setState({ navbar: 'static' })
      }
    } else {
      if (this.state.navbar !== 'fixed') {
        this.setState({ navbar: 'fixed' })
      }
    }
  }

  componentWillUnmount() {
    $(window).off('scroll', this.checkScroll)
  }

  gotoSignup() {
    let prefix = this.props.path === '/pro' ? '/pro' : ''
    if (this.props.path === '/pro') { localStorage.selectedPlan = 'premium' }
    else { localStorage.selectedPlan = 'basic' }
    browserHistory.push(`${prefix}/signup`)
  }

  renderUserLinks() {
    let prefix = this.props.path === '/pro' ? '/pro' : ''
    let signupText = this.props.path !== '/pro' ? 'Sign up' : 'Get started'


    if (!localStorage.authtoken && this.state.navbar === 1) {
      return (
        <div id="nav-links">
          <Link to={`${prefix}/login`} id="login-btn" className="nav-link">Login</Link>
          <a onClick={this.gotoSignup} id="signup-btn" className="nav-link">{signupText}</a>
        </div>)
    } else if (!localStorage.authtoken) {
      return (
        <div id="nav-links">
          <Link to={`${prefix}/login`} id="login-btn" className="nav-link">Login</Link>
          <a onClick={this.gotoSignup} id="signup-btn" className="nav-link">{signupText}</a>
        </div>)
    } else {
      return (
        <div id="nav-links">
          <Link to="/dashboard" id="dashboard-link" className="nav-link">Dashboard</Link>
          <a href="#" id="logout-btn" onClick={store.session.logout.bind(store.session)} className="nav-link">Logout</a>
        </div>)
    }
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu })
  }
  closeMenu() {
    this.setState({ showMenu: false })
  }

  renderMenu() {
    if (this.state.showMenu) {
      return <button className="menu-btn" onClick={this.toggleMenu}><i className="fa fa-times" aria-hidden="true"></i></button>
    } else {
      return <button className="menu-btn" onClick={this.toggleMenu}><i className="fa fa-bars" aria-hidden="true"></i></button>
    }
  }

  render() {
    let menuState = this.state.showMenu ? 'right open' : 'right closed'
    let navbarClass = 'new-navbar ' + this.state.navbar
    let faqLink = this.state.navbar === 'fixed' ? <Link onClick={this.closeMenu} className="nav-link faq-link" to="/faq" >FAQ</Link> : ''
    return (
      <nav className={navbarClass}>
        <div className="left" onClick={() => {scroll.scrollToTop()}}>
          <a><img src={Logo} alt="logo" /></a>
        </div>
        {this.renderMenu()}
        <div className={menuState}>
          <ScrollLink onClick={this.closeMenu} className="nav-link overview" to="whatIsIt" smooth={true} offset={-40} duration={1000}>Overview</ScrollLink>
          <ScrollLink onClick={this.closeMenu} className="nav-link performance" to="performance" smooth={true} offset={-100} duration={1000}>Performance</ScrollLink>
          <ScrollLink onClick={this.closeMenu} className="nav-link how-it-works" to="howItWorks" smooth={true} offset={-100} duration={1000}>How it works</ScrollLink>
          {faqLink}
          <ScrollLink onClick={this.closeMenu} className="nav-link pricing" to="pricing" smooth={true} offset={-100} duration={1000}>Pricing</ScrollLink>
          {this.renderUserLinks()}
        </div>
      </nav>
    )
  }
}

export default NavBar
