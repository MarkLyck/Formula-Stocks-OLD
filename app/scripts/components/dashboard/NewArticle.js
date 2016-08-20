import React from 'react'
import RichTextEditor from './RichTextEditor'

const NewArticle = React.createClass({
  render() {
    return (
    <div className="new-article">

      <div className="editor">
        <RichTextEditor/>
      </div>

    </div>
  )
  }
})

export default NewArticle
