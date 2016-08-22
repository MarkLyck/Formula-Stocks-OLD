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
    return (
    <div className="new-article">
      <img src={this.state.image}/>
      <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false} accept="image/*">
        <div>
          <h3>Drag and drop JSON files here</h3>
          <img src="assets/icons/json_icon.svg"/>
        </div>
      </Dropzone>
      <div className="editor">
        <RichTextEditor image={this.state.image}/>
      </div>
    </div>
  )
  }
})

export default NewArticle
