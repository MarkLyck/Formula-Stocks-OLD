import React from 'react'
import ReactDOM from 'react-dom'
require('es6-promise').polyfill()
import 'isomorphic-fetch'
import Root from './components/Root'

ReactDOM.render(<Root/>, document.getElementById('container'))
