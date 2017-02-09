import React from 'react'
import { Link } from 'react-router'
import './firstMonthOnUs.css'

class FirstMonthOnUs extends React.Component {
  render() {
    return (
      <section className="first-month-on-us section">
        <h2 className="title">The first month is on us</h2>
        <div className="divider"/>
        <p>
          We're confident that you'll enjoy our service. Sign up for our 30 day risk free trial. A credit card
          is required, but you will only be charged if you stay past 30 days. After 30 days, the price is
          $50 per month.
        </p>
        <Link to="/signup" className="signup-cta">Start your free month</Link>
        <p class="center">You can cancel at any time</p>
      </section>
    )
  }
}

export default FirstMonthOnUs
