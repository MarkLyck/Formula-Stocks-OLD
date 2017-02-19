import React from 'react'
import Select from 'react-select'
import cc from '../../../cc'
import store from '../../../store'
import countries from '../../../data/countries'
import _ from 'underscore'
import $ from 'jquery'

class AccountInfo extends React.Component {
  constructor(props) {
    super(props)

    this.selectCountry = this.selectCountry.bind(this)
    this.calculateTax = this.calculateTax.bind(this)
    this.renderAddressInfo = this.renderAddressInfo.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
    this.submit = this.submit.bind(this)

    let countryText = 'Country'
    let countryCode
    let taxPercent = 0
    if (store.session.get('location').country_code && store.session.get('location').country_name) {
      countryText = store.session.get('location').country_name
      countryCode = store.session.get('location').country_code

      let country = _.where(countries, { value: countryCode })
      if (country[0].taxPercent) {
        taxPercent = country[0].taxPercent
      }
    }

    this.state = {
      countryName: countryText,
      countryCode: countryCode,
      taxPercent: taxPercent,
      error: '',
      errorType: '',
      validating: false,
    }
  }

  calculateTax(countryCode) {
    cc.calculateTax(countryCode).then((tax) => {
      this.setState({ taxPercent: tax })
    })
  }

  selectCountry(country) {
    this.setState({
      countryName: country.label,
      countryCode: country.value,
    })
    this.calculateTax(country.value)
  }

  checkForDuplicates(email) {
    return $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/?query={"email":"${email}"}`)
  }

  validateAddress() {
    return new Promise((resolve, reject) => {
      const country = _.where(countries, { value: this.state.countryCode })
      if (!country[0] && this.state.countryCode) {
        resolve()
      } else if (country[0]) {
        cc.validateNewLocation(this.state.countryCode, this.refs.city.value, this.refs.zip.value, this.refs.address.value)
        .then(resolve)
        .catch(reject)
      } else {
        reject('Select your country')
      }
    })
  }

  submit(e) {
    e.preventDefault()

    this.setState({ validating: true, error: '', errorType: '' })
    const email = this.refs.email.value.toLowerCase()
    const password = this.refs.password.value

    if (email && password) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(email)) {
        this.checkForDuplicates(email)
        .then(response => {
          if (response.length === 0) {
            store.session.set('email', email)
            store.session.set('password', password)
            this.validateAddress()
            .then(this.props.nextPage)
            .catch(error => {
              store.isSubmitting = false
              this.setState({ error: error, errorType: 'address', validating: false })
            })
          } else {
            this.setState({ validating: false, error: 'Email already exists', errorType: 'email' })
          }
        })
      } else {
        this.setState({ validating: false, error: 'Invalid email', errorType: 'email' })
      }
    } else if (!email) {
      this.setState({ validating: false, error: 'Enter your email', errorType: 'email' })
    } else if (!password) {
      this.setState({ validating: false, error: 'Choose a password', errorType: 'password' })
    }
  }

  renderAddressInfo() {
    if (!this.state.taxPercent) { return null }

    const cityClass = this.state.error.indexOf('city') > -1 ? 'red-outline' : ''
    const zipClass = this.state.error.indexOf('postal') > -1 ? 'red-outline' : ''
    const addressClass = this.state.error.indexOf('address') > -1 ? 'red-outline' : ''

    return (
      <div className="address-info">
        { addressClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-home" aria-hidden="true"></i><input className={addressClass} type="text" placeholder="Street address" ref="address"/></div>
        { cityClass || zipClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="beside">
          <div className="icon-input"><i className="fa fa-building" aria-hidden="true"></i><input className={cityClass} type="text" placeholder="City" ref="city"/></div>
          <div className="icon-input"><i className="fa fa-map" aria-hidden="true"></i><input className={zipClass} type="text" placeholder="Postal code" ref="zip"/></div>
        </div>
      </div>
    )
  }

  render() {
    const emailClass = this.state.error.indexOf('email') > -1 ? 'red-outline' : ''
    const passwordClass = this.state.error.indexOf('password') > -1 ? 'red-outline' : ''
    const countryClass = this.state.error.indexOf('country') > -1 ? 'red-outline' : ''

    return (
      <form className="account-info" onSubmit={this.submit}>
        <h3 className="title">Sign up</h3>
        { emailClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-envelope" aria-hidden="true"></i><input className={emailClass} type="email" placeholder="Email" ref="email"/></div>
        { passwordClass ? <p className="error-text">{this.state.error}</p> : '' }
        <div className="icon-input"><i className="fa fa-lock" aria-hidden="true"></i><input className={passwordClass} type="password" placeholder="Password" ref="password"/></div>
        { countryClass ? <p className="error-text">{this.state.error}</p> : '' }
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
        {this.renderAddressInfo()}
        <input type="submit" value="Next"/>
      </form>
    )
  }
}

export default AccountInfo
