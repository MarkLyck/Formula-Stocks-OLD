import React from 'react'

import store from '../../store'

const Article = React.createClass({
  getInitialState() {
    console.log(this.props.id);
    console.log(store.articles.data);

    return {article: store.articles.data.get(this.props.id)}
  },
  updateState() {
    console.log('updating state: ', store.articles.data.get(this.props.id));
    this.setState({article: store.articles.data.get(this.props.id)})
  },
  componentDidMount() {
    store.articles.data.fetch({success: this.updateState})
    store.articles.data.on('change update', this.updateState)
  },
  componentWillUnmount() {
    store.articles.data.off('update', this.updateState)
  },
  render() {
    console.log(this.state.article);
    console.log(store.articles.data.get(this.props.id));
    return (
      <div className="article">

      </div>
    )
  }
})

export default Article
