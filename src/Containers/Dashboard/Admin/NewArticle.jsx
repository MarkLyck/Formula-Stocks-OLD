import React from 'react'
import Dropzone from 'react-dropzone'
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor
import store from '../../../store'
import admin from '../../../admin'
import './styles/newArticle.css'

class NewArticle extends React.Component {
  constructor(props) {
    super(props)

    this.publishArticle = this.publishArticle.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.receivedImage = this.receivedImage.bind(this)
    this.toggleMembersOnly = this.toggleMembersOnly.bind(this)

    this.state = { uploadedImage: '', image: '', membersOnly: false, uploading: false }
  }

  onDrop(files) {
    this.setState({ uploadedFile: files[0] })
    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let reader = new FileReader()
    reader.onload = this.receivedImage
    reader.readAsDataURL(file)
  }

  receivedImage(file) {
    console.log('received image: ', file)
    this.setState({ image: file.srcElement.result })
  }

  toggleMembersOnly() {
    this.setState({ membersOnly: !this.state.membersOnly })
  }

  publishArticle(e) {
    if (this.state.uploading) {
      return
    }
    this.setState({ uploading: true })
    e.preventDefault()
    const markdown = this.refs.mdeditor.state.content

    store.articles.data.create({
      author: store.session.get('name'),
      title: this.refs.title.value,
      body: markdown,
      membersOnly: this.state.membersOnly
    },
    {
      success: (response) => {
        admin.uploadImage(this.state.uploadedFile, response)
        .then((article) => {
          console.log(article)
          if (imagesUploaded => this.state.images.length) {
            store.settings.history.push(`/articles/${article.title}`)
          }
        })
      }
    })
  }

  render() {
    return (
      <form className="new-article" onSubmit={this.publishArticle}>
        <Dropzone className="dropzone header-image" onDrop={this.onDrop} multiple={false} accept="image/*" style={ this.state.image ? { backgroundImage: `url("${this.state.image}")` } : {}}>
          <h3>Drag and drop header image here</h3>
          <i className="fa fa-picture-o" aria-hidden="true"></i>
        </Dropzone>
        <div className="input-container">
          <input type="text" className="title" placeholder="Title" ref="title"/>
          <button className={`members-toggle ${this.state.membersOnly ? 'members-only' : 'public'}`} onClick={this.toggleMembersOnly}>{this.state.membersOnly ? 'Members Only' : 'Public'}</button>
        </div>
        <MarkdownEditor initialContent="" iconsSet="font-awesome" ref="mdeditor"/>
        <input type="submit" value="Publish"/>
      </form>
    )
  }
}

export default NewArticle
