import React from 'react'

const Quote = React.createClass({
  render() {
    return (
      <section className="quote-section">
        <div className="content">
          <h2 className="quote">“Compound interest is the eighth wonder of the world.<br/>
              He who understands it - Earns it. He who doesn’t - Pays it.”
          </h2>
          <p className="disclaimer">- Albert Einstein</p>
        </div>
      </section>
    )
  }
})

export default Quote
