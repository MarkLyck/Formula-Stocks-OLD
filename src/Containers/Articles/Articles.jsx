import React from 'react'
import { browserHistory } from 'react-router'
import store from '../../store'
import flaskLogo from './icons/Flask_Logo.svg'

import Article from './Article'
import SideBar from './SideBar'
import './styles/articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)

    this.state = { articles: [], fetched: false, sidebar: true }
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

  goHome() {
    browserHistory.push('/')
  }

  render() {
    return (
      <div className="articles">
        <img className="flask-logo" src={flaskLogo} alt="Formula Stocks" onClick={this.goHome}/>
        <div className="content">
          <Article article={this.state.articles[0]} style={this.state.sidebar ? { width: 'calc(100% - 320px)' } : {}}/>
        </div>
        <SideBar articles={this.state.articles}/>
      </div>
    )
  }
}

export default Articles
