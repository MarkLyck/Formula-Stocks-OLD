export const FETCHING_DJIA = 'FETCHING_DJIA'
export const RECEIVE_DJIA = 'RECEIVE_DJIA'
export const FETCHING_SP500 = 'FETCHING_SP500'
export const RECEIVE_SP500 = 'RECEIVE_SP500'

export function fetchDJIA() {
  return (dispatch) => {
    dispatch(fetchingDJIA())
    fetch(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_DJI.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
      .then(response => response.json())
      .then(json => dispatch(receiveDJIA(json)))
  }
}
function fetchingDJIA() {
  return { type: FETCHING_DJIA }
}
function receiveDJIA(json) {
  return {
    type: RECEIVE_DJIA,
    data: json
  }
}

export function fetchSP500() {
  return (dispatch) => {
    dispatch(fetchingSP500())
    fetch(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?trim_start=1970-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
      .then(response => response.json())
      .then(json => dispatch(receiveSP500(json)))
  }
}
function fetchingSP500() {
  return { type: FETCHING_SP500 }
}
function receiveSP500(json) {
  return {
    type: RECEIVE_SP500,
    data: json
  }
}
