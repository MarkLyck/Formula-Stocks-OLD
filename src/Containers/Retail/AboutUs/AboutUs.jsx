import React, { Component } from 'react'

import Thomas from './photos/Thomas.jpg'
import Mark from './photos/Mark.jpg'
import Marie from './photos/Marie.jpg'

import './aboutUs.css'

const photos = {
  Thomas: Thomas,
  Mark: Mark,
  Marie: Marie
}

class AboutUs extends Component {
  state = { showModal: false }

  showModal = (name) => this.setState({ showModal: name })

  renderModal = (employee) => {
    let selected = {}
    switch (employee) {
      case 'Thomas':
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
        break;
      case 'Mark':
        selected = {
          name: "Mark Lyck",
          position: 'COO',
          bio: `Mark Lyck is an entrepreneur who has brought his experience and edge to Formula Stocks.
                With a background in Economics, Business Administration and software-engineering, he makes complex technology easily
                accessible for everyone in a user-friendly manner.`
        }
        break;
      case 'Marie':
        selected = {
          name: "Marie Lauritzen, PhD.",
          position: 'CHRO',
          bio: `Marie is Chief Human Resources Officer and assists with research and quality control oversight. A PhD., graduate of
                Royal Holloway, London, and Aarhus University, Aarhus, Marie's focus areas have been research, complexity theory and
                originally post-modern literature. She is outstanding in terms of ensuring that the highest possible standards are always
                methodically applied.`
        }
        break;
      default:
        break;
    }

    return (
      <div className="team-modal-container">
        <div className="team-modal">
          <button className="close-button" onClick={() => this.setState({ showModal: false })}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
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
      </div>
    )
  }

  render() {
    const { showModal } = this.state
    return (
      <section className="about-us section">
        <h2>Corporate profile</h2>
        <div className="divider"></div>

        <div className="beside">
          <div className="left">
            <h3 className="title">About us</h3>
            <p className="about-fs">
              Formula Stocks develops cognitive computing technologies since 2003 designed to achieve above-average performance in
              equity markets. Technology includes learning, business analytics, decisionmaking, probability estimation, and prediction
              technologies. Products suites can be used as a standalone tool to assist investors, or operate as autonomous
              decisionmakers, artificial intelligence capable of portfolio construction, active portfolio management, risk/reward
              management.
            </p>
            <p>Address: Formula Stocks ApS | Ribe Landevej 39, DK-6100 Haderslev. Denmark</p>
            <p>Contact us at: <a href="mailto:info@formulastocks.com">info@formulastocks.com</a></p>
          </div>

          <div className="right">
            <h3 className="title">Executive team</h3>
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
                  <h3 className="name">Marie Lauritzen, PhD.</h3>
                  <h4>CHRO</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {showModal && this.renderModal(showModal)}
      </section>
    )
  }
}

export default AboutUs
