import React from 'react'
import Select from 'react-select'
import cc from '../../../../cc'
import store from '../../../../store'
import countries from '../../../../data/countries'
import _ from 'underscore'

class Billing extends React.Component {
  constructor(props) {
    super(props)

    let plan = store.plans.get(this.props.selected).toJSON()

    let cycle = ' monthly'
    if (plan.name === 'business' || plan.name === 'fund') {
      cycle = ' annually'
    }

    let priceText = `Subscribe for $${cc.commafy(plan.price)} ${cycle}`
    if (plan.name === 'basic') {
      priceText = 'Start free trial'
    }

    let countryText = 'Country of residence'
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
      cycle: cycle
    }
  }

  render() {
    return (
      <div className="billing signup-content">
        <div className="left">
          <h2>Billing information</h2>
          <form className="billing-form">
            <div className="location-inputs">
              <input type="text" placeholder="Full name"/>
              <Select name="selected-country"
                ref="countrySelect"
                options={countries}
                clearable={false}
                value={this.state.countryName}
                placeholder={this.state.countryName}
                onChange={this.selectCountry}
                />
              <div className="beside">
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="Postal code"/>
              </div>
              <input type="text" placeholder="Street address"/>
            </div>

            <div className="divider" />

            <div className="creditcard-inputs">
              <input type="text" placeholder="card number"/>
              <div className="beside">
                <input type="text" placeholder="MM / YY"/>
                <input type="number" placeholder="CVC"/>
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
          <div className="plan-price info">
            <p>Price</p>
            <p>{this.props.renderPrice()}</p>
          </div>
          <button>Pay</button>
        </div>
      </div>
    )
  }
}

export default Billing
