// /* eslint-disable */
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Lockr from 'lockr'
import moment from 'moment'

import store from '../store'
import admin from '../admin'

const Plan = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/public`,
  defaults: {
    name: '',
    lastUpdated: '',
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
  fetchPrivate(plan) {
    return new Promise(resolve => {
      $.ajax(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/private/${plan}`)
      .then(r => {
        this.set('portfolio', r.portfolio)
        this.set('lastUpdated', r._kmd.lmt)
        this.set('portfolioReturn', r.portfolioReturn)
        this.set('portfolioYields', r.portfolioYields)
        this.set('price', r.price)
        this.set('stats', r.stats)
        this.set('suggestions', r.suggestions)
        this.set('type', r.type)
        resolve()
      })
    })
  },
  updateData(fileArr) {
    if (!this.get('portfolio').length) {
      this.fetchPrivate(this.get('id')).then(() => { this.updateData(fileArr) })
    } else if (!this.get('annualData').length) {
      this.fetch({ success: () => { this.uploadData(fileArr) } })
    } else {
      this.uploadData(fileArr)
    }
  },
  uploadData(fileArr) {
    let receivedJSON = (i, e) => {
      const lines = e.target.result
      const data = JSON.parse(lines)
      console.log('data: ', data);
      // Weekly file
      if (fileArr[i].name.indexOf('weekly') > -1) {
        let newSuggestions = this.get('suggestions').filter(sug => sug.model ? true : false)
        newSuggestions = _.union(data.actionable, newSuggestions)
        this.set('suggestions', newSuggestions)
      // Monthly file
      } else if (fileArr[i].name.indexOf('monthly') > -1) {
       const oldSuggestions = this.get('suggestions').filter(sug => !sug.model ? true : false)
       let newSuggestions = []
       if (data.actionable) {
        newSuggestions = data.actionable.map(sug => {
           sug.model = true
           return sug
         })
       }
       newSuggestions = _.union(oldSuggestions, newSuggestions)
       this.set('suggestions', newSuggestions)
       this.set('portfolio', data.portfolio)
       this.set('portfolioYields', data.logs)
       this.set('portfolioReturn', data.statistics.total_return)
      // Annual file
     } else if (fileArr[i].name.indexOf('annual') > -1) {
       let newStats = data.statistics
       newStats.WLRatio = (100 - data.statistics.negatives / (data.statistics.positives + data.statistics.negatives) * 100)
       let oldStats = this.get('stats')
       let stats = _.extend({}, oldStats, newStats)
       this.set('stats', stats)
       this.set('annualData', data.logs)
     }

     let newSuggestions = this.get('suggestions').map(sug => _.omit(sug, 'data'))
     let fixedPortfolio = this.get('portfolio').map(stock => _.omit(stock, 'data'))

     newSuggestions = newSuggestions.reduce((suggestions, sug, i) => {
        let dupeIndex = -1
        suggestions.forEach((suggestion, i) => {
          if (suggestion.model === sug.model) {
            if (suggestion.ticker === sug.ticker) { dupeIndex = i }
          }
        })

        if (dupeIndex > -1) {
          if (suggestions[dupeIndex].percentage_weight && sug.percentage_weight) {
            suggestions[dupeIndex].percentage_weight += sug.percentage_weight
          } else if (suggestions[dupeIndex].portfolio_weight && sug.portfolio_weight) {
            suggestions[dupeIndex].portfolio_weight += sug.portfolio_weight
          }
          return suggestions
        }
        return suggestions.concat(sug)
      }, [])

     this.set('suggestions', newSuggestions)
     this.set('portfolio', fixedPortfolio)

     // Public data
     const publicData = _.omit(this.toJSON(), ['portfolio', 'suggestions', '_acl', '_kmd'] )
     $.ajax({
       url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/public/${this.get('_id')}`,
       type: 'PUT',
       data: JSON.stringify(publicData),
       contentType: 'application/json'
     }).then(r => {
       admin.filesUploaded++
       store.session.set('notification', {
         text: `Succesfully saved file: ${fileArr[i].name} (${admin.filesUploaded / 2}/${admin.filesToUpload})`,
         type: 'success'
       })
     }).catch(e => {
       store.session.set('notification', {
         text: `Failed saved file: ${fileArr[i].name} Err: ${e.error || e.responseText}`,
         type: 'error'
       })
       console.error(e)
     })

     // Private data
     let privateData = _.omit(this.toJSON(), ['annualData', 'info', '_acl', '_kmd'])
     privateData.stats = { CAGR: privateData.stats.CAGR, WLRatio: privateData.stats.WLRatio }

     $.ajax({
       url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/private/${this.get('_id')}`,
       type: 'PUT',
       data: JSON.stringify(privateData),
       contentType: 'application/json'
     }).then(r => {
       admin.filesUploaded++
       store.session.set('notification', {
         text: `Succesfully saved file: ${fileArr[i].name} (${admin.filesUploaded / 2}/${admin.filesToUpload})`,
         type: 'success'
       })
     }).catch(e => {
       store.session.set('notification', {
         text: `Failed saved file: ${fileArr[i].name} Err: ${e.error || e.responseText}`,
         type: 'error'
       })
       console.error(e)
     })
    }

    fileArr.forEach((file, i) => {
      let fr = new FileReader()
      fr.onload = receivedJSON.bind(null, i)
      fr.readAsText(file)
    })
  },
  getLastDayPrice(ticker, i) {
    return new Promise((resolve, reject) => {
      ticker = ticker.replace('.', '_')
      let resolved = false
      const stock = Lockr.get('stocks')[ticker]
      if (stock) {
        if (moment(stock.date).format('DDMMYYYY') === moment().format('DDMMYYYY')) {
          resolved = true
          resolve(stock.lastPrice)
        } else if (stock.error) {
          reject()
          resolved = true
        } else {
          Lockr.set('stocks', {})
        }
      }
      if (!resolved) {
        const query = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=${store.settings.quandlKey}&column_index=4&limit=1`
        $.ajax(query)
        .then(output => {
          if (output.dataset.data[0][1]) {
            let stocks = Lockr.get('stocks')
            stocks[ticker] = { date: new Date(), lastPrice: output.dataset.data[0][1] }
            Lockr.set('stocks', stocks)
            resolve(output.dataset.data[0][1])
          }
        })
        .catch(e => {
          let stocks = Lockr.get('stocks')
          stocks[ticker] = { date: new Date(), error: true }
          Lockr.set('stocks', stocks)
          reject()
        })
      }
    })
  },
  getHistoricData(ticker, i, limit) {
    return new Promise((resolve, reject) => {
      ticker = ticker.replace('.', '_')
      const stocks = Lockr.get('stocks')
      let resolved = false
      if (stocks[ticker]) {
        if (moment(stocks[ticker].date).format('DDMMYYYY') === moment().format('DDMMYYYY') && stocks[ticker].data) {
          if (stocks[ticker].data.length >= limit) {
            resolved = true
            resolve(Lockr.get('stocks')[ticker].data)
          }
        } else if (stocks[ticker].error) {
          reject()
          resolved = true
        } else {
          Lockr.set('stocks', {})
        }
      }
      if (!resolved) {
        let query = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=${store.settings.quandlKey}&column_index=4${limit ? '&limit=' + limit : ''}`
        $.ajax(query)
        .then(output => {
          let stocks = Lockr.get('stocks')
          stocks[ticker] = {
            date: new Date(),
            lastPrice: output.dataset.data[0][1],
            data: output.dataset.data
          }
          Lockr.set('stocks', stocks)
          resolve(output.dataset.data)
        })
        .catch(e => {
          let stocks = Lockr.get('stocks')
          stocks[ticker] = { date: new Date(), error: true }
          Lockr.set('stocks', stocks)
          reject()
        })
      }
    })
  }
})

export default Plan
