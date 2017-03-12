import React from 'react'
import Scroll from 'react-scroll'
import { Link } from 'react-router'
import './firstMonthOnUs.css'

class FirstMonthOnUs extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="first-month-on-us section">
        <Element name="pricing"/>
        <h2 className="title">First month is on us</h2>
        <div className="divider"/>
        <p>
          If you decide Formula Stocks isn't for you - simply cancel online at any time without obligations.
        </p>
        <h2 className="cost">$50 monthly after 30 days</h2>
        <Link to="/signup" className="signup-cta">Join free for a month</Link>
      </section>
    )
  }
}

export default FirstMonthOnUs
