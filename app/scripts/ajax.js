import $ from 'jquery'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  // console.log(jqueryAjax.url);
  if (jqueryAjax.url.indexOf('kinvey') !== -1 && jqueryAjax.url.indexOf('blob') === -1) {
    if (store.session.get('authtoken')) {
        if (jqueryAjax.url.indexOf('user') > -1
          && jqueryAjax.type === 'POST'
          && jqueryAjax.url.indexOf('custom') === -1
          && jqueryAjax.url.indexOf('logout') === -1) {
          // console.log('basic auth');
          xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
        } else {
          // console.log('kinvey auth');
          xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
        }
    } else {
      // xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
    }
  }
})
