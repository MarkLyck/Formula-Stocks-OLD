import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

import Plan from './models/Plan'
import Plans from './collections/Plans'
import Market from './models/Market'

let store = {
  session: new Session(),
  settings: {
    history: hashHistory,
    quandlKey: 'zP2W-4snDLyygfZVpw2v',
    appKey: 'kid_rJRC6m9F',
    appSecret: 'e6688b599fca47e1bf150d99a786132d',
    basicAuth: btoa('kid_rJRC6m9F:e6688b599fca47e1bf150d99a786132d')
  },
  plans: new Plans(),
  market: {
    data: new Market(),
    cagr: 10.71
  },
}

store.plans.add({
  id: 'basic',
  name: 'basic',
  info: {
    roundtripTradesPerYear: 39,
    IITFormulas: 3
  },
  price: 50
})
store.plans.add({
  id: 'premium',
  name: 'premium',
  info: {
    roundtripTradesPerYear: 44,
    IITFormulas: 8
  },
  price: 100
})
store.plans.add({
  id: 'business',
  name: 'business',
  info: {
    roundtripTradesPerYear: 20,
    IITFormulas: 44
  },
  price: 20000
})
store.plans.add({
  id: 'fund',
  name: 'fund',
  info: {
    roundtripTradesPerYear: 63,
    IITFormulas: 87
  },
  price: 120000
})

export default store
