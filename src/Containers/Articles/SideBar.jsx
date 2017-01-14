import React from 'react'
import _ from 'underscore'
import { browserHistory } from 'react-router'
var markdown = require( "markdown" ).markdown
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router'
import './styles/sidebar.css'

class ArticleSideBar extends React.Component {
  constructor(props) {
    super(props)

    this.renderArticles = this.renderArticles.bind(this)
    this.state = { open: true, article: this.props.article }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ article: newProps.article })
  }

  renderArticles() {
    const articles = _.sortBy(this.props.articles, (art) => art._kmd.ect).reverse()
    return articles.map((article, i) => {
      const preview = article.body.substring(0,100).split('![')[0]

      let html_content = markdown.toHTML( preview )
      html_content = html_content.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
      const previewHTML = ReactHtmlParser(html_content)

      return (
        <li className={`article-item ${article.title === this.state.article.title ? 'selected' : ''}`} key={i} onClick={this.gotoArticle.bind(this, article.title)}>
          <h3 className="article-item-title">{article.title}</h3>
          <div className="article-preview">{previewHTML}</div>
        </li>)
    })
  }

  gotoArticle(title) {
    browserHistory.push(`/articles/${title}`)
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
