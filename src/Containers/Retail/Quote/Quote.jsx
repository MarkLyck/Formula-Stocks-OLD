import React from 'react'
import './quote.css'

const Quote = React.createClass({
  render() {
    return (
      <section className="quote-section">
        <div className="content">
          <h2 className="quote">“Compound interest is the eighth wonder of the world.<br/>
              He who understands it - earns it. He who doesn’t - pays it.”
          </h2>
          <p className="disclaimer">- Albert Einstein</p>
        </div>
      </section>
    )
  }
})

export default Quote
