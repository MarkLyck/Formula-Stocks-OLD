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
    annualData: []
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

      console.log(this.get('name'), this.get('stats'));
    })
    .fail((e) => {
      console.error('Failed fetching annual data from server', e)
    })
  }
})

export default Plan
