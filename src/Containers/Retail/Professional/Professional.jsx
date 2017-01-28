import React from 'react'
import { Link } from 'react-router'
import './professional.css'

class Experienced extends React.Component {
  render() {
    return (
      <section className="experienced section">
        <h2>Are you an institutional or professional investor? <Link to="/pro">Visit our professional site</Link></h2>
      </section>
    )
  }
}

export default Experienced
