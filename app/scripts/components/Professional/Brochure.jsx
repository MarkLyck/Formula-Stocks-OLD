import React from 'react'

class Brochure extends React.Component {
  downloadBrochure() {
    window.open(`/assets/downloads/business.pdf`)
  }

  render() {
    return (
      <section className="brochure">
        <div className="beside">
          <div className="left">
            <h2>Want more in-depth technical information?</h2>
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
