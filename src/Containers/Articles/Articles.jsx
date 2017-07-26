import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchArticlesIfNeeded, updateArticle } from '../../actions/articles'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import flaskLogo from './icons/Flask_Logo.svg'

import Article from './Article'
import SideBar from './SideBar'
import './styles/articles.css'

class Articles extends Component {
  state = { sidebar: true }

  componentDidMount() {
    window.Intercom("shutdown")
    this.props.actions.fetchArticlesIfNeeded()
  }

  goHome = () => browserHistory.push('/')
  toggleSideBar = () => this.setState({ sidebar: !this.state.sidebar })

  render() {
    const { articlesData = [], session, routeParams, actions } = this.props
    let currentArticle = articlesData.reverse()[0]
    if (routeParams.splat.length) {
      currentArticle = _.find(articlesData, (art) => art.title.toLowerCase() === routeParams.splat.split('/')[1].toLowerCase())
    }

    return (
      <div className="articles">
        <img className="flask-logo" src={flaskLogo} alt="Formula Stocks" onClick={this.goHome}/>
        <div className="content" style={ this.state.sidebar ? { width: "calc(100% - 320px)" } : { width: "100%" } }>
          <Article article={currentArticle} session={session} updateArticle={actions.updateArticle}/>
        </div>
        <SideBar location={this.props.location} articles={articlesData} article={currentArticle} toggleSideBar={this.toggleSideBar} open={this.state.sidebar}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { articles, session } = state
  const articlesData = articles.data
  return { articlesData, session }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchArticlesIfNeeded, updateArticle }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
