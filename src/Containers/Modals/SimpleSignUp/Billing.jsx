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

    const plan = props.plan
    const cycle = plan.name !== 'business' || plan.name !== 'fund' ? ' monthly' : ' annually'

    this.state = {
      error: '',
      errorType: '',
      showTerms: false,
      validatingPayment: false,
      discount: 0,
      coupon: '',
      cycle: cycle,
    }
  }

  ccFormat() { this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value) }
  dateFormat(e) { this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value) }
  cvcFormat() { this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value) }

  toggleTerms() { this.setState({ showTerms: !this.state.showTerms }) }

  createCustomer(token) {
    let { plan, signUp, tax } = this.props

    let type = 1
    if (plan.name === 'premium') { type = 2 }
    else if (plan.name === 'business') { type = 3 }
    else if (plan.name === 'fund') { type = 4 }

    this.props.setSessionItem('type', type)
    this.props.setSessionItem('name', this.refs.name.value)

    signUp(token, plan.name, this.state.cycle, tax, this.state.coupon.code)
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
    .catch(error => { this.setState({ error: error, errorType: 'payment', validatingPayment: false }) })
  }

  render() {
    const { plan, tax } = this.props

    const nameClass = this.state.error.indexOf('name') > -1 ? 'red-outline' : ''
    const cardNumberClass = this.state.error.indexOf('card number') > -1 || this.props.signupError ? 'red-outline' : ''
    const expiryClass = this.state.error.indexOf('expi') > -1 || this.props.signupError ? 'red-outline' : ''
    const cvcClass = this.state.error.indexOf('security') > -1 || this.props.signupError ? 'red-outline' : ''

    let errorText = this.state.error
    if (this.props.signUpError) { errorText =  this.props.signUpError }

    return (
      <form className="simple-billing" onSubmit={this.submit}>
        <h3 className="title">Billing information</h3>
        <h5 className="subtitle">First charge after 30 days, you can cancel at any time.</h5>
        { nameClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-user" aria-hidden="true"></i><input className={nameClass} type="text" placeholder="Name on card" ref="name"/></div>
        { cardNumberClass ? <p className="error-text">{errorText}</p> : '' }
        <div className="icon-input"><i className="fa fa-credit-card-alt" aria-hidden="true"></i><input type="text" className={cardNumberClass} placeholder="Card number" onKeyUp={this.ccFormat} ref="cardNumber"/></div>
        { expiryClass || cvcClass ? <p className="error-text">{errorText}</p> : '' }
        <div className="beside">
          <div className="icon-input"><i className="fa fa-calendar-times-o" aria-hidden="true"></i><input type="text" className={expiryClass} placeholder="MM / YY" onKeyUp={this.dateFormat} ref="cardExpiry"/></div>
          <div className="icon-input"><i className="fa fa-lock" aria-hidden="true"></i><input type="number" className={cvcClass} placeholder="CVC" onKeyUp={this.cvcFormat} ref="cardCvc"/></div>
        </div>

        { this.props.tax ? <div className="beside">
          <p className="description">Tax</p>
          <p className="price semi-bold">${ formatPrice(plan.price * (tax / 100 + 1) - plan.price) }</p>
        </div> : ''}

        <div className="beside">
          <p className="description">Price after 30 days:</p>
          <p className="price semi-bold">${ formatPrice(plan.price * (tax / 100 + 1)) } monthly</p>
        </div>

        <input className="pay-button" type="submit" value="Start free trial"/>
        <p className="disclaimer">By signing up you agree to our <a onClick={this.toggleTerms}>Terms of Service</a></p>
        {this.state.showTerms ? <div className="terms-container"><button className="close-btn" onClick={this.toggleTerms}><i className="material-icons">close</i></button><Terms/></div> : ''}
      </form>
    )
  }
}

export default Billing
