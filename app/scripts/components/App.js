import React from 'react'

import Header from './home/Header'
import Home from './home/Home'

import store from '../store'

const App = React.createClass({
  getInitialState() {
    return {showModal: true}
  },
  componentDidMount() {
    store.session.on('change', this.updateState)
  },
  updateState() {
    this.setState({showModal: store.session.get('showModal')})
  },
  render: function() {
    let modal;
    if(this.state.showModal) {
      <Modal>
        <TermsAndConditions/>
      </Modal>
    }
    return (
      <div id="app">
        <Header/>
        <Home/>
        {this.props.children}
      </div>
    )
  }
})

export default App
