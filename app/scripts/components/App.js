import React from 'react'

import Header from './Header'


const App = React.createClass({
  render: function() {
    return (
      <div id="app">
        <Header/>
        {this.props.children}
      </div>
    )
  }
})

export default App
