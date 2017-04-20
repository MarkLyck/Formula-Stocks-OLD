import React from 'react'
import brochure from '../../Global/brochure.pdf'

function downloadBrochure() { window.open(brochure) }

const IntendedAudience = () => (
  <section className="section">
    <h2 className="title">Intended audience</h2>
    <div className="divider"/>
    <p>
      This page is an introduction to Formula Stocks and our Entry membership. No experience or background
      is required. If you are an experienced, technically advanced, or professionel investor, you might
      prefer to see our pages with additional technical, in-depth information, which at the same time
      requires more background knowledge.<br/><br/>

      For deeper technical information <a onClick={downloadBrochure}>click here to download our brochure</a>.<br/><br/>

      {/* For institutional and professional services please <Link to="/pro">click here</Link>. */}
    </p>
  </section>
)

export default IntendedAudience
