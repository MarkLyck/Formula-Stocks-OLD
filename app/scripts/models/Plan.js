import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'

const Plan = Backbone.Model.extend({
  defaults: {
    name: '',
    stats: {
      cagr: 0,
      WLRatio: 0,
    },
    annualData: []
  },
  getAnnualData() {
    // console.log('getting data for: ', this.get('name'));
    $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/annual_${this.get('name')}.json`)
    .then((r) => {
      let data = JSON.parse(r)

      this.set('annualData', data.logs)

      let stats = this.get('stats')

      stats.cagr = data.statistics.CAGR
      stats.positives = data.statistics.positives
      stats.negatives = data.statistics.negatives
      stats.WLRatio = (100 - data.statistics.negatives/data.statistics.positives * 100)
      stats.geometric_IRR = data.statistics.geometric_IRR
      stats.total_return = data.statistics.total_return
      stats.total_return = data.statistics.total_return

      // This replaces stats on ALL instances of this model, for no reason.
      this.set('stats', stats)
      // store.plans.get(this.get('name')).set('stats', stats)

      // FIXME Removing this change event will cause components to not update (sometimes).
      this.trigger('change')

      // console.log(this.get('name') + ' cagr: ', data.statistics.CAGR);
      // console.log(this.get('name'), store.plans.get(this.get('name')).get('stats').cagr);
      // console.log(store.plans.models);

    })
    .fail((e) => {
      console.error('Failed fetching annual data from server', e)
    })
  }
})

export default Plan
