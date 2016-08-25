import React from 'react'
import ProfileCard from './ProfileCard'

const AboutUs = React.createClass({
  getInitialState() {
    return {selectedEmployee: 'Thomas'}
  },
  selectEmployee(name) {
    this.setState({selectedEmployee: name})
  },

  // <div className="card-wrapper">
  //   <ProfileCard name="Thomas Lyck" title="CEO" imgName="Thomas"/>
  //   <ProfileCard name="Mark Lyck" title="COO" imgName="Mark"/>
  //   <ProfileCard name="Marie Lauritzen" title="PhD. Research Assistant" imgName="Marie"/>
  // </div>
  render() {

    let classThomas, classMark, classMarie, bio;
    if (this.state.selectedEmployee === 'Thomas') {
      classThomas = 'selected'
      bio = `Thomas Lyck is the founder of 8 businesses between 1990 until today.
      Some of the more well known include the system which created all building instruction booklets
      for LEGO products for over a decade, and many pioneering Computer Graphics solutions for the
      movie industry in the early 1990s. Besides being CEO and an accomplished investor,
      Thomas is a specialist in parallel supercomputing, complex data, and artificial intelligence,
      and has recently spent a decade developing the advanced technology behind Formula Stocks.`
    } else if (this.state.selectedEmployee === 'Mark') {
      classMark = 'selected'
      bio = <p>It is possible to beat the market. Our portfolio service is the product of a decade's worth
       of advanced equity research. We know how to gain an edge over the market, and we want to share
       our results with you.<br/><br/>
       Mark Lyck is an entrepreneur that has brought his experience and edge to Formula Stocks through
       collaboration with Thomas. With a background in Business Administration and
       web-based user interface design, he makes complex technology easily accessible for everyone,
       in a user-friendly manner.</p>
    } else if (this.state.selectedEmployee === 'Marie') {
      classMarie = 'selected'
      bio = `Marie works with documentation, localization, and assists with research and quality control.
      A Ph.D., graduate of Royal Holloway, London, and Aarhus University, Aarhus,
      Marie's focus areas has been post-modern literature, research, as well as complexity theory.
      She is a language expert, and outstanding in terms of ensuring that the highest possible
      standards are always methodically applied.`
    }

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
          <div className="employees">
            <div className="top-section">
              <div className="left" style={{backgroundImage: `url("assets/images/profiles/${this.state.selectedEmployee}.jpg")`}}>
              </div>
              <div className="right">
                <p>
                  {bio}
                </p>
              </div>
            </div>
            <div className="button-wrapper">
              <button className={classThomas} onClick={this.selectEmployee.bind(null, 'Thomas')}>
                <h3>Thomas Lyck</h3>
                <p>CEO</p>
              </button>
              <button className={classMark} onClick={this.selectEmployee.bind(null, 'Mark')}>
                <h3>Mark Lyck</h3>
                <p>COO</p>
              </button>
              <button className={classMarie} onClick={this.selectEmployee.bind(null, 'Marie')}>
                <h3>Marie Lauritzen</h3>
                <p>PhD. Research Assistant</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

export default AboutUs
