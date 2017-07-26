import React from 'react'
import moment from 'moment'
var markdown = require( "markdown" ).markdown
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor
import ReactHtmlParser from 'react-html-parser'

class Article extends React.Component {
  state = { editing: false }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

  submitEdit = (e) => {
    e.preventDefault()
    let newArticle = this.props.article
    const markdown = this.refs.mdeditor.state.content
    newArticle.body = markdown
    if (this.refs.titleInput.value) { newArticle.title = this.refs.titleInput.value }
    if (this.refs.authorInput.value) { newArticle.author = this.refs.authorInput.value }
    this.props.updateArticle(newArticle)

    this.toggleEdit()
  }

  render() {
    const { article, session } = this.props
    if (!article) { return <div className="loading"></div> }

    if (this.state.editing) {
      return (
        <div className="article" style={this.props.style}>
          <div className="header-image" style={{ backgroundImage: `url(${article.image._downloadURL})` }} alt="header"/>
          <form className="edit-form" onSubmit={this.submitEdit}>
            <input className="title-input" placeholder={article.title} ref="titleInput"/>
            <input className="author-input" placeholder={article.author} ref="authorInput"/>
            <MarkdownEditor initialContent={article.body} iconsSet="font-awesome" ref="mdeditor"/>
            <input type="submit" value="Publish"/>
          </form>
          <button onClick={this.toggleEdit} className="cancel">cancel edit</button>
        </div>
      )
    }

    let html_content = markdown.toHTML( article.body )
    html_content = html_content.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#95;', '_').replaceAll('&#39;', "'")
    const bodyHTML = ReactHtmlParser(html_content)

    return (
      <div className="article" style={this.props.style}>
        <div className="header-image" style={{ backgroundImage: `url(${article.image._downloadURL})` }} alt="header"/>
        <div className="post">
          { session.type === 5 ? <button className="edit-btn" onClick={this.toggleEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button> : ''}
          <h1 className="title">{article.title}</h1>
          <p className="info">By {article.author} | {moment(article._kmd.ect).format('MMMM Do YYYY')}</p>
          <div className="body">{bodyHTML}</div>
        </div>
      </div>
    )
  }
}

export default Article
