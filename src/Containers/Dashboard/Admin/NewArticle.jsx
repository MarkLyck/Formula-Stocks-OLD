import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postArticle } from '../../../actions/articles'
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor
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

  receivedImage(file) { this.setState({ image: file.srcElement.result }) }
  toggleMembersOnly() { this.setState({ membersOnly: !this.state.membersOnly }) }

  publishArticle(e) {
    e.preventDefault()
    if (this.refs.title.value && this.refs.mdeditor.state.content) {
      if (this.state.uploading) { return }
      this.setState({ uploading: true })
      const markdown = this.refs.mdeditor.state.content
      this.props.actions.postArticle(markdown, this.refs.title.value, undefined, this.state.membersOnly, this.state.uploadedFile)
    }
  }

  render() {
    return (
      <form className="new-article" onSubmit={this.publishArticle}>
        <Dropzone className="dropzone header-image"
            onDrop={this.onDrop}
            multiple={false}
            accept="image/*"
            style={ this.state.image ? { backgroundImage: `url("${this.state.image}")` } : {}}>
          <h3>Drag and drop header image here</h3>
          <i className="fa fa-picture-o" aria-hidden="true"></i>
        </Dropzone>
        <div className="input-container">
          <input type="text" className="title" placeholder="Title" ref="title"/>
          <button className={`members-toggle ${this.state.membersOnly ? 'members-only' : 'public'}`}
             onClick={this.toggleMembersOnly}>{this.state.membersOnly ? 'Members Only' : 'Public'  }</button>
        </div>
        <MarkdownEditor initialContent="" iconsSet="font-awesome" ref="mdeditor"/>
        <input type="submit" value="Publish"/>
      </form>
    )
  }
}


function mapStateToProps(state) {
  const { session } = state
  return { email: session.email }
}

function mapDispatchToProps(dispatch) {
  const actions = { postArticle }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
