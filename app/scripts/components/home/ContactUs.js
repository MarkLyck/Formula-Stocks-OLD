import React from 'react'
import $ from 'jquery'

import store from '../../store'

const ContactUs = React.createClass({
  contactUs(e) {
    e.preventDefault()
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
    } else {
      console.log('invalid email');
    }
  },
  render() {
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
            <input id="contact-us-email" type="email" placeholder="email" ref="email"/>
          </label>
          <label>
            <p>Company</p>
            <input id="contact-us-company" type="text" placeholder="company" ref="company"/>
          </label>
          </div>
          <div className="right">
          <textarea placeholder="Your Message" ref="body"/>
          <input className="filled-btn" type="submit" className="submit" value="Send"/>
          </div>
        </form>
      </section>
    )
  }
})

export default ContactUs
