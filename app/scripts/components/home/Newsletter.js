import React from 'react'
import Newsletter from '../../models/Newsletter'
import store from '../../store'

const NewsLetter = React.createClass({
  signUpForNewsletter(e) {
    e.preventDefault()
    let email = this.refs.email.value
    if(store.session.validateEmail(email)) {
      let newsletter = new Newsletter({
        email: email
      })
      newsletter.save()
    } else {
      console.log('### Invalid email')
    }
  },
  render() {
    return (
      <section className="newsletter">
        <h2 className="title">Subscribe to our newsletter and stay updated</h2>
        <form onSubmit={this.signUpForNewsletter}>
          <input type="email" placeholder="Enter your email address" ref="email"/>
          <input type ="submit" className="filled-btn" value="submit"/>
        </form>
      </section>
    )
  }
})

export default NewsLetter
