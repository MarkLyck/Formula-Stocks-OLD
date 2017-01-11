import React from 'react'
import { Link } from 'react-router'
import Logo from './logo_horizontal.svg'
import './navbar.css'

const NavBar = () => (
  <nav className="dashboard-nav">
    <Link to="/"><img id="logo" src={Logo} alt="logo"/></Link>
  </nav>
)

export default NavBar
