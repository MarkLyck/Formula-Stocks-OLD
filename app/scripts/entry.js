import $ from 'jquery'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'
import ajax from './ajax'

if (localStorage.authtoken) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
}

// $.ajax('https://freegeoip.net/json/')
// .then((r) => {
//   console.log(r)
// })

ReactDOM.render(router, document.getElementById('container'))
