import React from 'react'
import store from '../../../store.js'
import cc from '../../../cc'
import Terms from '../../Global/Components/Legal/TermsAndConditions'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    // eslint-disable-next-line
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

class Billing extends React.Component {
  constructor(props) {
    super(props)

    this.ccFormat = this.ccFormat.bind(this)
    this.dateFormat = this.dateFormat.bind(this)
    this.cvcFormat = this.cvcFormat.bind(this)
    this.toggleTerms = this.toggleTerms.bind(this)
    this.submit = this.submit.bind(this)

    const plan = store.plans.get(this.props.plan).toJSON()

    this.state = {
      error: '',
      errorType: '',
      showTerms: false,
      price: plan.price,
      validatingPayment: false
    }
  }

  ccFormat() { this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value) }
  dateFormat(e) { this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value) }
  cvcFormat() { this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value) }

  toggleTerms() { this.setState({ showTerms: !this.state.showTerms }) }

  createCustomer(token) {
    store.session.set('name', this.refs.name.value)
    cc.createCustomer2(token, this.props.selected, this.state.cycle, this.state.taxPercent, this.state.coupon.code)
    .then(() => {
      console.log('||| SUCCESFUL PAYMENT |||')
      store.isSubmitting = false
    })
    .catch((e) => {
      store.isSubmitting = false
      this.setState({ error: String(e), errorType: 'payment', validatingPayment: false })
    })
  }

  submit(e) {
    e.preventDefault()
    store.isSubmitting = true
    if (this.refs.name.value.indexOf(' ') === -1) {
      this.setState({ error: 'Please enter your full name', errorType: 'payment' })
      store.isSubmitting = false
      return
    }

    this.setState({ validatingPayment: true, error: '', errorType: '' })

    const card = {
      number: this.refs.cardNumber.value.replace(/\s+/g, ''),
      month: this.refs.cardExpiry.value.split(' / ')[0],
      year: this.refs.cardExpiry.value.split(' / ')[1],
      cvc: this.refs.cardCvc.value
    }

    cc.checkPayment(card)
    .then(token => this.createCustomer(token))
    .catch(error => {
      store.isSubmitting = false
      this.setState({ error: error, errorType: 'payment', validatingPayment: false })
    })
  }

  render() {
    console.log(this.state.error);
    const nameClass = this.state.error.indexOf('name') > -1 ? 'red-outline' : ''
    const cardNumberClass = this.state.error.indexOf('card number') > -1 ? 'red-outline' : ''
    const expiryClass = this.state.error.indexOf('expiry') > -1 ? 'red-outline' : ''
    const cvcClass = this.state.error.indexOf('security') > -1 ? 'red-outline' : ''

    return (
      <form className="simple-billing" onSubmit={this.submit}>
        <h3 className="title">Billing</h3>
        { nameClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-user" aria-hidden="true"></i><input className={nameClass} type="text" placeholder="Name on card" ref="name"/></div>
        { cardNumberClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-credit-card-alt" aria-hidden="true"></i><input type="text" className={cardNumberClass} placeholder="Card number" onKeyUp={this.ccFormat} ref="cardNumber"/></div>
        { expiryClass || cvcClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="beside">
          <div className="icon-input"><i className="fa fa-calendar-times-o" aria-hidden="true"></i><input type="text" className={expiryClass} placeholder="MM / YY" onKeyUp={this.dateFormat} ref="cardExpiry"/></div>
          <div className="icon-input"><i className="fa fa-lock" aria-hidden="true"></i><input type="number" className={cvcClass} placeholder="CVC" onKeyUp={this.cvcFormat} ref="cardCvc"/></div>
        </div>

        { this.props.tax ? <div className="beside">
          <p className="description">Tax</p>
          <p className="price semi-bold">${ formatPrice(this.state.price * (this.props.tax / 100 + 1) - this.state.price) }</p>
        </div> : ''}

        <div className="beside">
          <p className="description">Price after 30 days:</p>
          <p className="price semi-bold">${ formatPrice(this.state.price * (this.props.tax / 100 + 1)) } monthly</p>
        </div>

        <input className="pay-button" type="submit" value="Start free trial"/>
        <p className="disclaimer">By signing up you agree to our <a onClick={this.toggleTerms}>Terms of Service</a></p>
        {this.state.showTerms ? <div className="terms-container"><button className="close-btn" onClick={this.toggleTerms}><i className="material-icons">close</i></button><Terms/></div> : ''}
      </form>
    )
  }
}

export default Billing
