import React from 'react'

import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw, convertToRaw} from 'draft-js'
import ReactHtmlParser from 'react-html-parser';

import store from '../../store'

const Article = React.createClass({
  getInitialState() {
    return {article: store.articles.data.get(this.props.id).toJSON()}
  },
  updateState() {
    this.setState({article: store.articles.data.get(this.props.id).toJSON()})
  },
  componentDidMount() {
    store.articles.data.fetch({success: this.updateState})
    store.articles.data.on('change update', this.updateState)
  },
  componentWillUnmount() {
    store.articles.data.off('update', this.updateState)
  },
  render() {
    let article;
    if (this.state.article) {
      var rawData = this.state.article.content
      var contentState = convertFromRaw(rawData)
      let articleHtml = stateToHTML(contentState)
      article = ReactHtmlParser(articleHtml)
    }
    return (
      <div className="article">
        <h2 className="title">{this.state.article.title}</h2>
        <div className="article-content">
          {article}
        </div>
      </div>
    )
  }
})

export default Article
