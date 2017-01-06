import React from 'react'
import {Link} from 'react-router'

class BottomCTA extends React.Component {
  render() {
    window.intercomSettings = {
      app_id: "194mpvo",
      custom_launcher_selector: '#talk-to-us'
    }
    return (
      <section className="bottom-cta">
        <h1>Now that you've scrolled all the way to the bottom...</h1>
        <h3>It can be just the right moment to stop reading and do some clicking instead.</h3>
        <Link className="to-pricing" to="/pro/signup">I'm ready to try</Link>
        <a id="talk-to-us" className="not-convinced" href="mailto:i194mpvo@incoming.intercom.io">Want more information? - Talk to us!</a>
      </section>
    )
  }
}

export default BottomCTA
