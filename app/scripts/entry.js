import $ from 'jquery'
import ajax from './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'

import Visit from './models/Visit'


if (localStorage.getItem('authtoken')) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  store.session.set('authtoken', store.settings.anomToken)
  store.session.retrieve()
}

store.plans.fetch({
  success: (r) => {
  },
  error: (e) => {
    console.error('error: ', e);
  }
})

ReactDOM.render(router, document.getElementById('container'))
