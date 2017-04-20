import './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
require('es6-promise').polyfill()
import 'isomorphic-fetch'
import Root from './components/Root'
// import store from './OLD_store'

// if (localStorage.getItem('authtoken')) {
//   store.session.set('authtoken', localStorage.authtoken)
//   // store.session.retrieve()
// } else {
//   store.session.set('authtoken', store.settings.anomToken)
//   // store.session.retrieve()
// }

ReactDOM.render(<Root/>, document.getElementById('container'))
