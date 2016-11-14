import React from 'react'
var markdown = require( "markdown" ).markdown
import ReactHtmlParser from 'react-html-parser';
import FAQData from '../../data/faqData'
import { Link } from 'react-router'

let html_content = markdown.toHTML( FAQData )
html_content = html_content.replace('&amp;', '&')
const faqHTML = ReactHtmlParser(html_content)

const FAQ = React.createClass({
  render() {
    return (
      <div className="faq-page">
        <Link className="back-btn" to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</Link>
        <div className="faq-content">
          <h2>Frequently Asked Questions</h2>
          {faqHTML}
        </div>
      </div>
    )
  }
})

export default FAQ
