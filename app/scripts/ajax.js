import $ from 'jquery'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1) {
    console.log(store.session.toJSON());
    if (store.session.get('authtoken') && store.session.get('username') !== 'anom') {
      console.log('logged in user auth');
      if (jqueryAjax.url.indexOf('user') > -1 && jqueryAjax.url.indexOf('/_me') === -1) {
        xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
      } else {
        xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
      }
    } else {
      if (jqueryAjax.url.indexOf('api') === -1 && jqueryAjax.url.indexOf('charge') === -1) {
        console.log('basic auth');
        xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
      } else {
        console.log('anom kinvey auth');
        xhrAjax.setRequestHeader('Authorization:', `Kinvey ${store.session.get('authtoken')}`)
      }
    }

  }
})
