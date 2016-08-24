import $ from 'jquery'
import ajax from './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'

import Visit from './models/Visit'


if (localStorage.getItem('authtoken')) {
  // console.log('setting authtoken on store');
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  // console.log('setting anon token');
  store.session.set('authtoken', store.settings.anomToken)
  store.session.retrieve()
  // let visit = new Visit()
  // visit.getData()
}

store.plans.fetch({
  success: (r) => {
    // console.log(r);
  },
  error: (e) => {
    console.error('error: ', e);
  }
})





ReactDOM.render(router, document.getElementById('container'))
