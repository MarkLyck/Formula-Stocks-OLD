import React from 'react'

const Brochures = React.createClass({
  render() {
    return (
      <div className="brochures">
        <h2 className="title">Want more information? Download our brochures</h2>
        <div className="cta">
          <button className="filled-btn">Retail Brochure</button>
          <button className="filled-btn">Business Brochure</button>
        </div>
      </div>
    )
  }
})

export default Brochures
