import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import store from './store'

// import App from './components/App'

import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'

const router = (
  <Router history={store.settings.history}>
    <Route path="/" component={Home}>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
  </Router>
)

export default router
