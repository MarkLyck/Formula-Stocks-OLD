import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import store from './store'

import Retail from './Containers/Retail/Index'
import Professional from './Containers/Pro/Index'
import SignUp from './Containers/Modals/SignUp/SignUp'
import Login from './Containers/Modals/Login/Login'
import FAQ from './Containers/Global/FAQ/FAQ'

import Articles from './Containers/Articles/Articles'

import Dashboard from './Containers/Dashboard/Index'
import Portfolio from './Containers/Dashboard/Portfolio/Portfolio'
import Suggestions from './Containers/Dashboard/Suggestions/Suggestions'
import MyAccount from './Containers/Dashboard/MyAccount/MyAccount'

import AdminPanel from './Containers/Dashboard/Admin/Panel'
import AdminAPI from './Containers/Dashboard/Admin/API'
import Users from './Containers/Dashboard/Admin/Users'
import NewArticle from './Containers/Dashboard/Admin/NewArticle'
import NotFound from './Containers/Global/NotFound/NotFound'

const router = (
  <Router history={store.settings.history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Retail}>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SignUp}/>
    </Route>
    <Route path="/pro" component={Professional}>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SignUp}/>
    </Route>
    <Route path="/dashboard" component={Dashboard}>
      <IndexRoute component={Portfolio}/>
      <Route path="portfolio" component={Portfolio}>
        <IndexRoute component={Portfolio}/>
        <Route path=":plan" component={Portfolio}/>
      </Route>
      <Route path="suggestions" component={Suggestions}>
        <IndexRoute component={Suggestions}/>
        <Route path=":plan" component={Suggestions}/>
      </Route>
      <Route path="account" component={MyAccount}/>
      <Route path="admin" component={AdminPanel}/>
      <Route path="admin/users" component={Users}/>
      <Route path="admin/api" component={AdminAPI}/>
      <Route path="admin/newarticle" component={NewArticle}/>
    </Route>
    <Route path="/articles*" component={Articles}/>
    <Route path="/faq" component={FAQ}/>
    <Route path="/*" component={NotFound}/>
  </Router>
)

export default router
