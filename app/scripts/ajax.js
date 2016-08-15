import $ from 'jquery'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  // console.log(jqueryAjax);
  if (jqueryAjax.url.indexOf('kinvey') !== -1 && jqueryAjax.url.indexOf('charge') === -1) {
    if (store.session.get('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
    }
  }
})
