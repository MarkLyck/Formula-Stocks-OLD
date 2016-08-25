import React from 'react'
import $ from 'jquery'

import store from '../../store'

const ContactUs = React.createClass({
  getInitialState() {
    return {sending: false, sent: false, error: false}
  },
  contactUs(e) {
    e.preventDefault()
    this.setState({sending: true})
    let email = this.refs.email.value
    if (store.session.validateEmail(email)) {
      let name = this.refs.name.value
      let company = this.refs.company.value
      let body = this.refs.body.value
      $.ajax({
        url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/contactus`,
        type: 'POST',
        data: {
          email: email,
          name: name,
          body: body,
          company: company
        },
      })
        .then((r) => {
          this.setState({sending: false, sent: true})
          this.refs.email.value = ''
          this.refs.body.value = ''
          this.refs.company.value = ''
          this.refs.name.value = ''
        })
        .fail(() => {
          this.setState({sending: false, error: true})
        })
    } else {
      this.setState({sending: false, error: 'Invalid email'})
      console.log('invalid email');
    }
  },
  changingEmail() {
    this.setState({sending: false, error: false})
  },
  render() {
    //          <input className="filled-btn" type="submit" className="submit" value="Send"/>
    let sendBtn = <button className="filled-btn submit">Send</button>
    // let sendBtn = <button className="filled-btn submit"><i className="fa fa-spinner fa-pulse fa-2x fa-fw blue-color"></i></button>

    if (this.state.sending) {
      sendBtn = <button className="filled-btn submit"><i className="fa fa-spinner fa-pulse fa-fw blue-color"></i></button>
    } else if (this.state.sent) {
      sendBtn = <button className="filled-btn submit"><i className="fa fa-check green-color"></i><p className="green-color">Sent</p></button>
    } else if (this.state.error) {
      sendBtn = <button className="filled-btn submit red-color"><i className="fa fa-times red-color"></i>{this.state.error}</button>
    }

    return (
      <section className="contact-us">
        <h2 className="title">Let's talk!</h2>
        <form onSubmit={this.contactUs}>
          <div className="left">
          <label>
            <p>Name</p>
            <input id="contact-us-name" type="text" placeholder="Name" ref="name"/>
          </label>
          <label>
            <p>Email</p>
            <input id="contact-us-email" type="email" placeholder="email" ref="email" onKeyUp={this.changingEmail}/>
          </label>
          <label>
            <p>Company</p>
            <input id="contact-us-company" type="text" placeholder="company" ref="company"/>
          </label>
          </div>
          <div className="right">
          <textarea placeholder="Your Message" ref="body"/>
            {sendBtn}
          </div>
        </form>
      </section>
    )
  }
})

export default ContactUs
