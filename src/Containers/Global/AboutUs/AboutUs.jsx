import React from 'react'

import Thomas from './photos/Thomas.jpg'
import Mark from './photos/Mark.jpg'
import Marie from './photos/Marie.jpg'

import './aboutUs.css'

const photos = {
  Thomas: Thomas,
  Mark: Mark,
  Marie: Marie
}

const AboutUs = React.createClass({
  getInitialState() {
    return {selectedEmployee: 'Thomas', showModal: false}
  },
  selectEmployee(name) {
    this.setState({selectedEmployee: name})
  },

  showModal(name) {
    this.setState({showModal: name})
  },

  render() {
    let modal
    if (this.state.showModal) {
      let selected = {}
      if (this.state.showModal === 'Thomas') {
        selected = {
          name: "Thomas Lyck",
          position: 'CEO',
          bio: `Thomas Lyck is the founder of eight businesses since 1990.
          Some of the more well-known include the system which created the building instructions for all
          LEGO products for more than a decade, and many pioneering computer graphics solutions for the movie
          industry in the early 1990s facilitating the analog to digital industry transition. Besides being
          CEO and an accomplished investor, Thomas is a specialist in parallel supercomputing, complex data,
          and artificial intelligence, and he has recently spent a decade developing the advanced technology
          behind Formula Stocks.`
        }
      } else if (this.state.showModal === 'Mark') {
        selected = {
          name: "Mark Lyck",
          position: 'COO',
          bio: `It is possible to beat the market. Our portfolio service is the product of a decade's worth
           of advanced equity research. We know how to gain an edge over the market, and we want to share
           our results with you.
           Mark Lyck is an entrepreneur who has brought his experience and edge to Formula Stocks through
           collaboration with Thomas. With a background in Business Administration and
           web-based user interface design, he makes complex technology easily accessible for everyone
           in a user-friendly manner.`
        }
      } else if (this.state.showModal === 'Marie') {
        selected = {
          name: "Marie Lauritzen",
          position: 'PhD. Research Assistant',
          bio: `Marie works with documentation and localization and assists with research and quality control.
          A PhD., graduate of Royal Holloway, London, and Aarhus University, Aarhus,
          Marie's focus areas have been post-modern literature, research, as well as complexity theory.
          She is a language expert and outstanding in terms of ensuring that the highest possible
          standards are always methodically applied.`
        }
      }

      modal = (
        <div className="team-modal-container">
          <div className="team-modal">
            <button className="close-button" onClick={() => this.setState({showModal: false})}><i className="fa fa-times" aria-hidden="true"></i></button>
            <img className="modal-image" src={photos[this.state.showModal]} alt="employee"/>
            <div className="wrapper">
              <div className="main-info">
                <h3>{selected.name}</h3>
                <h4>{selected.position}</h4>
              </div>
              <div className="content">
                <p>{selected.bio}</p>
              </div>
            </div>
          </div>
        </div>)
    }

    return (
      <section className="about-us section">
        <h2>About us</h2>
        <div className="divider"></div>

        <div className="content">
          <p className="about-fs">
            Formula Stocks is a research and development company, which started operations in
            2003. The basic idea was simple:
            leveraging decades of supercomputer experience and investment acumen to create an
            informational advantage in equity investing. We specialize in being right far more often
            than we are wrong, using a scientific approach and intelligent technology to analyze
            businesses and accumulate extensive knowledge which can literally be found nowhere else.
          </p>
          <ul className="team-list">

            <li className="team-member" onClick={this.showModal.bind(this, 'Thomas')}>
              <img src={photos.Thomas} alt="employee"/>
              <div className="content">
                <h3 className="name">Thomas Lyck</h3>
                <h4>CEO</h4>
              </div>
            </li>
            <li className="team-member" onClick={this.showModal.bind(this, 'Mark')}>
              <img src={photos.Mark} alt="employee"/>
              <div className="content">
                <h3 className="name">Mark Lyck</h3>
                <h4>COO</h4>
              </div>
            </li>
            <li className="team-member" onClick={this.showModal.bind(this, 'Marie')}>
              <img src={photos.Marie} alt="employee"/>
              <div className="content">
                <h3 className="name">Marie Lauritzen</h3>
                <h4>PhD. Research Assistant</h4>
              </div>
            </li>
          </ul>
        </div>
        {modal}
      </section>
    )
  }
})

export default AboutUs
