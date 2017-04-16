import _ from 'lodash'
import store from '../rstore'
import { browserHistory } from 'react-router'

export const FETCHING_SESSION = 'FETCHING_SESSION'
export const RECEIVE_SESSION = 'RECEIVE_SESSION'
export const SAW_SUGGESTIONS = 'SAW_SUGGESTIONS'
export const SET_SESSION_ITEM = 'SET_SESSION_ITEM'
export const UPDATE_USER = 'UPDATE_USER'
export const LOG_IN = 'LOG_IN'
export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const LOG_OUT = 'LOG_OUT'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION'

function fetchingSession() { return { type: FETCHING_SESSION } }
export function fetchSession() {
  return (dispatch) => {
    dispatch(fetchingSession())

    let sessionHeaders = new Headers()
    let authToken = localStorage.getItem('authtoken')
    sessionHeaders.append('Authorization', `Kinvey ${authToken}`)
    sessionHeaders.append('Content-Type', `application/json`)

    const options = { method: 'GET', headers: sessionHeaders }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/_me`, options)
      .then(response => response.json())
      .then(json => dispatch( receiveSession(json) ))
  }
}
function receiveSession(json) {
  return (dispatch) => dispatch({ type: RECEIVE_SESSION, data: json })
}

export function setSessionItem(key, value) {
  return { type: SET_SESSION_ITEM, key: key, value: value }
}

export function updateUser() {
  return (dispatch) => {
    let newSession = _.omit(store.getState().session, ['isFetching', 'loginError', 'signupError'])

    console.log('update user', newSession)

    let sessionHeaders = new Headers()
    let authToken = localStorage.getItem('authtoken')
    sessionHeaders.append('Authorization', `Kinvey ${authToken}`)
    sessionHeaders.append('Content-Type', `application/json`)
    const options = { method: 'PUT', headers: sessionHeaders, body: JSON.stringify(newSession) }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/${newSession._id}`, options)
      .then(response => response.json())
      .then(json => dispatch( receiveSession(json) ))
  }
}

export function sawSuggestions() {
  return (dispatch) => {
    dispatch({ type: SAW_SUGGESTIONS, time: new Date() })
    dispatch(updateUser())
  }
}

export function createCustomer(token, planName, cycle, taxPercent, coupon) {
  return (dispatch) => {

    let data = {
      plan: (planName+'-'+cycle.trim()),
      source: token,
      email: store.getState().session.email,
      tax_percent: taxPercent
    }

    const serverHeaders = new Headers()
    serverHeaders.append('Content-Type', `application/json`)
    const options = { method: 'POST', headers: serverHeaders, body: JSON.stringify(data) }
    fetch(`https://h8pzebl60b.execute-api.us-west-2.amazonaws.com/prod/createCustomer`, options)
      .then(response => response.json())
      .then(stripe => dispatch( setSessionItem('stripe', stripe)) )
      .then(stripe => dispatch( signUp()) )
  }
}

function signUp(stripe) {
  return (dispatch) => {
    const newUser = _.omit(store.getState().session, ['isFetching', 'loginError', 'signupError'])

    const signUpHeaders = new Headers()
    signUpHeaders.append('Authorization', `Basic ${store.getState().settings.basicAuth}`)
    signUpHeaders.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: signUpHeaders,
      body: JSON.stringify(newUser)
    }

    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}`, options)
      .then(response => response.json())
      .then(json => {
        if (!json.statusCode || json.statusCode === 200) {
          localStorage.setItem('authtoken', json._kmd.authtoken)
          browserHistory.push('/dashboard')
          dispatch(receiveSession(json))
        } else {
          dispatch(signUpError(json.message))
        }
      })
  }
}

export function signUpError(error) {
  return { type: SIGN_UP_ERROR, error: error }
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
      .then(json => {
        if (!json.error) {
          dispatch({ type: LOG_IN, data: json })
          browserHistory.push('/dashboard')
        } else {
          dispatch(logInError(json.error))
        }
      })
  }
}

export function logInError(error) {
  if (error === 'InvalidCredentials') { error = 'Invalid login' }
  return { type: LOG_IN_ERROR, error: error }
}

export function logOut() {
  return (dispatch) => {
    let logOutHeaders = new Headers()
    const authToken = localStorage.getItem('authtoken')
    logOutHeaders.append('Authorization', `Kinvey ${authToken}`)
    logOutHeaders.append('Content-Type', `application/json`)
    const options = { method: 'POST', headers: logOutHeaders }
    fetch(`https://baas.kinvey.com/user/${store.getState().settings.appKey}/_logout`, options)
      .then(response => dispatch(dispatch({ type: LOG_OUT }) ))
      .then(() => browserHistory.push('/'))
  }
}

export function cancelSubscription() {
  return (dispatch) => {
    let cancelHeaders = new Headers()
    const authToken = localStorage.getItem('authtoken')
    cancelHeaders.append('Authorization', `Kinvey ${authToken}`)
    cancelHeaders.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: cancelHeaders,
      body: JSON.stringify({ subId: store.getState().session.stripe.subscriptions.data[0].id })
    }
    fetch(`https://baas.kinvey.com/rpc/${store.getState().settings.appKey}/custom/cancelsub`, options)
      .then(response => response.json())
      .then(json => dispatch( { type: CANCEL_SUBSCRIPTION, subscription: json } ))
      .then(() => dispatch(updateUser()) )
  }
}
