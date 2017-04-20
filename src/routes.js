import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './Containers/App'

import Retail_Entry from './Containers/Retail/Index'
import Professional from './Containers/Pro/Index'
import SignUp from './Containers/Modals/SignUp/SignUp'
import SimpleSignUp from './Containers/Modals/SimpleSignUp/SignUp'
import Login from './Containers/Modals/Login/Login'
import FAQ from './Containers/Global/FAQ/FAQ'

import Articles from './Containers/Articles/Articles'

import Dashboard from './Containers/Dashboard/Index'
import Portfolio from './Containers/Dashboard/Portfolio/Portfolio'
import Suggestions from './Containers/Dashboard/Suggestions/Suggestions'
import MyAccount from './Containers/Dashboard/MyAccount/MyAccount'

import AdminPanel from './Containers/Dashboard/Admin/Panel'
import AdminAPI from './Containers/Dashboard/Admin/API'
import Users from './Containers/Dashboard/Admin/Users/Users'
import NewArticle from './Containers/Dashboard/Admin/NewArticle'
import NotFound from './Containers/Global/NotFound/NotFound'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Retail_Entry}/>
    <Route component={Retail_Entry}> <Route path="login" component={Login}/> </Route>
    <Route component={Retail_Entry}> <Route path="signup" component={SimpleSignUp}/> </Route>

    <Route path="/basic" component={Retail_Entry}>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SimpleSignUp}/>
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
      <Route path="trades" component={Suggestions}>
        <IndexRoute component={Suggestions}/>
        <Route path=":plan" component={Suggestions}/>
      </Route>
      <Route path="account" component={MyAccount}/>
      <Route path="articles*" component={Articles}/>
      <Route path="admin" component={AdminPanel}/>
      <Route path="admin/users" component={Users}/>
      <Route path="admin/api" component={AdminAPI}/>
      <Route path="admin/newarticle" component={NewArticle}/>
    </Route>
    <Route path="/articles*" component={Articles}/>
    <Route path="/faq" component={FAQ}/>
    <Route path="/*" component={NotFound}/>
  </Route>
)

export default routes
