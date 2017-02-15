import React from 'react'
import { Link } from 'react-router'
import './firstMonthOnUs.css'

class FirstMonthOnUs extends React.Component {
  render() {
    return (
      <section className="first-month-on-us section">
        <h2 className="title">The first month is on us</h2>
        <div className="divider"/>
        <p>Higher probability investment opportunities for the long run. Sign up to better your returns and moderate your risk.</p>
        <h1 className="cost">$50 monthly after 30 days</h1>
        <Link to="/signup" className="signup-cta">Start your free month</Link>
        <p className="center">You can cancel at any time</p>
      </section>
    )
  }
}

export default FirstMonthOnUs
