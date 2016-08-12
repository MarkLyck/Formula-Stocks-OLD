import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import store from './store'

import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const router = (
  <Router history={store.settings.history}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
    </Route>
  </Router>
)

export default router
