import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

import Plan from './models/Plan'
import Plans from './collections/Plans'
import Market from './models/Market'

let store = {
  session: new Session(),
  settings: {
    anomToken: '8c66d956-de91-4cf8-83ab-fe8545866571.h9Ps7jZMlx+3WjjInLAfr9+MGz1aE2GN6OlUly6F6z4=',
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
  price: 50
})
store.plans.add({
  id: 'premium',
  name: 'premium',
  price: 100
})
store.plans.add({
  id: 'business',
  name: 'business',
  price: 20000
})
store.plans.add({
  id: 'fund',
  name: 'fund',
  price: 120000
})

export default store
