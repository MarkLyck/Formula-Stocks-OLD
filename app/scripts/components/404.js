import React from 'react'
import {Link} from 'react-router'

const NotFoundPage = React.createClass({
  render() {
    return (
      <div className="page-not-found">
        <img src="assets/images/logo_vertical.svg"/>
        <h1>WHOOPS</h1>
        <p>We couldn't find the page you were looking for.</p>
        <Link className="filled-btn" to="/">Back to safety</Link>
      </div>
    )
  }
})

export default NotFoundPage
