import React from 'react'
import store from '../../store'
import flaskLogo from './icons/Flask_Logo.svg'

import Article from './Article'
import SideBar from './SideBar'
import './styles/articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)

    this.state = { articles: [], fetched: false }
  }

  componentDidMount() {
    store.articles.data.fetch()
    store.articles.data.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.articles.data.off('update', this.updateState)
  }

  updateState() {
    if (!this.state.articles.length) {
      this.setState({ fetched: true, articles: store.articles.data.toJSON() })
    }
  }

  render() {


    console.log(this.state.articles)
    return (
      <div className="articles">
        <img className="flask-logo" src={flaskLogo} alt="Formula Stocks"/>
        <div className="content">
          <Article article={this.state.articles[0]}/>
        </div>
        <SideBar articles={this.state.articles}/>
      </div>
    )
  }
}

export default Articles
