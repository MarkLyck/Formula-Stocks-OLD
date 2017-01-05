import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import store from '../../store'

const ScrollLink = Scroll.Link
const scroll = Scroll.animateScroll

class NavBar extends React.Component {
  constructor() {
    super()
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderMenu = this.renderMenu.bind(this)

    this.state = { navbar: 1, showMenu: false }
  }

  componentDidMount() {
      $(window).scroll(() => {
        if ($(window).scrollTop() < 560) {
          if (this.state.navbar !== 1) {
            this.setState({ navbar: 1 })
          }
        } else {
          if (this.state.navbar !== 2) {
            this.setState({ navbar: 2 })
          }
        }
      })
  }

  renderUserLinks() {
    if (!localStorage.authtoken && this.state.navbar === 1) {
      return (
        <div id="nav-links">
          <Link to="/login" id="login-btn" className="nav-link">Login</Link>
          <Link to="/pro/signup" id="signup-btn" className="nav-link">Get started</Link>
        </div>)
    } else if (!localStorage.authtoken) {
      return <Link to="/pro/signup" id="signup-btn" className="nav-link">Get started</Link>
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
    if (this.state.navbar === 1) {
      return (
        <nav className="prof-navbar static">
          <div className="left" onClick={() => {scroll.scrollToTop()}}>
            <a><img src="/assets/images/logo_horizontal.svg"/></a>
          </div>
          {this.renderMenu()}
          <div className={menuState}>
            <ScrollLink onClick={this.closeMenu} className="nav-link overview" to="whatIsIt" smooth={true} offset={-40} duration={1000}>Overview</ScrollLink>
            <ScrollLink onClick={this.closeMenu} className="nav-link performance" to="performance" smooth={true} offset={-100} duration={1000}>Performance</ScrollLink>
            <ScrollLink onClick={this.closeMenu} className="nav-link how-it-works" to="howItWorks" smooth={true} offset={-100} duration={1000}>How it works</ScrollLink>
            <ScrollLink onClick={this.closeMenu} className="nav-link pricing" to="pricing" smooth={true} offset={-100} duration={1000}>Pricing</ScrollLink>
            {this.renderUserLinks()}
          </div>
        </nav>
      )
    } else {
      return (
        <nav className="prof-navbar fixed">
          <div className="left" onClick={() => {scroll.scrollToTop()}}>
            <a><img src="/assets/images/logo_horizontal.svg"/></a>
          </div>
          {this.renderMenu()}
          <div className={menuState}>
            <ScrollLink onClick={this.closeMenu} className="nav-link overview" to="whatIsIt" smooth={true} offset={-100} duration={1000}>Overview</ScrollLink>
            <ScrollLink onClick={this.closeMenu} className="nav-link performance" to="performance" smooth={true} offset={-100} duration={1000}>Performance</ScrollLink>
            <ScrollLink onClick={this.closeMenu} className="nav-link how-it-works" to="howItWorks" smooth={true} offset={-100} duration={1000}>How it works</ScrollLink>
            <Link onClick={this.closeMenu} className="nav-link faq-link" to="/faq" >FAQ</Link>
            <ScrollLink onClick={this.closeMenu} className="nav-link pricing" to="pricing" smooth={true} offset={-100} duration={1000}>View pricing</ScrollLink>
            {this.renderUserLinks()}
          </div>
        </nav>
      )
    }
  }
}

export default NavBar
