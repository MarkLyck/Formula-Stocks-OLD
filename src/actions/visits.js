import platform from 'platform'
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
function receiveVisits(visits) { return { type: RECEIVE_VISITS, visits: visits } }
