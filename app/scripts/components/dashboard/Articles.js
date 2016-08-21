import React from 'react'
import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js'
import ReactHtmlParser from 'react-html-parser';


import store from '../../store'

import Modal from '../Modal'
import Article from './Article'



const Articles = React.createClass({
  getInitialState() {
    return {articles: store.articles.data.toJSON(), modal: false}
  },
  updateState() {
    let modal = false
    if(this.props.params.article) {
      modal = this.props.params.article
    }
    this.setState({articles: store.articles.data.toJSON(), modal: modal})
  },
  componentDidMount() {
    store.articles.data.fetch({success: this.updateState})
  },
  gotoArticle(id) {
    this.setState({modal: id})
    store.settings.history.push(`/dashboard/articles/${id}`)
  },
  closeModal() {
    this.setState({modal: false})
  },
  render() {
    let modal;
    if (this.state.modal) {
      modal = (
      <Modal closeModal={this.closeModal}>
        <Article id={this.props.params.article}/>
      </Modal>)
    }

    let articles = this.state.articles.map((article, i) => {
      var rawData = article.content
      var contentState = convertFromRaw(rawData)
      let previewText = stateToHTML(contentState)
      let endIndex = previewText.indexOf('/')
      previewText = previewText.slice(3, endIndex - 1)
      previewText = previewText.slice(0, 100)

      return (
        <li key={i} className="article" onClick={this.gotoArticle.bind(null, article._id)}>
          <h3>{article.title}</h3>
          <p>{previewText}...</p>
          {//ReactHtmlParser(stateToHTML(contentState))
          }
        </li>
      )
    })
    return (
      <div className="articles">
        <ul>
          {articles}
        </ul>
        {modal}
      </div>
    )
  }
})


export default Articles
