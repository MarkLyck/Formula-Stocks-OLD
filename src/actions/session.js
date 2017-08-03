import _ from 'lodash'
import moment from 'moment'
import store from '../store'
import { browserHistory } from 'react-router'

export const FETCHING_SESSION = 'FETCHING_SESSION'
export const RECEIVE_SESSION = 'RECEIVE_SESSION'
export const SAW_SUGGESTIONS = 'SAW_SUGGESTIONS'
export const SET_SESSION_ITEM = 'SET_SESSION_ITEM'
export const UPDATE_USER = 'UPDATE_USER'
export const LOG_IN = 'LOG_IN'
export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const LOG_OUT = 'LOG_OUT'
export const SIGNING_UP = 'SIGNING_UP'
export const DONE_SIGNING_UP = 'DONE_SIGNING_UP'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION'
export const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION'

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
      .then(() => dispatch( updateUser() ))
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
    let newSession = _.omit(store.getState().session, ['isFetching', 'loginError', 'signupError', 'signingUp', 'error', 'debug', 'description'])
    if (moment(newSession.lastSeen).format('YYYYMMDD') < moment().format('YYYYMMDD')) { newSession.visits++ }
    newSession.lastSeen = new Date()

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
      .then(stripe => {
        if (!stripe.statusCode || stripe.statusCode === 200) {
          dispatch( setSessionItem('stripe', stripe))
          dispatch( signUp(stripe))
        } else {
          dispatch( signUpError('Payment failed'))
        }
      })

  }
}

function signUp(stripe) {
  return (dispatch) => {
    dispatch(signingUp())
    const newUser = _.omit(store.getState().session, ['isFetching', 'loginError', 'signupError', 'signingUp', 'error', 'debug', 'description'])
    if (localStorage.getItem('reference')) {
        newUser.reference = localStorage.getItem('reference');
    }
    console.log(newUser);
    console.log(localStorage);
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

export function doneSigningUp() { return { type: DONE_SIGNING_UP } }
export function signingUp() { return { type: SIGNING_UP } }

export function signUpError(error) { return { type: SIGN_UP_ERROR, error: error } }

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
          dispatch( updateUser() )
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

export function updateSubscription(planName, cycle) {
  return (dispatch) => {
    let updateHeaders = new Headers()
    const authToken = localStorage.getItem('authtoken')
    updateHeaders.append('Authorization', `Kinvey ${authToken}`)
    updateHeaders.append('Content-Type', `application/json`)

    const options = {
      method: 'POST',
      headers: updateHeaders,
      body: JSON.stringify({
        plan: (planName+'-'+cycle),
        subId: store.getState().session.stripe.subscriptions.data[0].id
      })
    }
    fetch(`https://baas.kinvey.com/rpc/${store.getState().settings.appKey}/custom/updatesub`, options)
      .then(response => response.json())
      .then(json => {
        let type = 0
        if (planName === 'entry')         { type = 1 }
        else if (planName === 'premium')  { type = 2 }
        else if (planName === 'business') { type = 3 }
        else if (planName === 'fund')     { type = 4 }
        setSessionItem('type', type)

        return json
      })
      .then(json => dispatch( { type: UPDATE_SUBSCRIPTION, subscription: json } ))
      .then(() => dispatch( updateUser()) )
  }
}

export function newSubscription(planName, cycle) {
  return (dispatch) => {
    let newSubHeaders = new Headers()
    const authToken = localStorage.getItem('authtoken')
    newSubHeaders.append('Authorization', `Kinvey ${authToken}`)
    newSubHeaders.append('Content-Type', `application/json`)

    const options = {
      method: 'POST',
      headers: newSubHeaders,
      body: JSON.stringify({
        plan: (planName+'-'+cycle),
        customer: store.getState().session.stripe.sources.data[0].customer
      })
    }
    fetch(`https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/newsub`, options)
      .then(response => response.json())
      .then(json => {
        let type = 0
        if (planName === 'entry')         { type = 1 }
        else if (planName === 'premium')  { type = 2 }
        else if (planName === 'business') { type = 3 }
        else if (planName === 'fund')     { type = 4 }
        setSessionItem('type', type)

        return json
      })
      .then(json => dispatch( { type: UPDATE_SUBSCRIPTION, subscription: json } ))
      .then(() => dispatch( updateUser()) )
  }
}
