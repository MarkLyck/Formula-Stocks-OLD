import React from 'react'

import cc from '../../cc'
import store from '../../store'

const PaymentForm = React.createClass({
  getInitialState() {
    console.log(this.props.passedProps.plan);
    let priceText = `Pay $${store.plans.get(this.props.passedProps.plan).get('price')}`
    if (this.props.passedProps.plan === 'basic') {
      priceText = 'Start free trial'
    }
    return {priceText: priceText, formClass: "payment-form slide-in-right", checked: false, validatingPayment: false}
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
  checkPayment(e) {
    e.preventDefault()
    if (!this.state.validatingPayment) {
      this.setState({validatingPayment: true})

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
    }
  },
  createCustomer(token) {
    let cycle = 'monthly'
    // console.log(this.props.passedProps.plan);
    if (this.props.passedProps.plan === 'business' || this.props.passedProps.plan === 'fund') {
      cycle = 'annually'
    }

    cc.createCustomer(token, this.props.passedProps.plan, cycle)
      .then(() => {
        console.log('SUCCESFUL PAYMENT');
      })
      .catch((e) => {
        console.log('charge ERROR: ', e);
        this.setState({error: String(e), formClass: 'payment-form shake', validatingPayment: false})
        window.setTimeout(() => {
          this.setState({formClass: 'payment-form'})
        }, 300)
      })
  },
  toggleCheckBox() {
    this.setState({checked: !this.state.checked})
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

    let payButton =   <input className="pay-button" type="submit" value={this.state.priceText}/>
    if (this.state.validatingPayment) {
      payButton =   <div className="pay-button"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
    }

    return (
      <form onSubmit={this.checkPayment} className={this.state.formClass}>
        <h3 className="form-title">Payment</h3>
        {error}

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
          <p>I've read and agree to the <a>Terms and Conditions</a></p>
        </div>

        {payButton}
      </form>
    )
  }
})

export default PaymentForm
