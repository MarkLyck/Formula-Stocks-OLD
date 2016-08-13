import Backbone from 'backbone'

import Plan from '../models/Plan'

const Plans = Backbone.Collection.extend({
  model: Plan
})

export default Plans
