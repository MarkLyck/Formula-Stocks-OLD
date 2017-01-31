import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'underscore'
import store from '../../store'
import flaskLogo from './icons/Flask_Logo.svg'

import Article from './Article'
import SideBar from './SideBar'
import './styles/articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
    this.toggleSideBar = this.toggleSideBar.bind(this)

    this.state = { articles: [], fetched: false, sidebar: true }
  }

  componentDidMount() {
    window.Intercom("shutdown")
    store.articles.data.fetch()
    store.articles.data.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.articles.data.off('update', this.updateState)
  }

  updateState() {
    if (!this.state.articles.length) {
      this.setState({ fetched: true, articles: store.articles.data.toJSON().reverse() })
    } else {
      this.setState({ fetched: true })
    }
  }

  goHome() {
    browserHistory.push('/')
  }

  toggleSideBar() {
    this.setState({ sidebar: !this.state.sidebar })
  }

  render() {
    let currentArticle = this.state.articles[0]
    if (this.props.routeParams.splat.length) {
      currentArticle = _.find(this.state.articles, (art) => art.title.toLowerCase() === this.props.routeParams.splat.split('/')[1].toLowerCase())
    }

    return (
      <div className="articles">
        <img className="flask-logo" src={flaskLogo} alt="Formula Stocks" onClick={this.goHome}/>
        <div className="content" style={ this.state.sidebar ? { width: "calc(100% - 320px)" } : { width: "100%" } }>
          <Article article={currentArticle}/>
        </div>
        <SideBar location={this.props.location} articles={this.state.articles} article={currentArticle} toggleSideBar={this.toggleSideBar} open={this.state.sidebar}/>
      </div>
    )
  }
}

export default Articles
