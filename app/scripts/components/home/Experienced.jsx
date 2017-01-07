import React from 'react'
import {Link} from 'react-router'

class Experienced extends React.Component {
  render() {
    return (
      <section className="experienced section">
        <h2>Are you an intermediate to  investor? <Link to="/pro">Click here</Link> for an in-depth explanation.</h2>
      </section>
    )
  }
}

export default Experienced
