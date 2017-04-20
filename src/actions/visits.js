import platform from 'platform'
import moment from 'moment'
import store from '../rstore'

export const RECEIVE_SINGLE_VISIT = 'RECEIVE_SINGLE_VISIT'
export const RECEIVE_VISITS = 'RECEIVE_VISITS'

export function createVisitIfNeeded() {
  return (dispatch) => { if (!localStorage.getItem('authtoken')) { dispatch(getLocation()) } }
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
    fetch(`https://baas.kinvey.com/${store.getState().settings.appKey}/visits`, options)
      .then( (response) => response.json() )
      .then( (json) => dispatch(receiveSingleVisit(json)) )
  }
}

function receiveSingleVisit(visit) { return { type: RECEIVE_SINGLE_VISIT, visit: visit } }

export function fetchVisits() {
  return (dispatch) => {
    let visitsHeaders = new Headers()
    let authToken = localStorage.getItem('authToken')
    visitsHeaders.append('Authorization', `Kinvey ${authToken}`)
    visitsHeaders.append('Content-Type', `application/json`)
    const options = { method: 'GET', headers: visitsHeaders }

    // Fetches all visits that's newer than 1 month
    const query = `{"_kmd.ect":{"$gte": "${moment().subtract(1, 'months').format('YYYY-MM-DD')}T00:00:00.000Z"}}&sort={"_kmd.ect": 1}`
    fetch(`https://baas.kinvey.com/${store.getState().settings.appKey}/visits?query=${query}`, options)
      .then( (response) => response.json() )
      .then( (json) => dispatch(receiveVisits(json)) )
  }
}

function receiveVisits(visits) { return { type: RECEIVE_VISITS, visits: visits } }
