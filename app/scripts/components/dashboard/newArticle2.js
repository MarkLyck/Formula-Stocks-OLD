import React from 'react'
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor

class NewArticle extends React.Component {
  render() {
    return (
      <form className="md-editor">
        <MarkdownEditor initialContent="Test" iconsSet="font-awesome"/>
      </form>
    )
  }
}

export default NewArticle
