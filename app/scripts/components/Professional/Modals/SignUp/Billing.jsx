import React from 'react'
import Select from 'react-select'
import cc from '../../../../cc'
import store from '../../../../store'
import countries from '../../../../data/countries'
import _ from 'underscore'

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

    this.ccFormat = this.ccFormat.bind(this)
    this.dateFormat = this.dateFormat.bind(this)
    this.cvcFormat = this.cvcFormat.bind(this)

    this.showTerms = this.showTerms.bind(this)

    this.submit = this.submit.bind(this)

    let plan = store.plans.get(this.props.selected).toJSON()

    let cycle = ' monthly'
    if (plan.name === 'business' || plan.name === 'fund') {
      cycle = ' annually'
    }

    let priceText = `Subscribe for $${cc.commafy(plan.price)} ${cycle}`
    if (plan.name === 'basic') {
      priceText = 'Start free trial'
    }

    let countryText = 'Country'
    let countryCode;
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
      cycle: cycle
    }
  }

  calculateTax(countryCode) {
    cc.calculateTax(countryCode).then((tax) => {
      this.setState({ taxPercent: tax })
    })
  }

  toggleCheckBox() {
    this.setState({ checked: !this.state.checked })
  }

  ccFormat() {
    this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value)
  }

  dateFormat(e) {
    this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value)
  }

  cvcFormat() {
    this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value)
  }

  selectCountry(country) {
    this.setState({
      countryName: country.label,
      countryCode: country.value,
    })
    this.calculateTax(country.value)
  }

  renderTax() {
    if (this.state.taxPercent > 0) {
      return (
        <div className="tax info">
          <p>Tax</p>
          <p>${this.state.taxPercent}</p>
        </div>
      )
    }
  }

  renderDiscount() {
    if (this.state.discount > 0) {
      return (
        <div className="tax info">
          <p>Discount</p>
          <p>- ${(this.state.price * (this.state.discount / 100 + 1) - this.state.price).toFixed(2)} </p>
        </div>
      )
    }
  }

  renderDiscountButton() {
    if (this.state.discount === 0) {
      return (<div className="discount">
        <input type="text" placeholder="Discount code"/>
        <button className="apply-discount" onClick={this.applyDiscount}>Apply</button>
      </div>)
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
    return (
      <div className="tax info">
        <p>Total</p>
        <p>${price} {this.state.cycle}</p>
      </div>
    )
  }

  applyDiscount() {
    this.setState({ discount: 10 })
  }

  showTerms() {
    store.session.set('showModal', 'terms')
  }

  submit() {
    this.props.nextPage()
  }

  render() {
    let checkbox = <div className="checker" onClick={this.toggleCheckBox}></div>
    if (this.state.checked) {
      checkbox = <div className="checker" onClick={this.toggleCheckBox}><i className="fa fa-check" aria-hidden="true"></i></div>
    }
    return (
      <div className="billing signup-content">
        <div className="left">
          <h2>Checkout</h2>
          <form className="billing-form">
            <h3>Billing address</h3>
            <div className="divider"/>
            <div className="location-inputs">
              <Select name="selected-country"
                ref="countrySelect"
                options={countries}
                clearable={false}
                value={this.state.countryName}
                placeholder={this.state.countryName}
                onChange={this.selectCountry}
                />
              <div className="beside">
                <div className="icon-input"><i className="fa fa-building" aria-hidden="true"></i><input type="text" placeholder="City"/></div>
                <div className="icon-input"><i className="fa fa-map" aria-hidden="true"></i><input type="text" placeholder="Postal code"/></div>
              </div>
              <div className="icon-input"><i className="fa fa-home" aria-hidden="true"></i><input type="text" placeholder="Street address"/></div>
            </div>

            <div className="creditcard-inputs">
              <h3>Payment details</h3>
              <div className="divider"/>
              <div className="icon-input"><i className="fa fa-user" aria-hidden="true"></i><input type="text" placeholder="Name on card"/></div>
              <div className="icon-input">
                <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                <input type="text" placeholder="Card number" onKeyUp={this.ccFormat} ref="cardNumber"/>
              </div>
              <div className="beside">
                <div className="icon-input">
                  <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                  <input type="text" placeholder="MM / YY" onKeyUp={this.dateFormat} ref="cardExpiry"/>
                </div>
                <div className="icon-input">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input type="number" placeholder="CVC" onKeyUp={this.cvcFormat} ref="cardCvc"/>
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
          {this.renderTax()}
          {this.renderDiscount()}
          {this.renderPrice()}
          {this.renderDiscountButton()}
          <div className="ToC">
            {checkbox}
            <p>I've read and agree to the <button onClick={this.showTerms}>Terms of Service</button></p>
          </div>
          <button className="subscribe" onClick={this.submit}>Subscribe</button>
        </div>
      </div>
    )
  }
}

export default Billing
