import React from 'react'
import { browserHistory } from 'react-router'
import './bottomCTA.css'

class BottomCTA extends React.Component {
  gotoSignup() {
    let prefix = this.props.path === '/pro' ? '/pro' : ''
    if (this.props.path === '/pro') { localStorage.selectedPlan = 'premium' }
    browserHistory.push(`${prefix}/signup`)
  }

  render() {
    window.intercomSettings = {
      app_id: "194mpvo",
      custom_launcher_selector: '#talk-to-us'
    }

    return (
      <section className="bottom-cta section">
        <h1>Now that you've scrolled all the way to the bottom...</h1>
        <h3>It can be just the right moment to stop reading and do some clicking instead.</h3>
        <a className="to-pricing" onClick={this.gotoSignup.bind(this)}>I'm ready to try</a>
        <a id="talk-to-us" className="not-convinced" href="mailto:i194mpvo@incoming.intercom.io">Want more information? - Let's talk!</a>
      </section>
    )
  }
}

export default BottomCTA
