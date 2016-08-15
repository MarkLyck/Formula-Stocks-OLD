import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import store from './store'

import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'

import Dashboard from './components/dashboard/Dashboard'
import Portfolio from './components/dashboard/Portfolio'
import Suggestions from './components/dashboard/Suggestions'

const router = (
  <Router history={store.settings.history}>
    <Route path="/" component={Home}>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
    <Route path="/dashboard" component={Dashboard}>
      <Route path="/portfolio/:plan" component={Portfolio}/>
      <Route path="/suggestions/:plan" component={Suggestions}/>
    </Route>
  </Router>
)

export default router
