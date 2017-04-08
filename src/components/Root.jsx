import React from 'react'
import store from '../rstore'
import routes from '../routes'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

export default () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)
