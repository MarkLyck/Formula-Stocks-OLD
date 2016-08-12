import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

let store = {
  session: new Session(),
  settings: {
    history: browserHistory,
    appKey: 'kid_rJRC6m9F',
    appSecret: 'e6688b599fca47e1bf150d99a786132d',
    basicAuth: btoa('kid_rJRC6m9F:e6688b599fca47e1bf150d99a786132d')
  }
}

export default store
