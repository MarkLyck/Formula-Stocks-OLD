import React from 'react'
var markdown = require( "markdown" ).markdown
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router'
import './styles/sidebar.css'

class ArticleSideBar extends React.Component {
  constructor(props) {
    super(props)

    this.renderArticles = this.renderArticles.bind(this)
    this.state = { open: true }
  }

  renderArticles() {
    return this.props.articles.map((article, i) => {


      const preview = article.body.substring(0,100)

      let html_content = markdown.toHTML( preview )
      html_content = html_content.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
      const previewHTML = ReactHtmlParser(html_content)

      return (
        <li className="article-item" key={i}>
          <h3 className="article-item-title">{article.title}</h3>
          <div className="article-preview">{previewHTML}</div>
        </li>)
    })
  }

  render() {
    return (
      <div className={`article-sidebar ${this.state.open ? 'open' : 'closed'}`}>
        <div className="line-through"/>
        <h3 className="latest">Latest articles</h3>
        <ul className="article-list">
          {this.renderArticles()}
        </ul>
        <Link to="/" className="homepage-link">See Formula Stocks</Link>
      </div>
    )
  }
}

export default ArticleSideBar
