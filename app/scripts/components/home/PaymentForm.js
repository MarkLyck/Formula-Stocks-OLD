import React from 'react'

import cc from '../../cc'
import store from '../../store'

const PaymentForm = React.createClass({
  getInitialState() {
    return {price: 100, formClass: "payment-form slide-in-right", checked: false}
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
    const card = {
      number: this.refs.cardNumber.value.replace(/\s+/g, ''),
      month: this.refs.cardExpiry.value.split(' / ')[0],
      year: this.refs.cardExpiry.value.split(' / ')[1],
      cvc: this.refs.cardCvc.value,
    }
    cc.checkPayment(card)
      .then((token) => {
        this.chargeCard(token)
      })
      .catch((e) => {
        this.setState({error: e, formClass: 'payment-form shake'})
        window.setTimeout(() => {
          this.setState({formClass: 'payment-form'})
        }, 300)
      })
  },
  chargeCard(token) {
    console.log('charge card running');
    cc.chargeCard(token, this.state.quantity)
      .then(() => {
        console.log('SUCCESFUL PAYMENT');
        console.log(store.session);
        store.session.set('showModal', 'success-payment')
      })
      .catch((e) => {
        console.log('charge ERROR: ', e);
        this.setState({error: e, formClass: 'payment-form shake'})
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

        <input className="pay-button" type="submit" value={`Pay $${this.state.price}`}/>
      </form>
    )
  }
})

export default PaymentForm
