import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import store from '../../store'

let ScrollLink = Scroll.Link
let scroll = Scroll.animateScroll

class NavBar extends React.Component {
  constructor() {
    super()
    this.state = { navbar: 1 }
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
          <Link to="/signup" id="signup-btn" className="nav-link">Get started</Link>
        </div>)
    } else if (!localStorage.authtoken) {
      return <Link to="/signup" id="signup-btn" className="nav-link">Get started</Link>
    } else {
      return (
        <div id="nav-links">
          <Link to="/dashboard" id="dashboard-link" className="nav-link">Dashboard</Link>
          <a href="#" id="logout-btn" onClick={store.session.logout.bind(store.session)} className="nav-link">Logout</a>
        </div>)
    }
  }

  render() {
    if (this.state.navbar === 1) {
      return (
        <nav className="prof-navbar static">
          <div className="left" onClick={() => {scroll.scrollToTop()}}>
            <a><img src="assets/images/logo_horizontal.svg"/></a>
          </div>
          <div className="right">
            <ScrollLink className="nav-link overview" to="ourProducts" smooth={true} offset={-100} duration={1000}>Overview</ScrollLink>
            <ScrollLink className="nav-link performance" to="pricing" smooth={true} offset={-100} duration={1000}>Performance</ScrollLink>
            <ScrollLink className="nav-link how-it-works" to="contactUs" smooth={true} offset={-100} duration={1000}>How it works</ScrollLink>
            <ScrollLink className="nav-link pricing" to="pricing" smooth={true} offset={-100} duration={1000}>Pricing</ScrollLink>
            {this.renderUserLinks()}
          </div>
        </nav>
      )
    } else {
      return (
        <nav className="prof-navbar fixed">
          <div className="left" onClick={() => {scroll.scrollToTop()}}>
            <a><img src="assets/images/logo_horizontal.svg"/></a>
          </div>
          <div className="right">
            <ScrollLink className="nav-link overview" to="ourProducts" smooth={true} offset={-100} duration={1000}>Overview</ScrollLink>
            <ScrollLink className="nav-link performance" to="pricing" smooth={true} offset={-100} duration={1000}>Performance</ScrollLink>
            <ScrollLink className="nav-link how-it-works" to="contactUs" smooth={true} offset={-100} duration={1000}>How it works</ScrollLink>
            <Link className="nav-link faq-link" to="/faq" >FAQ</Link>
            <ScrollLink className="nav-link pricing" to="pricing" smooth={true} offset={-100} duration={1000}>View pricing</ScrollLink>
            {this.renderUserLinks()}
          </div>
        </nav>
      )
    }
  }
}

export default NavBar
