import React from 'react'
import store from '../../store'
import Product from './components/Product.jsx'

class Pricing extends React.Component {
  constructor() {
    super()

    this.updateState = this.updateState.bind(this)
    this.state = { gotInfo: false }
  }

  updateState() {
    this.setState({ gotInfo: true })
  }

  componentDidMount() {
    store.plans.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.plans.off('update', this.updateState)
  }

  render() {
    // console.log(store.plans.get('premium').toJSON())
    return (
      <section className="prof-pricing">
        <h2 className="title">Pricing</h2>
        <div className="divider"/>
        <div className="prof-plans">
          <Product plan={store.plans.get('premium').toJSON()} billed="Monthly"/>
          <Product plan={store.plans.get('business').toJSON()} billed="Annually"/>
          <Product plan={store.plans.get('fund').toJSON()} billed="Annually"/>
        </div>
      </section>
    )
  }
}

export default Pricing
