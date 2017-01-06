import React from 'react'
import Scroll from 'react-scroll'

class Brochure extends React.Component {
  downloadBrochure() {
    window.open(`/assets/downloads/business.pdf`)
  }

  render() {
    const Element = Scroll.Element
    return (
      <section className="brochure section">
        <Element name="brochure"/>
        <div className="beside">
          <div className="left">
            <h1>Want more in-depth technical information?</h1>
            <button className="download-brochure" onClick={this.downloadBrochure}>
              <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
              See the brochure
            </button>
          </div>
          <div className="right">
            <img src="/assets/images/business_brochure_screen.png" className="brochure-image" onClick={this.downloadBrochure}/>
          </div>
        </div>
      </section>
    )
  }
}

export default Brochure
