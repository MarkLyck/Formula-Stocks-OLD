import React from 'react'

import store from '../../store'

const Brochures = React.createClass({
  downloadBrochure(name) {
    // store.settings.history.push('/assets/downloads/retail.pdf')
    window.open(`/assets/downloads/${name}.pdf`)
  },
  render() {
    return (
      <section className="brochures">
        <h2 className="title">Want more information? Download our brochures</h2>
        <div className="cta">
          <button onClick={this.downloadBrochure.bind(null, 'retail')} className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>Retail Brochure</button>
          <button onClick={this.downloadBrochure.bind(null, 'business')} className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>Business Brochure</button>
        </div>
      </section>
    )
  }
})

export default Brochures
