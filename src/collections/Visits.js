import Backbone from 'backbone'

import Visit from '../models/Visit'

const Visits = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
  model: Visit
})

export default Visits
