import $ from 'jquery'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1 && jqueryAjax.url.indexOf('charge') === -1) {

    if (store.session.get('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
    } else {
      if (jqueryAjax.url.indexOf('api') === -1) {
        xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
      } else {
        console.log('api intercept', jqueryAjax.url);
        console.log('auth: ', `Kinvey ${store.settings.anomToken}`);
        xhrAjax.setRequestHeader('Authorization:', `Kinvey ${store.settings.anomToken}`)
      }
    }

  }
})
