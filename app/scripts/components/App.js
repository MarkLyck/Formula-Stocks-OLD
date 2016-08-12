import React from 'react'

import Header from './home/Header'
import Home from './home/Home'


const App = React.createClass({
  render: function() {
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
