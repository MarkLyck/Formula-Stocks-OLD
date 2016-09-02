import React from 'react'

import store from '../../store'

const Brochures = React.createClass({
  downloadBrochure(name) {
    window.open(`/assets/downloads/${name}.pdf`)
  },
  render() {
    return (
      <section className="brochures">
        <h2 className="title">Want more information? Download our brochures</h2>
        <div className="cta">
          <button onClick={this.downloadBrochure.bind(null, 'FAQ')} className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>FAQ</button>
          <button onClick={this.downloadBrochure.bind(null, 'business')} className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>Business brochure</button>
        </div>
      </section>
    )
  }
})

export default Brochures
