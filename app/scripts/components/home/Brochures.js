import React from 'react'

const Brochures = React.createClass({
  render() {
    return (
      <section className="brochures">
        <h2 className="title">Want more information? Download our brochures</h2>
        <div className="cta">
          <button className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>Retail Brochure</button>
          <button className="filled-btn"><i className="fa fa-file" aria-hidden="true"></i>Business Brochure</button>
        </div>
      </section>
    )
  }
})

export default Brochures
