import React from 'react'
import moment from 'moment'
var markdown = require( "markdown" ).markdown
import ReactHtmlParser from 'react-html-parser'

class Article extends React.Component {
  render() {
    const article = this.props.article
    if (!article) { return <div className="loading"></div> }

    let html_content = markdown.toHTML( article.body )
    html_content = html_content.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
    const bodyHTML = ReactHtmlParser(html_content)

    return (
      <div className="article" style={this.props.style}>
        <div className="header-image" style={{ backgroundImage: `url(${article.image._downloadURL})` }} alt="header"/>
        <div className="post">
          <h1 className="title">{article.title}</h1>
          <p className="info">By {article.author} | {moment(article._kmd.ect).format('MMMM Do YYYY')}</p>
          <div className="body">{bodyHTML}</div>
        </div>
      </div>
    )
  }
}

export default Article
