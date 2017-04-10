export const FETCHING_SESSION = 'FETCHING_SESSION'
export const RECEIVE_SESSION = 'RECEIVE_SESSION'
import store from '../rstore';

function fetchingSession() { return { type: FETCHING_SESSION } }
export function fetchSession() {
  return (dispatch) => {
    dispatch(fetchingSession())
    let sessionHeaders = new Headers();
    let authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : store.getState().settings.anomToken
    sessionHeaders.append('Authorization', `Kinvey ${authToken}`)
    var options = { method: 'GET', headers: sessionHeaders }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/_me`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveSession(json)))
  }
}
function receiveSession(json) {
  return {
    type: RECEIVE_SESSION,
    data: json
  }
}
