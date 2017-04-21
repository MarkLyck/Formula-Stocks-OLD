import platform from 'platform'
import moment from 'moment'
import store, { anomToken } from '../store'

export const RECEIVE_SINGLE_VISIT = 'RECEIVE_SINGLE_VISIT'
export const RECEIVE_VISITS = 'RECEIVE_VISITS'
export const FETCHING_VISITS = 'FETCHING_VISITS'
export const RECEIVE_VISITS_COUNT = 'RECEIVE_VISITS_COUNT'

export function createVisitIfNeeded() {
  return (dispatch) => { if (!localStorage.getItem('authtoken') && !localStorage.getItem('visit_ID')) { dispatch(getLocation()) } }
}

function getLocation() {
  return (dispatch) => {
    fetch('https://freegeoip.net/json/')
    .then( (response) => response.json() )
    .then( (json) => dispatch(createVisit(json)) )
  }
}

function createVisit(locationData = {}) {
  return (dispatch) => {
    let visitHeaders = new Headers()
    let authToken = store.getState().settings.anomToken
    visitHeaders.append('Authorization', `Kinvey ${authToken}`)
    visitHeaders.append('Content-Type', `application/json`)

    const visit = {
      device: '',
      os: platform.os.family,
      product: platform.product,
      browser: platform.name,
      ip: locationData.ip,
      location: locationData,
      referer: document.referrer
    }

    const options = { method: 'POST', headers: visitHeaders, body: JSON.stringify(visit) }
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`, options)
      .then( (response) => response.json() )
      .then( (json) => dispatch(receiveSingleVisit(json)) )
  }
}

function receiveSingleVisit(visit) { return { type: RECEIVE_SINGLE_VISIT, visit: visit } }

export function fetchVisits() {
  return (dispatch) => {
    dispatch(fetchingVisits())

    let visitsHeaders = new Headers()
    let authToken = localStorage.getItem('authToken') || anomToken
    visitsHeaders.append('Authorization', `Kinvey ${authToken}`)
    visitsHeaders.append('Content-Type', `application/json`)
    const options = { method: 'GET', headers: visitsHeaders }

    // Fetches all visits that's newer than 1 month
    const query = `{"_kmd.ect":{"$gte": "${moment().subtract(1, 'months').format('YYYY-MM-DD')}T00:00:00.000Z"}}&sort={"_kmd.ect": 1}`
    fetch(`https://baas.kinvey.com/appdata/${store.getState().settings.appKey}/visits?query=${query}`, options)
      .then( (response) => response.json() )
      .then( (json) => dispatch(receiveVisits(json)) )
  }
}
function fetchingVisits() { return { type: FETCHING_VISITS } }
function receiveVisits(visits) { return { type: RECEIVE_VISITS, visits: visits } }

export function fetchVisitsCount() {
  return (dispatch) => {
    let visitsHeaders = new Headers()
    let authToken = localStorage.getItem('authToken') || anomToken
    visitsHeaders.append('Authorization', `Kinvey ${authToken}`)
    visitsHeaders.append('Content-Type', `application/json`)
    const options = { method: 'GET', headers: visitsHeaders }

    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits/_count`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveVisitsCount(json)))
  }
}
function receiveVisitsCount(json) { return { type: RECEIVE_VISITS_COUNT, data: json } }
