import React from 'react'
import _ from 'underscore'
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw, convertToRaw} from 'draft-js'
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
  closeModal(e) {
    if (_.toArray(e.target.classList).indexOf('article-modal-container') > -1
    || _.toArray(e.target.classList).indexOf('close-btn') > -1
    || _.toArray(e.target.classList).indexOf('fa-times') > -1) {
      this.setState({modal: false})
    }
  },
  render() {
    let modal;
    if (this.state.modal) {
      modal = (
      <div className="article-modal-container" onClick={this.closeModal}>
        <div className="article-modal">
          <button onClick={this.closeModal} className="close-btn"><i className="fa fa-times" aria-hidden="true"></i></button>
          <Article id={this.props.params.article}/>
        </div>
      </div>)
    }

    let articles = this.state.articles.map((article, i) => {
      var rawData = article.content
      var contentState = convertFromRaw(rawData)
      let previewText = stateToHTML(contentState)
      let endIndex = previewText.indexOf('/')
      previewText = previewText.slice(3, endIndex - 1)
      previewText = previewText.slice(0, 150)

      return (
        <li key={i} className="article-preview" onClick={this.gotoArticle.bind(null, article._id)}>
          <h3>{article.title}</h3>
          <p>{previewText}...</p>
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
