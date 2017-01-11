import React from 'react'
import Select from 'react-select'
import cc from '../../../cc'
import store from '../../../store'
import countries from '../../../data/countries'
import discountCodes from '../../../data/discountCodes'
import _ from 'underscore'
import Terms from '../../Global/Components/Legal/TermsAndConditions'

import './billing.css'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return value
}

class Billing extends React.Component {
  constructor(props) {
    super(props)

    this.toggleCheckBox = this.toggleCheckBox.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.calculateTax = this.calculateTax.bind(this)
    this.applyDiscount = this.applyDiscount.bind(this)

    this.renderTax = this.renderTax.bind(this)
    this.renderDiscount = this.renderDiscount.bind(this)
    this.renderDiscountButton = this.renderDiscountButton.bind(this)
    this.renderPayButton = this.renderPayButton.bind(this)

    this.renderError = this.renderError.bind(this)

    this.ccFormat = this.ccFormat.bind(this)
    this.dateFormat = this.dateFormat.bind(this)
    this.cvcFormat = this.cvcFormat.bind(this)

    this.submit = this.submit.bind(this)
    this.createCustomer = this.createCustomer.bind(this)

    this.toggleTerms = this.toggleTerms.bind(this)

    const plan = store.plans.get(this.props.selected).toJSON()

    let cycle = ' monthly'
    if (plan.name === 'business' || plan.name === 'fund') {
      cycle = ' annually'
    }

    let priceText = `Subscribe for $${cc.commafy(plan.price)} ${cycle}`
    if (plan.name === 'basic') {
      priceText = 'Start free trial'
    }

    let countryText = 'Country'
    let countryCode
    let taxPercent = 0
    if (store.session.get('location').country_code
        && store.session.get('location').country_name) {
      countryText = store.session.get('location').country_name
      countryCode = store.session.get('location').country_code

      let country = _.where(countries, {value: countryCode})
      if (country[0].taxPercent) {
        taxPercent = country[0].taxPercent
      }
    }

    this.state = {
      priceText: priceText,
      price: plan.price,
      formClass: `payment-form ${this.props.formAnimation}`,
      checked: false,
      validatingPayment: false,
      countryName: countryText,
      countryCode: countryCode,
      taxPercent: taxPercent,
      discount: 0,
      coupon: '',
      cycle: cycle,
      error: '',
      errorType: '',
      showTerms: false
    }
  }

  calculateTax(countryCode) {
    cc.calculateTax(countryCode).then((tax) => {
      this.setState({ taxPercent: tax })
    })
  }

  toggleCheckBox() { this.setState({ checked: !this.state.checked }) }

