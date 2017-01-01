import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import store from './store'

import HeroTest from './components/Home/Hero2.jsx'

import Home from './components/home/Home'
import Professional from './components/Professional/Home.jsx'

import SignUp2 from './components/Professional/Modals/SignUp/SignUp.jsx'

import Login from './components/home/Login'
import Signup from './components/home/Signup'
import FAQ from './components/home/faq'

import Dashboard from './components/dashboard/Dashboard'
import Portfolio from './components/dashboard/Portfolio'
import Suggestions from './components/dashboard/Suggestions'
import Articles from './components/dashboard/Articles'
import MyAccount from './components/dashboard/MyAccount'

import AdminPanel from './components/dashboard/AdminPanel'
import AdminAPI from './components/dashboard/AdminAPI'
import NewArticle from './components/dashboard/NewArticle2'

import NotFoundPage from './components/404'


const router = (
  <Router history={store.settings.history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Home}>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
    <Route path="/professional" component={Professional}>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SignUp2}/>
    </Route>
    <Route path="/faq" component={FAQ}/>
    <Route path="/hero2" component={HeroTest}/>
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
      <Route path="articles" component={Articles}>
        <IndexRoute component={Articles}/>
        <Route path=":article" component={Articles}/>
      </Route>
      <Route path="account" component={MyAccount}/>
      <Route path="admin" component={AdminPanel}/>
      <Route path="admin/api" component={AdminAPI}/>
      <Route path="admin/newarticle" component={NewArticle}/>
    </Route>
    <Route path="/*" component={NotFoundPage}/>
  </Router>
)

export default router
