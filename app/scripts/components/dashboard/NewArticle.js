import React from 'react'
import $ from 'jquery'
import RichTextEditor from './RichTextEditor'

import Dropzone from 'react-dropzone'

const NewArticle = React.createClass({
  getInitialState() {
    return {image: ''}
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
  render() {
    let imgContainerStyles;

    if (this.state.image) {
      imgContainerStyles = {
        height: '400px',
        backgroundImage: `url("${this.state.image}")`
      }
    }
    return (
    <div className="new-article">

      <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false} accept="image/*">
        <div>
          <h3>Drag and drop an image here</h3>
          <i className="fa fa-picture-o" aria-hidden="true"></i>
        </div>
      </Dropzone>
      <div className="image-preview" style={imgContainerStyles}></div>
      <div className="editor">
        <RichTextEditor uploadedFile={this.state.uploadedFile}/>
      </div>
    </div>
  )
  }
})

export default NewArticle
