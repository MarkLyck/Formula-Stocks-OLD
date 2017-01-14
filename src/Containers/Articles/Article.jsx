import React from 'react'
import moment from 'moment'

class Article extends React.Component {
  render() {
    const article = this.props.article
    if (!article) { return <div className="loading"></div> }
    console.log(article)

    return (
      <div className="article">
        <div className="header-image" style={{ backgroundImage: `url(${article.image._downloadURL})` }} alt="header"/>
        <div className="post">
          <h1 className="title">{article.title}</h1>
          <p className="info">{moment(article._kmd.ect).format('MMMM Do YYYY')}</p>
          <p className="body">{article.body}</p>
        </div>
      </div>
    )
  }
}

export default Article
