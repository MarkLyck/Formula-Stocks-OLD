import React from 'react'
import {Link} from 'react-router'
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
          <Link to="/faq" className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>FAQ</Link>
          <button onClick={this.downloadBrochure.bind(null, 'business')} className="filled-btn">
            <div className="button-content">
              <i className="fa fa-file" aria-hidden="true"></i>
              <p>Business brochure</p>
            </div>
          </button>
        </div>
      </section>
    )
  }
})

export default Brochures
