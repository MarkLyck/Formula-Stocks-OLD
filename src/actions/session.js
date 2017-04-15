import store, { anomToken } from '../rstore'
import { browserHistory } from 'react-router'

export const FETCHING_SESSION = 'FETCHING_SESSION'
export const RECEIVE_SESSION = 'RECEIVE_SESSION'
export const SAW_SUGGESTIONS = 'SAW_SUGGESTIONS'
export const UPDATE_USER = 'UPDATE_USER'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const SIGN_UP = 'SIGN_UP'

function fetchingSession() { return { type: FETCHING_SESSION } }
export function fetchSession() {
  return (dispatch) => {
    dispatch(fetchingSession())

    let sessionHeaders = new Headers()
    let authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : anomToken
    sessionHeaders.append('Authorization', `Kinvey ${authToken}`)
    sessionHeaders.append('Content-Type', `application/json`)

    const options = { method: 'GET', headers: sessionHeaders }
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

export function updateUser() {
  // FIXME this should actually update the user obj on Kinvery
  return { type: UPDATE_USER }
}

export function sawSuggestions() {
  return (dispatch) => {
    dispatch({ type: SAW_SUGGESTIONS, time: new Date() })
    dispatch(updateUser())
  }
}

export function signUp(username, password) {
  return (dispatch) => {
    const signUpHeaders = new Headers()
    signUpHeaders.append('Authorization', `Basic ${store.getState().settings.basicAuth}`)
    signUpHeaders.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: signUpHeaders,
      body: JSON.stringify({ username: username, password: password })
    }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}`, options)
      .then(response => response.json())
      .then(json => dispatch(dispatch({ type: SIGN_UP, data: json }) ))
  }
}

export function logIn(username, password) {
  return (dispatch) => {
    const logInHeaders = new Headers()
    logInHeaders.append('Authorization', `Basic ${store.getState().settings.basicAuth}`)
    logInHeaders.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: logInHeaders,
      body: JSON.stringify({ username: username, password: password })
    }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/login`, options)
      .then(response => response.json())
      .then(json => dispatch(dispatch({ type: LOG_IN, data: json }) ))
      .then(() => browserHistory.push('/dashboard'))
  }
}

export function logOut() {
  return (dispatch) => {
    let logOutHeaders = new Headers()
    const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : anomToken
    logOutHeaders.append('Authorization', `Kinvey ${authToken}`)
    logOutHeaders.append('Content-Type', `application/json`)
    const options = { method: 'POST', headers: logOutHeaders }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/_logout`, options)
      .then(response => dispatch(dispatch({ type: LOG_OUT }) ))
      .then(() => browserHistory.push('/'))
  }
}
