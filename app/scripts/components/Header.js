import React from 'react'
import {Link} from 'react-router'

const Header = React.createClass({
  render: function() {
    return (
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="login">Login</Link>
          <Link to="signup">Signup</Link>
        </nav>
      </header>
    )
  }
})

export default Header
