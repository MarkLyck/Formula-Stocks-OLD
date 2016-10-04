import React from 'react'
import ProfileCard from './ProfileCard'
import Modal from '../Modal'

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
    // let classThomas, classMark, classMarie, bio;

    let modal
    if (this.state.showModal) {
      let selected = {}
      if (this.state.showModal === 'Thomas') {
        selected = {
          name: "Thomas Lyck",
          position: 'Co-founder & CEO',
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
          position: 'Co-founder & COO',
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
            <img className="modal-image" src={`assets/images/profiles/${this.state.showModal}_Square.jpg`} />
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
      <section className="about-us">
        <h2>About us</h2>
        <div className="divider"></div>

        <div className="content">
          <p className="about-fs">
            Formula Stocks is a research and development company based in Denmark.
            We started R&D operations in 2003. The basic idea was simple:
            leveraging decades of supercomputer experience and investment acumen to create an
            informational advantage in equity investing. We specialize in being right far more often
            than we are wrong, using a scientific approach and intelligent technology to analyze
            businesses and accumulate extensive knowledge which can literaly be found nowhere else.
          </p>
          <ul className="team-list">

            <li className="team-member" onClick={this.showModal.bind(this, 'Thomas')}>
              {/* <div className="img-container" style={{backgroundImage: 'url(assets/images/profiles/Thomas.jpg)'}}/> */}
              <img src="assets/images/profiles/Thomas_Square.jpg" />
              <div className="content">
                <h3 className="name">Thomas Lyck</h3>
                <h4>Co-founder & CEO</h4>
              </div>
            </li>
            <li className="team-member" onClick={this.showModal.bind(this, 'Mark')}>
            {/* <div className="img-container" style={{backgroundImage: 'url(assets/images/profiles/Mark.jpg)'}}/> */}
              <img src="assets/images/profiles/Mark_Square.jpg" />
              <div className="content">
                <h3 className="name">Mark Lyck</h3>
                <h4>Co-founder & COO</h4>
              </div>
            </li>
            <li className="team-member" onClick={this.showModal.bind(this, 'Marie')}>
            {/* <div className="img-container" style={{backgroundImage: 'url(assets/images/profiles/Marie.jpg)'}}/> */}
              <img src="assets/images/profiles/Marie_Square.jpg" />
              <div className="content">
                <h3 className="name">Marie Lauritzen</h3>
                <h4>PhD. Research Assistant</h4>
              </div>
            </li>
          </ul>
          {/* <div className="employees">
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
          </div> */}
        </div>
        {modal}
      </section>
    )
  }
})

export default AboutUs
