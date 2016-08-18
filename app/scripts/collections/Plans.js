import Backbone from 'backbone'

import Plan from '../models/Plan'
import store from '../store'

const Plans = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/api`,
  model: Plan
})

export default Plans
