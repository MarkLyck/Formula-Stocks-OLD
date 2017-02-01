import $ from 'jquery'
import Backbone from 'backbone'
import Lockr from 'lockr'
import store from '../store'

const Market = Backbone.Model.extend({
  defaults: {
    annualData: [],
    portfolioData: [],
    djia: [],
    annualDJIA: [],
    cagr: 10.47
  },
  getAnnualData() {
    return new Promise((resolve, reject) => {
      $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?trim_start=1970-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
      .then((r) => {
        let fixedData = r.data.map(point => point[1].toFixed(0))
        fixedData = fixedData.reverse()

        let percent = null
        for(let e = 0; e < fixedData.length; e++) {
  				if (e < 1) { percent = (25000 * 100) / fixedData[0] / 100 }
  				fixedData[e] = Math.floor(percent * fixedData[e])
  			}

        this.set('annualData', fixedData)
        resolve(fixedData)
      })
      .fail((e) => {
        console.error('Failed fetching QUANDL DATA', e)
        reject('Failed fetching QUANDL DATA', e)
      })
    })
  },
  getPortfolioData() {
    return new Promise((resolve,reject) => {
      let resolved = false
      if (Lockr.get('portfolioMarketData')) {
        if (store.plans.get(store.selectedPlan).get('portfolioYields').length <= Lockr.get('portfolioMarketData').length && Lockr.get('portfolioMarketData').length !== 0) {
          resolved = true
          this.set('portfolioData', Lockr.get('portfolioMarketData'))
          resolve(Lockr.get('portfolioMarketData'))
        }
      }
      if (!resolved) {
        $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
        .then(r => {
          let fixedData = r.data.map(point => point[1].toFixed(0))
          fixedData = fixedData.reverse()
          Lockr.set('portfolioMarketData', fixedData)
          $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?auth_token=6SfHcXos6YBX51kuAq8B&column=4&limit=1`)
          .then(lastMarketPrice => {
            let finalPoint = lastMarketPrice.data[0][1].toFixed(0)
            fixedData.push(finalPoint)
            Lockr.set('portfolioMarketData', fixedData)
            this.set('portfolioData', fixedData)
            resolve(fixedData)
          })
          .fail(e => {
            console.error(e)
            this.set('portfolioData', fixedData)
            resolve(fixedData)
          })
        })
        .fail(e => {
          reject()
          console.error('Failed fetching QUANDL DATA', e)
        })
      }
    })
  },
  getDJIAData() {
    $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_DJI.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
    .then((r) => {
      let fixedData = r.data.map((point) => {
        return point[1].toFixed(0)
      })
      fixedData = fixedData.reverse()
      this.set('djia', fixedData)
    })
    .fail((e) => {
      console.error('Failed fetching QUANDL DATA DJIA', e)
    })
  },
  getAnnualDJIAData() {
    $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_DJI.json?trim_start=1970-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
    .then((r) => {
      let fixedData = r.data.map((point) => {
        return point[1].toFixed(0)
      })
      fixedData = fixedData.reverse()

      let percent = null
      for(var e = 0; e < fixedData.length; e++) {
        if(e < 1) {
          percent = (25000 * 100) / fixedData[0] / 100
        }
        fixedData[e] = Math.floor(percent * fixedData[e])
      }

      this.set('annualDJIA', fixedData)
    })
    .fail((e) => {
      console.error('Failed fetching QUANDL ANNUAL DATA DJIA', e)
    })
  }
})

export default Market
