import React from 'react'
import $ from 'jquery'

import RichTextEditor from './RichTextEditor/containers/RichEditor'

import Dropzone from 'react-dropzone'

const NewArticle = React.createClass({
  getInitialState() {
    return {image: '', submitArticle: false, title: ''}
  },
  onDrop(files) {
    this.setState({uploadedFile: files[0]});
    this.handleImageUpload(files[0]);
  },
  receivedImage(file) {
    console.log('received image: ', file);
    this.setState({image: file.srcElement.result})
  },
  handleImageUpload(file) {
    let reader = new FileReader()
    reader.onload = this.receivedImage;
    reader.readAsDataURL(file);
  },
  submitArticle() {
    this.setState({submitArticle: true, title: this.refs.title.value})
  },
  render() {
    let imgContainerStyles;

    if (this.state.image) {
      imgContainerStyles = {
        height: '400px',
        backgroundImage: `url("${this.state.image}")`
      }
    }

    // <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false} accept="image/*">
    //   <div>
    //     <h3>Drag and drop an image here</h3>
    //     <i className="fa fa-picture-o" aria-hidden="true"></i>
    //   </div>
    // </Dropzone>

    let submitBtn = <button className="filled-btn submit-article" onClick={this.submitArticle}>Submit</button>
    if (this.state.submitArticle) {
      submitBtn = <button className="filled-btn submit-article"><i className="fa fa-spinner fa-pulse fa-fw"></i></button>
    }
    return (
    <div className="new-article">
      <div className="image-preview" style={imgContainerStyles}></div>
      <div className="editor">
        <input type="text" className="article-title" placeholder="Title" ref="title"/>
        <RichTextEditor uploadedFile={this.state.uploadedFile} submitArticle={this.state.submitArticle} title={this.state.title}/>
        {submitBtn}
      </div>
    </div>
  )
  }
})

export default NewArticle
