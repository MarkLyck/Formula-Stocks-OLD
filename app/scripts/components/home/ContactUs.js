import React from 'react'

const ContactUs = React.createClass({
  render() {
    return (
      <section className="contact-us">
        <h2 className="title">Let's talk!</h2>
        <form>
          <div className="left">
          <label>
            <p>Name</p>
            <input id="contact-us-name" type="text" placeholder="Name"/>
          </label>
          <label>
            <p>Email</p>
            <input id="contact-us-email" type="text" placeholder="email"/>
          </label>
          <label>
            <p>Company</p>
            <input id="contact-us-company" type="text" placeholder="company"/>
          </label>
          </div>
          <div className="right">
          <textarea placeholder="Your Message"/>
          <input className="filled-btn" type="submit" className="submit" value="Send"/>
          </div>
        </form>
      </section>
    )
  }
})

export default ContactUs
