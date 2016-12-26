import React from 'react'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import store from '../../store'

class NavBar extends React.Component {
  render() {
    let ScrollLink = Scroll.Link
    let scroll = Scroll.animateScroll

    let navLinks = (
      <div id="nav-links">
        <Link to="/login" id="login-btn" className="nav-link"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
        <Link to="/signup" id="signup-btn" className="nav-link"><i className="fa fa-user-plus" aria-hidden="true"></i> Signup</Link>
      </div>
    )

    if (localStorage.authtoken) {
      navLinks = (
        <div id="nav-links">
          <Link to="/dashboard" className="nav-link"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
          <a href="#" id="logout-btn" onClick={store.session.logout.bind(store.session)} className="nav-link"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</a>
        </div>
      )
    }
    return (
      <nav>
        <div className="content">
          <div className="left" onClick={() => {scroll.scrollToTop()}}>
            <div className="logo-container">
              <div id="logo"></div>
              <div id="logo-white"></div>
            </div>
          </div>
          <div className="right">
            <ScrollLink className="nav-link products-link" to="ourProducts" smooth={true} offset={-100} duration={1000}>Membership</ScrollLink>
            <ScrollLink className="nav-link pricing-link" to="pricing" smooth={true} offset={-100} duration={1000}>Pricing</ScrollLink>
            <ScrollLink className="nav-link contact-us-link" to="contactUs" smooth={true} offset={-100} duration={1000}>Contact us</ScrollLink>
            <Link className="nav-link faq-link" to="/faq" >FAQ</Link>
            {navLinks}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
