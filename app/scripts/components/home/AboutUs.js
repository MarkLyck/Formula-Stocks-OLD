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

    let classThomas, classMark, classMarie;
    if (this.state.selectedEmployee === 'Thomas') {
      classThomas = 'selected'
    } else if (this.state.selectedEmployee === 'Mark') {
      classMark = 'selected'
    } else if (this.state.selectedEmployee === 'Marie') {
      classMarie = 'selected'
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
                  Lorem ipsum dolor sit amet, ullamcorper neque in quam, id a quam adipiscing vel a.
                  Maecenas quisque sem sed cum a varius, et etiam et scelerisque aenean est,
                  dapibus amet tortor vulputate fringilla, ac commodo. Quam morbi, urna accumsan wisi,
                  justo odio, ut sed at sed wisi purus, luctus justo. Ut commodo volutpat,
                  ac eu sit ut sapien erat, et pellentesque harum do a tellus, lacus sed non.
                  Orci viverra scelerisque nullam viverra, velit eget dictumst sed, odio lorem,
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
