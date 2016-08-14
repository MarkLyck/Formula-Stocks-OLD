import React from 'react'

const NewsLetter = React.createClass({
  signUpForNewsletter() {
    console.log('HURRAY');
  },
  render() {
    return (
      <section className="newsletter">
        <h2 className="title">Subscribe to our newsletter and stay updated</h2>
        <form onSubmit={this.signUpForNewsletter}>
          <input type="text" placeholder="Enter your email address"/>
          <input type ="submit" className="filled-btn"/>
        </form>
      </section>
    )
  }
})

export default NewsLetter
