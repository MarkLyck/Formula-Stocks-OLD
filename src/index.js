import './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
require('es6-promise').polyfill()
import 'isomorphic-fetch'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import Root from './components/Root'
// import reducers from './reducers'
// import Router from './Router'
import store from './store'

// let reduxStore = createStore(reducers)

if (localStorage.getItem('authtoken')) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  store.session.set('authtoken', store.settings.anomToken)
  store.session.retrieve()
}

// store.plans.fetch()

ReactDOM.render(<Root/>, document.getElementById('container'))