  ccFormat() { this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value) }
  dateFormat(e) { this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value) }
  cvcFormat() { this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value) }

  selectCountry(country) {
    this.setState({
      countryName: country.label,
      countryCode: country.value,
    })
    this.calculateTax(country.value)
  }

  renderTax() {
    if (this.state.taxPercent > 0) {
      let price = this.state.price
      if (this.state.discount > 0) {
        price = price * -(this.state.discount / 100 - 1)
      }

      return (
        <div className="tax info">
          <p>Tax</p>
          <p>${formatPrice(price * (this.state.taxPercent / 100))}</p>
        </div>
      )
    }
  }

  renderDiscount() {
    if (this.state.discount > 0) {
      if (this.state.coupon.type === 'percent') {
        return (
          <div className="tax info">
            <p>Discount</p>
            <p>- {this.state.coupon.discount}% {this.state.coupon.period} </p>
          </div>
        )
      }
    }
  }

  renderPrice() {
    let price = this.state.price
    if (this.state.discount > 0) {
      price = price * -(this.state.discount / 100 - 1)
    }
    if (this.state.taxPercent > 0) {
      price = price * (this.state.taxPercent / 100 + 1)
    }
    if (this.props.selected !== 'basic') {
      return (
        <div className="total info">
          <p>Total</p>
          <p>${formatPrice(price)} {this.state.cycle}</p>
        </div>
      )
    } else {
      return (<div className="total info">
        <p>${formatPrice(price)} {this.state.cycle} after 30 days</p>
      </div>)
    }

  }

  renderDiscountButton() {
    const discountClass = this.state.error.indexOf('discount') > -1 ? 'red-outline' : ''
    if (this.state.discount === 0 && this.props.selected !== 'business' && this.props.selected !== 'fund') {
      return (<div className="discount">
        <input type="text" placeholder="Discount code" ref="discount" className={discountClass}/>
        <button className="apply-discount" onClick={this.applyDiscount}>Apply</button>
      </div>)
    }
  }

  renderPayButton() {
    if (!this.state.validatingPayment) {
      if (this.props.selected === 'basic') {
        return <button className="subscribe" onClick={this.submit}>Start free month</button>
      } else {
        return <button className="subscribe" onClick={this.submit}>Subscribe</button>
      }

    } else {
      return <div className="subscribe"><i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i></div>
    }
  }

  applyDiscount() {
    let error = ''
    var coupon = discountCodes.filter(coupon => {
      if (coupon.code === this.refs.discount.value) {
        if (coupon.plans.indexOf(this.props.selected) > -1) {
          return true
        } else {
          error = 'Code invalid for this plan'
        }
      }
      return false
    })[0]

    if (coupon) {
      this.setState({ discount: coupon.discount, coupon: coupon })
    } else if (error) {
      this.setState({ error: error, errorType: 'discount' })
    } else {
      this.setState({ error: 'Invalid discount code', errorType: 'discount' })
    }
  }

  submit() {
    if (!this.state.checked) {
      this.setState({ error: 'You must read and agree to the Terms of Service', errorType: 'tos' })
      return
    } else if (this.refs.name.value.indexOf(' ') === -1) {
      this.setState({ error: 'Please enter your full name', errorType: 'payment' })
      return
    }

    this.setState({ validatingPayment: true, error: '', errorType: '' })

    const card = {
      number: this.refs.cardNumber.value.replace(/\s+/g, ''),
      month: this.refs.cardExpiry.value.split(' / ')[0],
      year: this.refs.cardExpiry.value.split(' / ')[1],
      cvc: this.refs.cardCvc.value
    }

    cc.validateNewLocation(this.state.countryCode, this.refs.city.value, this.refs.zip.value, this.refs.address.value)
    .then(() => {
      cc.checkPayment(card)
      .then(token => this.createCustomer(token))
      .catch(error => this.setState({ error: error, errorType: 'payment', validatingPayment: false }))
    })
    .catch(error => this.setState({ error: error, errorType: 'address', validatingPayment: false }))
  }

  createCustomer(token) {
    store.session.set('name', this.refs.name.value)
    cc.createCustomer2(token, this.props.selected, this.state.cycle, this.state.taxPercent, this.state.coupon.code)
    .then(() => {
      console.log('||| SUCCESFUL PAYMENT |||')
    })
    .catch((e) => {
      this.setState({error: String(e), validatingPayment: false})
    })
  }

  renderError(errorChecker) {
    if (errorChecker === this.state.errorType) {
      return <p className="error"><i className="fa fa-exclamation" aria-hidden="true"></i>{this.state.error}</p>
    }
  }

  toggleTerms() {
    this.setState({ showTerms: !this.state.showTerms })
  }

  render() {
    const countryClass = this.state.error.indexOf('country') > -1 ? 'red-outline' : ''
    const cityClass = this.state.error.indexOf('city') > -1 ? 'red-outline' : ''
    const zipClass = this.state.error.indexOf('postal') > -1 ? 'red-outline' : ''
    const addressClass = this.state.error.indexOf('address') > -1 ? 'red-outline' : ''
    const nameClass = this.state.error.indexOf('name') > -1 ? 'red-outline' : ''
    const cardNumberClass = this.state.error.indexOf('card number') > -1 ? 'red-outline' : ''
    const expiryClass = this.state.error.indexOf('expiry') > -1 ? 'red-outline' : ''
    const cvcClass = this.state.error.indexOf('security') > -1 ? 'red-outline' : ''
    const tosClass = this.state.error.indexOf('Terms') > -1 ? 'checker red-outline' : 'checker'

    let checkbox = <div className={tosClass} onClick={this.toggleCheckBox}></div>
    if (this.state.checked) { checkbox = <div className="checker" onClick={this.toggleCheckBox}><i className="fa fa-check" aria-hidden="true"></i></div> }

    return (
      <div className="billing signup-content">
        <div className="left">
          <h2>Checkout</h2>
          <form className="billing-form">
            <div className="beside">
              <h3>Billing address</h3>
              {this.renderError('address')}
            </div>
            <div className="divider"/>

            <div className="location-inputs">
              <Select
                name="selected-country"
                ref="countrySelect"
                options={countries}
                className={countryClass}
                clearable={false}
                value={this.state.countryName}
                placeholder={this.state.countryName}
                onChange={this.selectCountry}
                />
              <div className="beside">
                <div className="icon-input"><i className="fa fa-building" aria-hidden="true"></i><input className={cityClass} type="text" placeholder="City" ref="city"/></div>
                <div className="icon-input"><i className="fa fa-map" aria-hidden="true"></i><input className={zipClass} type="text" placeholder="Postal code" ref="zip"/></div>
              </div>
              <div className="icon-input"><i className="fa fa-home" aria-hidden="true"></i><input className={addressClass} type="text" placeholder="Street address" ref="address"/></div>
            </div>

            <div className="creditcard-inputs">
              <div className="beside">
                <h3>Payment details</h3>
                {this.renderError('payment')}
              </div>
              <div className="divider"/>
              <div className="icon-input"><i className="fa fa-user" aria-hidden="true"></i><input className={nameClass} type="text" placeholder="Name on card" ref="name"/></div>
              <div className="icon-input">
                <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                <input type="text" className={cardNumberClass} placeholder="Card number" onKeyUp={this.ccFormat} ref="cardNumber"/>
              </div>
              <div className="beside">
                <div className="icon-input">
                  <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                  <input type="text" className={expiryClass} placeholder="MM / YY" onKeyUp={this.dateFormat} ref="cardExpiry"/>
                </div>
                <div className="icon-input">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input type="number" className={cvcClass} placeholder="CVC" onKeyUp={this.cvcFormat} ref="cardCvc"/>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="right">
          <div className="top">
            <div className="steps">
              <div className="step"><div className="circle"/><button className="last-page" onClick={this.props.lastPage}>Choose a plan</button></div>
              <div className="step"><div className="circle selected"/><p>Billing</p></div>
              <div className="step"><div className="circle"/><p>Done</p></div>
            </div>
            <div className="line"/>
          </div>

          <div className="plan-name info">
            <p>Plan</p>
            <p>{this.props.selected}</p>
          </div>
          {this.renderDiscount()}
          {this.renderTax()}
          {this.renderPrice()}
          <div className="right-error">{this.renderError('discount')}</div>
          {this.renderDiscountButton()}
          {this.renderError('tos')}
          <div className="ToC">
            {checkbox}
            <p>I've read and agree to the <button onClick={this.toggleTerms}>Terms of Service</button></p>
          </div>
          {this.renderPayButton()}
        </div>
        {this.state.showTerms ? <div className="terms-container"><button className="close-btn" onClick={this.toggleTerms}><i className="material-icons">close</i></button><Terms/></div> : ''}
      </div>
    )
  }
}

export default Billing
