import Session from './models/Session'
import {hashHistory, browserHistory} from 'react-router'

import Plan from './models/Plan'
import Plans from './collections/Plans'
import Market from './models/Market'

import Articles from './collections/Articles'
import MDArticles from './collections/MDArticles'

let store = {
  session: new Session(),
  settings: {
    anomToken: '17dcc7f4-49f8-4d7c-8d66-d96474fa6818.tEs1/na2P9cqWKXn3ab9pgIdPpmEPAaQDIJEYNbG7E4=',
    history: browserHistory,
    quandlKey: 'YjZ14NUXoyAGAPRDomS5',
    // quandlKey: 'zP2W-4snDLyygfZVpw2v', FREE API KEY
    appKey: 'kid_rJRC6m9F',
    appSecret: 'e6688b599fca47e1bf150d99a786132d',
    basicAuth: btoa('kid_rJRC6m9F:e6688b599fca47e1bf150d99a786132d')
  },
  plans: new Plans(),
  market: {
    data: new Market(),
    cagr: 10.483
  },
  articles: {
    fetching: false,
    data: new Articles()
  },
  mdarticles: {
    fetching: false,
    data: new MDArticles()
  }
}

store.plans.add({
  id: 'basic',
  name: 'basic',
  price: 50,
  type: 1,
  info: {
    roundtripTradesPerYear: 82,
    avgNumOfPosInPortfolio: 152,
    IITFormulas: 4,
    avgGainPerPosition: 65.97,
    avgLossPerPosition: 18.32,
    maxDrawdown45y: 46.02,
    maxDrawdown36m: 36.04,
    IRRArithmeticMean: 52.61,
    IRRGeometricMean: 27.18,
    sortinoRatio: 2.618,
    gainToPainRatio: 1.1493,
  }
})
store.plans.add({
  id: 'premium',
  name: 'premium',
  price: 100,
  type: 2,
  info: {
    roundtripTradesPerYear: 85,
    avgNumOfPosInPortfolio: 102,
    IITFormulas: 15,
    avgGainPerPosition: 77.49,
    avgLossPerPosition: 17.03,
    maxDrawdown45y: 32.04,
    maxDrawdown36m: 21.51,
    IRRArithmeticMean: 68.60,
    IRRGeometricMean: 35.14,
    sortinoRatio: 6.05,
    gainToPainRatio: 1.502,
  }
})
store.plans.add({
  id: 'business',
  name: 'business',
  price: 20000,
  type: 3,
  info: {
    roundtripTradesPerYear: 45,
    avgNumOfPosInPortfolio: 52,
    IITFormulas: 53,
    avgGainPerPosition: 102.37,
    avgLossPerPosition: 16.47,
    maxDrawdown45y: 40.61,
    maxDrawdown36m: 7.03,
    IRRArithmeticMean: 108.01,
    IRRGeometricMean: 48.66,
    sortinoRatio: 6.196,
    gainToPainRatio: 2.886,
  }
})
store.plans.add({
  id: 'fund',
  name: 'fund',
  price: 140000,
  type: 4,
  info: {
    roundtripTradesPerYear: 123,
    avgNumOfPosInPortfolio: 128,
    IITFormulas: 93,
    avgGainPerPosition: 66.097,
    avgLossPerPosition: 16.85,
    maxDrawdown45y: 24.64,
    maxDrawdown36m: 22.976,
    IRRArithmeticMean: 67.96,
    IRRGeometricMean: 33.27,
    sortinoRatio: 4.987,
    gainToPainRatio: 1.9302,
  },
})

export default store
