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
    this.state = { article: this.props.article }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ article: newProps.article })
  }

  renderArticles() {
    const articles = _.sortBy(this.props.articles, (art) => art._kmd.ect).reverse()
    return articles.map((article, i) => {
      const preview = article.body.substring(0,120).replace(`\n`, '').split('![')[0]
      let html_content = markdown.toHTML( preview )
      html_content = html_content.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('_', '')
      const previewHTML = ReactHtmlParser(html_content)

      return (
        <li className={`article-item ${article.title === this.state.article.title ? 'selected' : ''}`} key={i} onClick={this.gotoArticle.bind(this, article.title)}>
          <h3 className="article-item-title">{article.title}</h3>
          <div className="article-preview">{previewHTML}</div>
        </li>)
    })
  }

  gotoArticle(title) {
    if (this.props.location.indexOf('dashboard') === -1) {
      browserHistory.push(`/articles/${title}`)
    } else {
      browserHistory.push(`/dashboard/articles/${title}`)
    }
  }

  render() {
    return (
      <div className={`article-sidebar ${this.props.open ? 'open' : 'sidebar-closed'}`}>
        <div className="line-through"/>
        <button className="toggle" onClick={this.props.toggleSideBar}><i className={`fa fa-angle-${this.props.open ? 'right' : 'left'}`} aria-hidden="true"></i></button>
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
