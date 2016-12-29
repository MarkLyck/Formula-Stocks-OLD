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
      <section className="pricing">
        <h2 className="title">Pricing</h2>
        <div className="divider"/>
        <div className="plans">
          <Product plan={store.plans.get('premium').toJSON()}/>
          <Product plan={store.plans.get('business').toJSON()}/>
          <Product plan={store.plans.get('fund').toJSON()}/>
        </div>
      </section>
    )
  }
}

export default Pricing
