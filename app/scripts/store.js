import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

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
      cagr: 19.24
    },
    premium: {
      cagr: 25.23
    },
    business: {
      cagr: 35.41
    },
    fund: {
      cagr: 22
    }
  }
}

export default store
