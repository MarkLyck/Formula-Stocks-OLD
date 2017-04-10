import store from '../rstore'
export const FETCHING_PLAN = 'FETCHING_PLAN'
export const RECEIVE_PLAN = 'RECEIVE_PLAN'
export const RECEIVE_HISTORIC_STOCK_DATA = 'RECEIVE_HISTORIC_STOCK_DATA'
export const SELECT_NEW_PLAN = 'SELECT_NEW_PLAN'


export function fetchPlanIfNeeded(plan) {
  return (dispatch) => {
    if (window.location.pathname.indexOf('dashboard') > -1) {
      if (store.getState().plans.data[plan]) {
        if (store.getState().plans.data[plan].suggestions.length && store.getState().plans.data[plan].portfolio.length) {
          dispatch({ type: "PLAN_ALREADY_EXISTS" })
          return false
        }
      }
      dispatch(fetchPlan(plan, 'private'))
    } else {
      if (store.getState().plans.data[plan]) {
        dispatch({ type: "PLAN_ALREADY_EXISTS" })
        return false
      }
      dispatch(fetchPlan(plan, 'public'))
    }
  }
}
export function fetchPlan(plan, type) {
  return (dispatch) => {
    dispatch(fetchingPlan(plan))
    fetch(`https://formulastocks-server.tk:3001/${type}/${plan}`)
      .then(response => response.json())
      .then(json => dispatch(receivePlan(plan, json)))
  }
}
function fetchingPlan(plan) { return { type: FETCHING_PLAN, plan } }
function receivePlan(plan, json) {
  return {
    type: RECEIVE_PLAN,
    plan: plan,
    data: json
  }
}

export function fetchHistoricStockData(ticker, index, limit) {
  ticker = ticker.replace('.', '_')
  return (dispatch) => {
    fetch(`https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=${store.getState().settings.quandlKey}&column_index=4${limit ? '&limit=' + limit : ''}`)
      .then(response => response.json())
      .then(json => dispatch(receiveHistoricData(ticker, index, json)))
  }
}

function receiveHistoricData(ticker, index, json) {
  return {
    type: RECEIVE_HISTORIC_STOCK_DATA,
    index: index,
    ticker: ticker,
    data: json
  }
}


export function selectNewPlan(plan) {
  return (dispatch) => {
    dispatch(fetchPlanIfNeeded(plan))
    dispatch({ type: SELECT_NEW_PLAN, plan: plan })
  }
}
