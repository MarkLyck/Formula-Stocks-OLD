import './ajax'
import ReactDOM from 'react-dom'
import Router from './Router'
import store from './store'

if (localStorage.getItem('authtoken')) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  store.session.set('authtoken', store.settings.anomToken)
  store.session.retrieve()
}

store.plans.fetch({
  success: (r) => {},
  error: (e) => {
    console.error('error: ', e);
  }
})

ReactDOM.render(Router, document.getElementById('container'))
