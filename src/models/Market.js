import $ from 'jquery'
import Backbone from 'backbone'
import Lockr from 'lockr'
import store from '../OLD_store'

const Market = Backbone.Model.extend({
  defaults: {
    annualData: [],
    portfolioData: [],
    djia: [],
    annualDJIA: [],
    cagr: 10.47
  },
  getAnnualData() {
    // console.log('get ANnual data');
    return new Promise((resolve, reject) => {
      // $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?trim_start=1970-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
      $.ajax(`https://www.quandl.com/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?api_key=zP2W-4snDLyygfZVpw2v&start_date=1970-01-01`)
      .then((r) => {
        // console.log('data', r);
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
        // $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
        $.ajax(`https://www.quandl.com/api/v3/datasets/EOD/SPY.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=2009-01-01&collapse=monthly&column_index=4`)
        .then(r => {
          let fixedData = r.data.map(point => point[1].toFixed(0))
          fixedData = fixedData.reverse()
          Lockr.set('portfolioMarketData', fixedData)
          $.ajax(`https://www.quandl.com/api/v3/datasets/EOD/SPY.json?api_key=YjZ14NUXoyAGAPRDomS5&column_index=4&limit=1`)
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
    // $.ajax(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_DJI.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
    $.ajax(`https://www.quandl.com/api/v3/datasets/EOD/DIA.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=2009-01-01&collapse=monthly&column_index=4`)
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
    $.ajax(`https://www.quandl.com/api/v3/datasets/EOD/DIA.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=1970-01-01&collapse=monthly&column_index=4`)
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
