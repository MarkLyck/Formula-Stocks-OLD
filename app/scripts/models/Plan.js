import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

import store from '../store'

const Plan = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/api`,
  defaults: {
    name: '',
    info: {
      roundtripTradesPerYear: 0,
      IITFormulas: 0,
    },
    stats: {
      CAGR: 0,
      WLRatio: 0,
    },
    annualData: [],
    suggestions: [],
    portfolio: [],
    portfolioYields: []
  },
  updateData(fileArr) {
    let receivedJSON = (i, e) => {
      let lines = e.target.result;
      var data = JSON.parse(lines);
      if (fileArr[i].name.indexOf('weekly') > -1) {
        let newSuggestions = this.get('suggestions').filter((sug) => {
          if (sug.action === "SELL") {
            return true
          }
        })
        newSuggestions = _.union(data.actionable, newSuggestions)
        this.set('suggestions', newSuggestions)
      } else if (fileArr[i].name.indexOf('monthly') > -1) {
        let newSuggestions = this.get('suggestions').filter((sug) => {
          if (sug.action === "BUY") {
            return true
          }
        })
        newSuggestions = _.union(newSuggestions, data.actionable)
        this.set('suggestions', newSuggestions)
        this.set('portfolio', data.portfolio)
        this.set('portfolioYields', data.logs)
      } else if (fileArr[i].name.indexOf('annual') > -1) {
        this.set('annualData', data.logs)
        let newStats = data.statistics
        newStats.WLRatio = (100 - data.statistics.negatives/data.statistics.positives * 100)
        let oldStats = this.get('stats')
        let stats = _.extend({}, oldStats, newStats)
        this.set('stats', stats)
      }
      console.log('saving file');
      this.save()
    }

    fileArr.forEach((file, i) => {
      let fr = new FileReader();
      fr.onload = receivedJSON.bind(null, i);
      fr.readAsText(file);
    })
  },
  // getAnnualData() {
  //   $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/annual_${this.get('name')}.json`)
  //   .then((r) => {
  //     let data = JSON.parse(r)
  //
  //     this.set('annualData', data.logs)
  //
  //     let newStats = {}
  //
  //     newStats.cagr = data.statistics.CAGR
  //     newStats.positives = data.statistics.positives
  //     newStats.negatives = data.statistics.negatives
  //     newStats.WLRatio = (100 - data.statistics.negatives/data.statistics.positives * 100)
  //     newStats.geometric_IRR = data.statistics.geometric_IRR
  //     newStats.total_return = data.statistics.total_return
  //
  //     this.set('stats', newStats)
  //     store.plans.trigger('update')
  //   })
  //   .fail((e) => {
  //     console.error('Failed fetching annual data from server', e)
  //   })
  // },
  // getSuggestions() {
  //   $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/weekly_${this.get('name')}.json`)
  //     .then((response) => {
  //       let suggestions = JSON.parse(response)
  //       this.set('suggestions', suggestions.actionable)
  //       this.get('suggestions').forEach((suggestion, i) => {
  //         this.getStockInfo(suggestion.ticker, i)
  //       })
  //       this.getPortfolio()
  //       this.getAnnualData()
  //     })
  // },
  parseStockData(data) {
    return data.filter((point) => {
      if (point[1] !== null && point[2] !== null && point[3] !== null) {
        return true
      }
    })
  },
  getStockInfo(ticker, i) {

    ticker = ticker.replace('.', '_')
    let query = `https://www.quandl.com/api/v1/datasets/WIKI/${ticker}.json?api_key=${store.settings.quandlKey}`
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
      query = `https://www.quandl.com/api/v1/datasets/GOOG/NASDAQ_${ticker}.json?api_key=${store.settings.quandlKey}`
      $.ajax(query)
      .then((response) => {
        let suggestionToUpdate = this.get('suggestions')[i]
        suggestionToUpdate.data = this.parseStockData(response.data)

        let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
        this.set('suggestions', newArr)
        this.trigger('change')
      })
      .fail((error) => {
        query = `https://www.quandl.com/api/v1/datasets/GOOG/NYSE_${ticker}.json?api_key=${store.settings.quandlKey}`
        $.ajax(query)
        .then((response) => {
          let suggestionToUpdate = this.get('suggestions')[i]
          suggestionToUpdate.data = this.parseStockData(response.data)

          let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
          this.set('suggestions', newArr)
          this.trigger('change')
        })
        .fail(() => {
          query = `https://www.quandl.com/api/v1/datasets/GOOG/AMEX_${ticker}.json?api_key=${store.settings.quandlKey}`
          $.ajax(query)
          .then((response) => {
            let suggestionToUpdate = this.get('suggestions')[i]
            suggestionToUpdate.data = this.parseStockData(response.data)

            let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
            this.set('suggestions', newArr)
            this.trigger('change')
          })
          .fail(() => {
            query = `https://www.quandl.com/api/v1/datasets/YAHOO/TSX_${ticker}.json?api_key=${store.settings.quandlKey}`
            $.ajax(query)
            .then((response) => {
              let suggestionToUpdate = this.get('suggestions')[i]
              suggestionToUpdate.data = this.parseStockData(response.data)

              let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
              this.set('suggestions', newArr)
              this.trigger('change')
            })
            .fail(() => {
              console.log('no data for: ', ticker);
            })
          })
        })
      })
    })
  },
  // getPortfolio() {
  //   $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/monthly_${this.get('name')}.json`)
  //     .then((response) => {
  //
  //       let data = JSON.parse(response)
  //       this.set('portfolio', data.portfolio)
  //       this.set('portfolioYields', data.logs)
  //
  //       data.actionable.forEach((suggestion) => {
  //         let newSuggestions = this.get('suggestions').concat(suggestion)
  //         this.set('suggestions', newSuggestions)
  //         this.getStockInfo(suggestion.ticker, this.get('suggestions').length - 1)
  //       })
  //     })
  // },
})

export default Plan
