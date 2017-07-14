export const FETCHING_DJIA = 'FETCHING_DJIA'
export const RECEIVE_DJIA = 'RECEIVE_DJIA'
export const FETCHING_SP500 = 'FETCHING_SP500'
export const RECEIVE_SP500 = 'RECEIVE_SP500'

export function fetchDJIA() {
  return (dispatch) => {
    dispatch(fetchingDJIA())
    fetch(`https://www.quandl.com/api/v3/datasets/EOD/DIA.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=2009-01-01&collapse=monthly&column_index=4`)
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
    data: json.dataset.data
  }
}

export function fetchSP500(startTrim = '1970-01-01') {
  return (dispatch) => {
    dispatch(fetchingSP500())
    fetch(`https://www.quandl.com/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?api_key=zP2W-4snDLyygfZVpw2v&start_date=${startTrim}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSP500(json, startTrim)))
  }
}
function fetchingSP500() {
  return { type: FETCHING_SP500 }
}
function receiveSP500(json, startTrim) {
  return {
    type: RECEIVE_SP500,
    data: json.dataset.data,
    startTrim: startTrim
  }
}
