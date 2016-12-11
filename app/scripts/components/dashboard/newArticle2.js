import React from 'react'
import $ from 'jquery'
import store from '../../store'
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor

class NewArticle extends React.Component {
  constructor(props) {
    super(props)

    this.publishArticle = this.publishArticle.bind(this)
  }

  publishArticle(e) {
    e.preventDefault()
    const markdown = this.refs.mdeditor.state.content
    store.mdarticles.data.create({
      author: store.session.get('name'),
      title: '',
      mdBody: markdown
    })
  }

  render() {
    return (
      <form className="md-editor" onSubmit={this.publishArticle}>
        <MarkdownEditor initialContent="" iconsSet="font-awesome" ref="mdeditor"/>
        <input type="submit" value="Publish"/>
      </form>
    )
  }
}

export default NewArticle
