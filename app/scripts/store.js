import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

import Plan from './models/Plan'
import Plans from './collections/Plans'
import Market from './models/Market'

let store = {
  session: new Session(),
  settings: {
    history: hashHistory,
    appKey: 'kid_rJRC6m9F',
    appSecret: 'e6688b599fca47e1bf150d99a786132d',
    basicAuth: btoa('kid_rJRC6m9F:e6688b599fca47e1bf150d99a786132d')
  },
  plans: new Plans(),
  market: {
    data: new Market(),
    cagr: 10.47
  }
}

store.plans.add({
  id: 'basic',
  name: 'basic'
})
store.plans.add({
  id: 'premium',
  name: 'premium'
})
store.plans.add({
  id: 'business',
  name: 'business'
})
store.plans.add({
  id: 'fund',
  name: 'fund'
})

export default store
