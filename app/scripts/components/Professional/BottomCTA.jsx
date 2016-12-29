import React from 'react'
import Scroll from 'react-scroll'

class BottomCTA extends React.Component {
  render() {
    const ScrollLink = Scroll.Link
    return (
      <section className="bottom-cta">
        <h1>Now that you've scrolled all the way to the bottom...</h1>
        <h3>It can be just the right moment to stop reading and do some clicking instead.</h3>
        <ScrollLink className="to-pricing" to="pricing" smooth={true} offset={-100} duration={1000}>I'm ready to try</ScrollLink>
        <a className="not-convinced">Need more information? - Just ask us!</a>
      </section>
    )
  }
}

export default BottomCTA
