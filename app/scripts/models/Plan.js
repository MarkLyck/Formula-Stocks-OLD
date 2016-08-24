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
        newStats.WLRatio = (100 - data.statistics.negatives/(data.statistics.positives + data.statistics.negatives) * 100)
        let oldStats = this.get('stats')
        let stats = _.extend({}, oldStats, newStats)
        this.set('stats', stats)
      }
      console.log('saving file');
      this.save(null, {
        success: function() {
          store.session.set('notification', {
            text: `Succesfually saved file: ${fileArr[i].name}`,
            type: 'success'
          })
        },
        error: function() {
          store.session.set('notification', {
            text: `Failed saved file: ${fileArr[i].name}`,
            type: 'error'
          })
        }
      })
    }

    fileArr.forEach((file, i) => {
      let fr = new FileReader();
      fr.onload = receivedJSON.bind(null, i);
      fr.readAsText(file);
    })
  },
  parseStockData(data) {
    return data.filter((point) => {
      if (point[1] !== null && point[2] !== null && point[3] !== null) {
        return true
      }
    })
  },
  getStockInfo(ticker, i, portfolioStock) {
    let hasCanceled_ = false;
    let promise = new Promise((resolve, reject) => {

      ticker = ticker.replace('.', '_')
      let query = `https://www.quandl.com/api/v1/datasets/WIKI/${ticker}.json?api_key=${store.settings.quandlKey}`
      $.ajax({
        url: query,
      })
      .then((response) => {
        // console.log(portfolioStock);
        if (!portfolioStock) {
          let suggestionToUpdate = this.get('suggestions')[i]
          suggestionToUpdate.data = this.parseStockData(response.data)

          let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
          this.set('suggestions', newArr)
          this.trigger('change')
          // resolve()
          hasCanceled_ ? reject({isCancelled: true}) : resolve()
        } else {
          let portfolioToUpdate = this.get('portfolio')[i]
          portfolioToUpdate.data = this.parseStockData(response.data)
          let newArr = this.get('portfolio').slice(0,i).concat(portfolioToUpdate, this.get('portfolio').slice(i + 1))
          this.set('portfolio', newArr)
          this.trigger('change')
          hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
          // resolve(response)
        }
      })
      .fail((e) => {
        query = `https://www.quandl.com/api/v1/datasets/GOOG/NASDAQ_${ticker}.json?api_key=${store.settings.quandlKey}`
        $.ajax(query)
        .then((response) => {
          if (!portfolioStock) {
            let suggestionToUpdate = this.get('suggestions')[i]
            suggestionToUpdate.data = this.parseStockData(response.data)

            let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
            this.set('suggestions', newArr)
            this.trigger('change')
            // resolve()
            hasCanceled_ ? reject({isCancelled: true}) : resolve()
          } else {
            let portfolioToUpdate = this.get('portfolio')[i]
            portfolioToUpdate.data = this.parseStockData(response.data)
            let newArr = this.get('portfolio').slice(0,i).concat(portfolioToUpdate, this.get('portfolio').slice(i + 1))
            this.set('portfolio', newArr)
            this.trigger('change')

            // resolve(response)
            hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
          }
        })
        .fail((error) => {
          query = `https://www.quandl.com/api/v1/datasets/GOOG/NYSE_${ticker}.json?api_key=${store.settings.quandlKey}`
          $.ajax(query)
          .then((response) => {
            if (!portfolioStock) {
              let suggestionToUpdate = this.get('suggestions')[i]
              suggestionToUpdate.data = this.parseStockData(response.data)

              let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
              this.set('suggestions', newArr)
              this.trigger('change')
              // resolve()
              hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
            } else {
              let portfolioToUpdate = this.get('portfolio')[i]
              portfolioToUpdate.data = this.parseStockData(response.data)
              let newArr = this.get('portfolio').slice(0,i).concat(portfolioToUpdate, this.get('portfolio').slice(i + 1))
              this.set('portfolio', newArr)
              this.trigger('change')

              // resolve(response)
              hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
            }
          })
          .fail(() => {
            query = `https://www.quandl.com/api/v1/datasets/GOOG/AMEX_${ticker}.json?api_key=${store.settings.quandlKey}`
            $.ajax(query)
            .then((response) => {
              if (!portfolioStock) {
                let suggestionToUpdate = this.get('suggestions')[i]
                suggestionToUpdate.data = this.parseStockData(response.data)

                let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
                this.set('suggestions', newArr)
                this.trigger('change')
                // resolve()
                hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
              } else {
                let portfolioToUpdate = this.get('portfolio')[i]
                portfolioToUpdate.data = this.parseStockData(response.data)
                let newArr = this.get('portfolio').slice(0,i).concat(portfolioToUpdate, this.get('portfolio').slice(i + 1))
                this.set('portfolio', newArr)
                this.trigger('change')

                // resolve(response)
                hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
              }
            })
            .fail(() => {
              query = `https://www.quandl.com/api/v1/datasets/YAHOO/TSX_${ticker}.json?api_key=${store.settings.quandlKey}`
              $.ajax(query)
              .then((response) => {
                if (!portfolioStock) {
                  let suggestionToUpdate = this.get('suggestions')[i]
                  suggestionToUpdate.data = this.parseStockData(response.data)

                  let newArr = this.get('suggestions').slice(0,i).concat(suggestionToUpdate, this.get('suggestions').slice(i + 1))
                  this.set('suggestions', newArr)
                  this.trigger('change')
                  // resolve()
                  hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
                } else {
                  let portfolioToUpdate = this.get('portfolio')[i]
                  portfolioToUpdate.data = this.parseStockData(response.data)
                  let newArr = this.get('portfolio').slice(0,i).concat(portfolioToUpdate, this.get('portfolio').slice(i + 1))
                  this.set('portfolio', newArr)
                  this.trigger('change')

                  // resolve(response)
                  hasCanceled_ ? reject({isCancelled: true}) : resolve(response)
                }
              })
              .fail(() => {
                // console.log('no data for: ', ticker);
                hasCanceled_ ? reject({isCancelled: true}) : reject('no data for: ', ticker)
                // reject('no data for: ', ticker)
              })
            })
          })
        })
      })
    })

    return {
      promise: promise,
      cancel() {
        hasCanceled_ = true;
      }
    }

  },

})

export default Plan
