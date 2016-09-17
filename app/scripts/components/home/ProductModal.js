import React from 'react'

import store from '../../store'

const ProductModal = React.createClass({
  getInitialState() {
    return {plan: store.plans.get(this.props.planName.toLowerCase()).toJSON()}
  },
  componentWillReceiveProps(newProps) {
    this.setState({plan: store.plans.get(newProps.planName.toLowerCase()).toJSON()})
  },
  signUp(plan) {
    store.settings.history.push('/signup')
    sessionStorage.selectedPlan = plan
  },
  render() {
    let planDescription;
    if (this.props.planName === 'Basic') {
      planDescription = (
        <p>
          Basic is an entry level product for individual use. It offers a very good value proposition.
          <br/><br/>
          Once you have <a className="blue-color" onClick={this.signUp.bind(null, 'basic')}>signed up as a member</a>, you will get access to our secure dashboard. The dashboard contains our model portfolio, which is the currently owned stocks for the Basic product. You can choose to mirror this easily.
          <br/><br/>
          We also provide suggestions, which are fresh weekly recommendations to purchase and/or sell stocks. Also here you will find more advanced information about individual stocks.
          <br/><br/>
          You then simply, using the methods that suits you best personally, purchase FS recommended stocks, based on a suggested percentage of the cash available to you this month.
          <br/><br/>
          On a monthly basis, you check back in to see if any of the stocks purchased, are recommended to be sold, or new stocks are recommended for purchase.
        </p>)
    } else if (this.props.planName === 'Premium') {
      planDescription = (
        <p>
          Premium is the premium product for individual use. It offers a very good value proposition, with an increased rate or return historically, as well as much better win/loose ratios. With premium, nearly 9 out 10 investments has provided a gain over the longer term.
          <br/><br/>
          Once you have <a className="blue-color" onClick={this.signUp.bind(null, 'premium')}>signed up as a member</a>, you will get access to our secure dashboard. The dashboard contains our model portfolio, which is the currently owned stocks for the Basic product. You can choose to mirror this easily.
          <br/><br/>
          We also provide suggestions, which are fresh weekly recommendations to purchase and/or sell stocks. Also here you will find more advanced information about individual stocks.
          <br/><br/>
          You then simply, using the methods that suits you best personally, purchase FS recommended stocks, based on a suggested percentage of the cash available to you this month.
          <br/><br/>
          On a monthly basis, you check back in to see if any of the stocks purchased, are recommended to be sold, or new stocks are recommended for purchase.
      </p>)
    } else if (this.props.planName === 'Business') {
      planDescription = (
        <p>
          Business is a product for the seasoned and professional investor, investing his or hers personal or corporate capital. It offers extreme performance, and does achieve this with little diversification. This implies some volatilty, as full advantage is taken of the best opportunity sets we can detect in the marketplace. When Business sees a particular great investment proposition, it backs up the proverbial truck. Business is happy to trade short term volatility for long term gains.
          <br/><br/>
          Historically Business has performed extremely well. It has sported win/loose ratios of 9,2 winners out of 10 investments, a highly atypical result we have not encountered anywhere else. And CAGR levels which are largely unparalleled by competing long term investment methods.
          <br/><br/>
          As a Business subscriber, you obtain the best odds, and the best informational advantage, we can provide, powered by some of the most advanced investment technology available anywhere in the world. This means getting the very best investment propositions we can locate within the current opportunity set. Of course, as a professional investor you will know that we can produce the odds, but we cannot control the outcome.
          <br/><br/>
          You may choose to mirror our model portfolio, or use our recommendations as a starting point for your own research. You may choose to apply your own risk tolerances and capital allocation strategy, or rely on Formula Stocks technology. The central risk reduction strategy with Business is the application of a margin of safety.
          <br/><br/>
          If you run a portfolio which is made up primarily by one investment style (be that value, deep value, growth, momentum, quantitative, etc.)- you may experience that your portfolio behaves more succesfully in some macro environments / time periods than in others. With Business, 44 different Intelligent Investment Technologies are applied simultaneously, providing actual strong strategy diversification within this single product as well, reducing any dependancies on a favorable macro environment "
          <br/><br/>
          For more information, please refer to our Business brochure. Or sign up <a className="blue-color" onClick={this.signUp.bind(null, 'business')}>here</a>. Business is unavailable for institutional capital, please see the Funds product instead.
      </p>)
    } else if (this.props.planName === 'Fund') {
      planDescription = (
        <p>
          Fund is a product for the institutional investor. It is designed for strong diversification
          and the deep liquidity requirements of institutional capital. With Fund most realistic AUM
          sizes become possible.<br/><br/>
          You may choose to use Fund to complement your existing research or fund management efforts.
          Fund provides valuable research and actionable market intelligence.
          Or alternatively, you may view Fund as an OEM fund-in-a-box. It provides as such a
          risk-moderate, well diversified portfolio of liquid stocks. It comes complete with a
          quantitative-based research department, capital allocation strategy, risk management at a
          low fixed cost.<br/><br/>
          Using Fund as an OEM product, you can offer a unique product to your customers, using your
          own brand and your preferred compensation structure. The only function you are required to
          have in-house then is a trading function.<br/><br/>
          If you run a portfolio which is made up primarily by one investment style (be that value, deep
          value, growth, momentum, quantitative, etc.)- you may experience that your portfolio behaves
          more succesfully in some macro environments or time periods than in others. With Fund, 90
          different Intelligent Investment Technologies are applied simultaneously, providing actual
          strong strategy diversification within this single product as well, reducing any dependancies
          on a favorable macro environment.<br/><br/>
          Contact a Formula Stocks representative for more information. Consult our Business brochure for
          more detail
        </p>)
    }

    console.log(this.props.planName);
    return (
      <div className="product-modal">
        <div className="wrapper">
          <div className="left">
            <h2 className="blue-color">{this.props.planName} Formula</h2>
            <div className="main-stats">
              <p>Buy & Sell recommendations</p>
              <p>Model Portfolio Tracking</p>
              <p><span className="light-text-color">Avg. round-trip trades per year: </span>{this.state.plan.info.roundtripTradesPerYear}</p>
              <p><span className="light-text-color">IIT formulas applied: </span>{this.state.plan.info.IITFormulas}</p>
              <p><span className="light-text-color">Historical 45 year CAGR: </span>{this.state.plan.stats.CAGR.toFixed(2)}%</p>
              <p><span className="light-text-color">Win/loss ratio: </span>{this.state.plan.stats.WLRatio.toFixed(2)}%</p>
            </div>
          </div>
          <div className="right">
            <div>
              <p><span className="light-text-color">Avg. gain per position: </span>{this.state.plan.info.avgGainPerPosition}%</p>
              <p><span className="light-text-color">Avg. loss per position: </span>{this.state.plan.info.avgLossPerPosition}%</p>
              <p><span className="light-text-color">Max drawdown in 45 years: </span>{this.state.plan.info.maxDrawdown45y}%</p>
              <p><span className="light-text-color">Max drawdown in 36 months: </span>{this.state.plan.info.maxDrawdown36m}%</p>
              <p><span className="light-text-color">IRR Arithmetic mean: </span>{this.state.plan.info.IRRArithmeticMean}%</p>
              <p><span className="light-text-color">IRR Geometric mean: </span>{this.state.plan.info.IRRGeometricMean}%</p>
              <p><span className="light-text-color">Sortino ratio: </span>{this.state.plan.info.sortinoRatio}</p>
              <p><span className="light-text-color">Gain-to-pain ratio: </span>{this.state.plan.info.gainToPainRatio}</p>
            </div>
          </div>
        </div>
        <div className="description">
        {planDescription}
        </div>

      </div>
    )
  }
})

export default ProductModal
