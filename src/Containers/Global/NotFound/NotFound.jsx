import React from 'react'
import { Link } from 'react-router'
import logo from './logo_vertical.svg'
import './notFound.css'

const NotFound = () => (
  <div className="page-not-found">
    <img src={logo} alt="logo"/>
    <h1>WHOOPS</h1>
    <p>We couldn't find the page you were looking for.</p>
    <Link className="filled-btn" to="/">Back to safety</Link>
  </div>
)

export default NotFound
