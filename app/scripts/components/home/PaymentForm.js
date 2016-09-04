import React from 'react'

import Select from 'react-select'

import cc from '../../cc'
import store from '../../store'

import countries from '../../data/countries'

const PaymentForm = React.createClass({
  getInitialState() {
    console.log(this.props.passedProps.plan);
    console.log(store.session.toJSON());
    let cycle = ' monthly'
    if (this.props.passedProps.plan === 'business' || this.props.passedProps.plan === 'fund') {
      cycle = ' annually'
    }

    let priceText = `Subscribe for $${cc.commafy(store.plans.get(this.props.passedProps.plan).get('price'))} ${cycle}`
    if (this.props.passedProps.plan === 'basic') {
      priceText = 'Start free trial'
    }

    let countryText = 'Country of residence'
    let countryCode;
    if (store.session.get('location').country_code
        && store.session.get('location').country_name) {
      countryText = store.session.get('location').country_name
      countryCode = store.session.get('location').country_code
    }

    return {
      priceText: priceText,
      price: store.plans.get(this.props.passedProps.plan).get('price'),
      formClass: `payment-form ${this.props.formAnimation}`,
      checked: false,
      validatingPayment: false,
      countryName: countryText,
      countryCode: countryCode,
      taxPercent: 0,
      cycle: cycle}
  },
  componentWillReceiveProps(newProps) {
    this.setState({formClass: `payment-form ${newProps.formAnimation}`})
  },
  ccFormat() {
    this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value)
  },
  dateFormat(e) {
    this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value)
  },
  cvcFormat() {
    this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value)
  },
  calculateTax(countryCode) {
    cc.calculateTax(countryCode).then((tax) => {
      this.setState({taxPercent: tax})
    })
  },
  checkPayment(e) {
    e.preventDefault()

    if (!this.state.validatingPayment) {
      this.setState({validatingPayment: true})
      let location = {
        country_name: this.state.countryName,
        country_code: this.state.countryCode,
        addressLine1: this.refs.address1.value,
        addressLine2: this.refs.address2.value
      }

      cc.validateLocation(location)
      .then(() => {
        this.calculateTax(this.state.countryCode)
          const card = {
            number: this.refs.cardNumber.value.replace(/\s+/g, ''),
            month: this.refs.cardExpiry.value.split(' / ')[0],
            year: this.refs.cardExpiry.value.split(' / ')[1],
            cvc: this.refs.cardCvc.value,
          }

          cc.checkPayment(card)
            .then((token) => {
              if (this.state.checked) {
                this.createCustomer(token)
              } else {
                this.setState({error: 'You must agree to the Terms and Conditions', formClass: 'payment-form shake', validatingPayment: false})
                window.setTimeout(() => {
                  this.setState({formClass: 'payment-form'})
                }, 300)
              }
            })
            .catch((e) => {
              this.setState({error: e, formClass: 'payment-form shake', validatingPayment: false})
              window.setTimeout(() => {
                this.setState({formClass: 'payment-form'})
              }, 300)
            })
      })
      .catch((e) => {
        this.setState({error: e, formClass: 'payment-form shake', validatingPayment: false})
        window.setTimeout(() => {
          this.setState({formClass: 'payment-form'})
        }, 300)
      })






    }
  },
  createCustomer(token) {
    cc.createCustomer(token, this.props.passedProps.plan, this.state.cycle, this.state.taxPercent)
      .then(() => {
        console.log('SUCCESFUL PAYMENT');
      })
      .catch((e) => {
        console.error('charge ERROR: ', e);
        this.setState({error: String(e), formClass: 'payment-form shake', validatingPayment: false})
        window.setTimeout(() => {
          this.setState({formClass: 'payment-form'})
        }, 300)
      })
  },
  toggleCheckBox() {
    this.setState({checked: !this.state.checked})
  },
  selectCountry(country) {
    this.setState({
      countryName: country.label,
      countryCode: country.value,
    })
    this.calculateTax(country.value)
  },
  showTerms() {
    store.session.set('showModal', 'terms')
  },
  render() {

    let error;
    if (this.state.error) {
      error = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }

    let checkbox = <div className="checker" onClick={this.toggleCheckBox}></div>
    if (this.state.checked) {
      checkbox = <div className="checker" onClick={this.toggleCheckBox}><i className="fa fa-check" aria-hidden="true"></i></div>
    }


    // let payButton =   <input className="pay-button" type="submit" value={this.state.priceText}/>
    let payButton =   <button className="pay-button"><h3>Subscribe for ${cc.commafy(this.state.price)} {this.state.cycle}</h3></button>

    console.log(this.props.passedProps.plan);

    if (this.state.taxPercent > 0 && this.props.passedProps.plan === 'basic') {
      payButton = (<button className="pay-button">
                      <h3>Start free trial</h3>
                      <p className="tax">${cc.commafy(this.state.price * (this.state.taxPercent/100 + 1))} after 30 days</p>
                      <p className="tax">Tax: ${cc.commafy((this.state.price * (this.state.taxPercent/100 + 1)) - this.state.price)}</p>
                    </button>)
    } else if (this.state.taxPercent > 0) {
      payButton = (<button className="pay-button">
                    <h3>Subscribe for ${cc.commafy(this.state.price * (this.state.taxPercent/100 + 1))} {this.state.cycle}</h3>
                    <p className="tax">Tax: ${cc.commafy((this.state.price * (this.state.taxPercent/100 + 1)) - this.state.price)}</p>
                  </button>)
    } else if (this.props.passedProps.plan === 'basic') {
      console.log('else if plan === basic');
      payButton =  (<button className="pay-button">
                      <h3>Start free trial</h3>
                      <p className="tax">${cc.commafy(this.state.price)} after 30 days</p>
                    </button>)
    }
    if (this.state.validatingPayment) {
      payButton =   <div className="pay-button"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
    }

    return (
      <form onSubmit={this.checkPayment} className={this.state.formClass}>

        {error}
        <div className="wrapper">
          <div className="left">
            <h3 className="form-title capitalize">{this.props.passedProps.plan} Plan</h3>

                <Select
                  name="selected-country"
                  ref="countrySelect"
                  options={countries}
                  clearable={false}
                  value={this.state.countryName}
                  placeholder={this.state.countryName}
                  onChange={this.selectCountry}
                  />

            <div className="address-line-1 field input-container">
              <input type="text" placeholder="Address line 1" ref="address1"/>
            </div>
            <div className="address-line-2 field input-container">
              <input type="text" placeholder="Address line 2" ref="address2"/>
            </div>
          </div>
          <div className="right">

            <div className="cc-number input-container">
              <input onKeyUp={this.ccFormat} type="text" placeholder="Card number" ref="cardNumber"/>
            </div>

            <div className="wrapper">
              <div className="card-expiry-date input-container">
                <input onKeyUp={this.dateFormat} type="text" placeholder="MM / YY" ref="cardExpiry"/>
              </div>
              <div className="card-cvc input-container">
                <input onKeyUp={this.cvcFormat} type="text" placeholder="CVC" ref="cardCvc"/>
              </div>
            </div>

            <div className="ToC">
              {checkbox}
              <p>I've read and agree to the <a onClick={this.showTerms}>Terms and Conditions</a></p>
            </div>
            {payButton}
          </div>
        </div>


      </form>
    )
  }
})

export default PaymentForm
