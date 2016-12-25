import React from 'react'

class MoreInformation extends React.Component {
    downloadBrochure() {
      window.open(`/assets/downloads/business.pdf`)
    }

    render() {
      return (
        <section className="more-information">
        <div className="content">
          <div className="left">
            <h1>Want more in-depth information for professionals?</h1>
            <button className="brochure-link" onClick={this.downloadBrochure}><i className="fa fa-file" aria-hidden="true"></i>Download the brochure</button>
          </div>
          <div className="right" onClick={this.downloadBrochure}>
            <button className="brochure-btn">
              <div className="image-container"/>
            </button>
          </div>
        </div>
      </section>
    )
  }
}

export default MoreInformation
