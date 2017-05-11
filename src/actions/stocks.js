import Lockr from 'lockr'
import moment from 'moment'
import store from '../store'
export const RECEIVE_HISTORIC_STOCK_DATA = 'RECEIVE_HISTORIC_STOCK_DATA'
export const HISTORIC_DATA_ALREADY_EXISTS = 'HISTORIC_DATA_ALREADY_EXISTS'
export const INVALID_QUANDL_CODE = 'INVALID_QUANDL_CODE'
export const RECEIVE_LAST_PRICE = 'RECEIVE_LAST_PRICE'
export const LAST_PRICE_ALREADY_EXISTS = 'LAST_PRICE_ALREADY_EXISTS'
export const RECEIVE_REALTIME_QUOTE = 'RECEIVE_REALTIME_QUOTE'
export const RECEIVE_ALL_REALTIME_QUOTES = 'RECEIVE_ALL_REALTIME_QUOTES'

export function fetchHistoricStockDataIfNeeded(ticker, limit) {
  let stocks = Lockr.get('stocks')
  return (dispatch) => {
    let shouldFetch = true
    if (stocks[ticker]) {
      if (moment(stocks[ticker].date).format('DDMMYYYY') === moment().format('DDMMYYYY') && stocks[ticker].data) {
        if (stocks[ticker].data.length >= limit) {
          if (Number(stocks[ticker].data[0][0].split('-').join('')) > Number(moment(stocks[ticker].date).format('YYYYMMDD') - 1) ) {
            shouldFetch = false
            dispatch({ type: HISTORIC_DATA_ALREADY_EXISTS, ticker: ticker })
          }
        }
      } else if (stocks[ticker].fetchFailed) {
        shouldFetch = false
        dispatch({ type: INVALID_QUANDL_CODE, ticker: ticker })
      }
    }
    console.log('should fetch historic data, ', shouldFetch)
    if (shouldFetch) { dispatch(fetchHistoricStockData(ticker, limit)) }
  }
}

export function fetchHistoricStockData(ticker, limit) {
  console.log('fetch historic');
  ticker = ticker.replace('.', '_')
  return (dispatch) => {
    fetch(`https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=${store.getState().settings.quandlKey}&column_index=4${limit ? '&limit=' + limit : ''}`)
      .then(response => response.json())
      .then(json => dispatch(receiveHistoricData(ticker, json)))
  }
}

function receiveHistoricData(ticker, json) {
  return {
    type: RECEIVE_HISTORIC_STOCK_DATA,
    ticker: ticker,
    data: json
  }
}

export function fetchLastPriceIfNeeded(ticker) {
  let stocks = Lockr.get('stocks')
  return (dispatch) => {
    if (stocks[ticker]) {
      if (moment(stocks[ticker].date).format('YYYYMMDD') === moment().format('YYYYMMDD') && stocks[ticker].newPrice) {
        dispatch({ type: LAST_PRICE_ALREADY_EXISTS, ticker: ticker })
      } else if (stocks[ticker].fetchFailed) {
        dispatch({ type: INVALID_QUANDL_CODE, ticker: ticker })
      } else { dispatch(fetchLastPrice(ticker)) }
    } else { dispatch(fetchLastPrice(ticker)) }
  }
}

export function fetchLastPrice(ticker) {
  ticker = ticker.replace('.', '_')
  return (dispatch) => {
    fetch(`https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=${store.getState().settings.quandlKey}&column_index=4&limit=1`)
      .then(response => response.json())
      .then(json => dispatch(receiveLastPrice(ticker, json)))
  }
}

function receiveLastPrice(ticker, json) {
  return {
    type: RECEIVE_LAST_PRICE,
    ticker: ticker,
    data: json
  }
}

export function receiveRealTimeQuote(quote) {
  return {
    type: RECEIVE_REALTIME_QUOTE,
    ticker: quote.ticker,
    price: quote.price
  }
}
export function receiveAllRealTimeQuotes(quotes) {
  return {
    type: RECEIVE_ALL_REALTIME_QUOTES,
    quotes: quotes
  }
}
