import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'

const Plan = Backbone.Model.extend({
  defaults: {
    name: '',
    info: {
      roundtripTradesPerYear: 0,
      IITFormulas: 0,
    },
    stats: {
      cagr: 0,
      WLRatio: 0,
    },
    annualData: [],
    suggestions: [],
    portfolio: [],
    portfolioYields: []
  },
  getAnnualData() {
    $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/annual_${this.get('name')}.json`)
    .then((r) => {
      let data = JSON.parse(r)

      this.set('annualData', data.logs)

      let newStats = {}

      newStats.cagr = data.statistics.CAGR
      newStats.positives = data.statistics.positives
      newStats.negatives = data.statistics.negatives
      newStats.WLRatio = (100 - data.statistics.negatives/data.statistics.positives * 100)
      newStats.geometric_IRR = data.statistics.geometric_IRR
      newStats.total_return = data.statistics.total_return

      this.set('stats', newStats)
      store.plans.trigger('update')
    })
    .fail((e) => {
      console.error('Failed fetching annual data from server', e)
    })
  },
  getSuggestions() {
    $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/weekly_${this.get('name')}.json`)
      .then((response) => {
        let suggestions = JSON.parse(response)
        this.set('suggestions', suggestions.actionable)
        this.getStockInfo()
      })
  },
  parseStockData(data) {
    return data.filter((point) => {
      if (point[1] !== null && point[2] !== null && point[3] !== null) {
        return true
      }
    })
  },
  getStockInfo() {
    this.get('suggestions').forEach((suggestion, i) => {

      suggestion.ticker = suggestion.ticker.replace('.', '_')

      let query = `https://www.quandl.com/api/v1/datasets/WIKI/${suggestion.ticker}.json?api_key=${store.settings.quandlKey}`



      $.ajax({
        url: query,
      })
      .then((response) => {
        let suggestionToUpdate = this.get('suggestions')[i]
        suggestionToUpdate.data = this.parseStockData(response.data)

        let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
        this.set('suggestions', newArr)
        this.trigger('change')
      })
      .fail((e) => {
        query = `https://www.quandl.com/api/v1/datasets/GOOG/NASDAQ_${suggestion.ticker}.json?api_key=${store.settings.quandlKey}`
        $.ajax(query)
        .then((response) => {
          let suggestionToUpdate = this.get('suggestions')[i]
          suggestionToUpdate.data = this.parseStockData(response.data)

          let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
          this.set('suggestions', newArr)
          this.trigger('change')
        })
        .fail((error) => {
          query = `https://www.quandl.com/api/v1/datasets/GOOG/NYSE_${suggestion.ticker}.json?api_key=${store.settings.quandlKey}`
          $.ajax(query)
          .then((response) => {
            let suggestionToUpdate = this.get('suggestions')[i]
            suggestionToUpdate.data = this.parseStockData(response.data)

            let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
            this.set('suggestions', newArr)
            this.trigger('change')
          })
          .fail(() => {
            query = `https://www.quandl.com/api/v1/datasets/GOOG/AMEX_${suggestion.ticker}.json?api_key=${store.settings.quandlKey}`
            $.ajax(query)
            .then((response) => {
              let suggestionToUpdate = this.get('suggestions')[i]
              suggestionToUpdate.data = this.parseStockData(response.data)

              let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
              this.set('suggestions', newArr)
              this.trigger('change')
            })
            .fail(() => {
              query = `https://www.quandl.com/api/v1/datasets/YAHOO/TSX_${suggestion.ticker}.json?api_key=${store.settings.quandlKey}`
              $.ajax(query)
              .then((response) => {
                let suggestionToUpdate = this.get('suggestions')[i]
                suggestionToUpdate.data = this.parseStockData(response.data)

                let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
                this.set('suggestions', newArr)
                this.trigger('change')
              })
              .fail(() => {
                console.log('no data for: ', suggestion.ticker);
              })
            })
          })
        })

      })
    })
  },
  getPortfolio() {
    $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/monthly_${this.get('name')}.json`)
      .then((response) => {
        let data = JSON.parse(response)
        this.set('portfolio', data.portfolio)
        this.set('portfolioYields', data.logs)
      })
  },
})

export default Plan
