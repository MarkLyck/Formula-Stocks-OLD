import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

import Plan from './models/Plan'

let store = {
  session: new Session(),
  settings: {
    history: hashHistory,
    appKey: 'kid_rJRC6m9F',
    appSecret: 'e6688b599fca47e1bf150d99a786132d',
    basicAuth: btoa('kid_rJRC6m9F:e6688b599fca47e1bf150d99a786132d')
  },
  plans: {
    basic: {
      data: new Plan({
        name: 'basic',
        stats: {
          cagr: 19.24,
        }
      })
    },
    premium: {
      data: new Plan({
        name: 'premium',
        stats: {
          cagr: 25.23,
        }
      })
    },
    business: {
      data: new Plan({
        name: 'business',
        stats: {
          cagr: 35.41,
        }
      })
    },
    fund: {
      data: new Plan({
        name: 'business',
        stats: {
          cagr: 22,
        }
      })
    }
  }
}

export default store
