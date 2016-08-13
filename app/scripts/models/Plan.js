import $ from 'jquery'
import Backbone from 'backbone'

const Plan = Backbone.Model.extend({
  defaults: {
    name: '',
    stats: {
      cagr: 0,
    },
    annualData: []
  },
  getAnnualData() {
    $.ajax(`https://s3-us-west-2.amazonaws.com/aws-fs/public/api/annual_${this.get('name')}.json`)
    .then((r) => {
      let data = JSON.parse(r)
      
      this.set('annualData', data.logs)

      let stats = this.get('stats')
      stats.cagr = data.statistics.CAGR
      stats.positives = data.statistics.positives
      stats.negatives = data.statistics.negatives
      stats.geometric_IRR = data.statistics.geometric_IRR
      stats.total_return = data.statistics.total_return
      stats.total_return = data.statistics.total_return
      this.set('stats', stats)
    })
    .fail((e) => {
      console.error('Failed fetching annual data from server', e)
    })
  }
})

export default Plan
