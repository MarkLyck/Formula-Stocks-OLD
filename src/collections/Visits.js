import Backbone from 'backbone'
import moment from 'moment'


import Visit from '../models/Visit'

const Visits = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits?query={"_kmd.ect":{"$gte": "${moment().subtract(1, 'months').format('YYYY-MM-DD')}T00:00:00.000Z"}}&sort={"_kmd.ect": 1}`,
  model: Visit
})

export default Visits
