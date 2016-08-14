import React from 'react'
import ProfileCard from './ProfileCard'

const AboutUs = React.createClass({
  render() {
    return (
      <section className="about-us">
        <h2>About Us</h2>
        <div className="divider"></div>

        <div className="content">
          <p className="about-fs">
            Formula Stocks is a research and development company, based out of Denmark. We started R&D operations in 2003. The basic idea was simple: leveraging
            decades of supercomputer experience and investment acumen to create an informational advantage in equity investing. We have specialized in being right far
            more often than we are wrong, using a scientific approach and intelligent technology to analyze businesses and business models and thus accumulating
            knowledge which can be found nowhere else.
          </p>
          <div className="card-wrapper">
            <ProfileCard name="Thomas Lyck" title="CEO" imgName="Thomas"/>
            <ProfileCard name="Mark Lyck" title="COO" imgName="Mark"/>
            <ProfileCard name="Marie Lauritzen" title="PhD. Research Assistant" imgName="Marie"/>
          </div>
        </div>
      </section>
    )
  }
})

export default AboutUs
