import Lockr from 'lockr'
import moment from 'moment'
import store from '../rstore'
export const RECEIVE_HISTORIC_STOCK_DATA = 'RECEIVE_HISTORIC_STOCK_DATA'
export const HISTORIC_DATA_ALREADY_EXISTS = 'HISTORIC_DATA_ALREADY_EXISTS'


export function fetchHistoricStockDataIfNeeded(ticker, index, limit) {
  let stocks = Lockr.get('stocks')
  return (dispatch) => {
    let foundData = false
    if (stocks[ticker]) {
      if (moment(stocks[ticker].date).format('DDMMYYYY') === moment().format('DDMMYYYY') && stocks[ticker].data) {
        if (stocks[ticker].data.length >= limit) {
          foundData = true
          dispatch({ type: HISTORIC_DATA_ALREADY_EXISTS, ticker: ticker })
        }
      }
    }
    if (!foundData) { dispatch(fetchHistoricStockData(ticker, index, limit)) }
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
