import React, { Component } from 'react'
import Select from 'react-select'
import cc from '../../../cc'
import store from '../../../store'
import countries from '../../../data/countries'
import _ from 'underscore'

class AccountInfo extends Component {
  constructor(props) {
    super(props)

    let countryText = 'Country'
    let countryCode
    let taxPercent = 0
    if (store.getState().session.location.country_code && store.getState().session.location.country_name) {
      countryText = store.getState().session.location.country_name
      countryCode = store.getState().session.location.country_code

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

  calculateTax = (countryCode) => {
    cc.calculateTax(countryCode).then(tax => {
      this.setState({ taxPercent: tax })
    })
  }

  selectCountry = (country) => {
    this.setState({
      countryName: country.label,
      countryCode: country.value,
    })
    this.calculateTax(country.value)
  }

  checkForDuplicates = (email) => {
    const headers = new Headers()
    headers.append('Authorization', `Basic ${store.getState().settings.basicAuth}`)
    headers.append('Content-Type', `application/json`)
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username: this.refs.email.value.toLowerCase() })
    }
    return fetch(`https://baas.kinvey.com/rpc/kid_rJRC6m9F/check-username-exists`, options)
  }

  validateAddress = () => {
    return new Promise((resolve, reject) => {
      const country = _.where(countries, { value: this.state.countryCode })
      if (country[0]) {
        cc.calculateTax(this.state.countryCode).then(tax => {
          if (!tax) {
            // If country isn't taxable
            resolve()
          } else {
            // If country is taxable
            cc.validateNewLocation(this.state.countryCode, this.refs.city.value, this.refs.zip.value, this.refs.address.value)
            .then(resolve)
            .catch(error => {
              reject(error)
            })
          }
        })
      } else {
        reject('Select your country')
      }
    })
  }

  submit = (e) => {
    e.preventDefault()

    this.setState({ validating: true, error: '', errorType: '' })
    const email = this.refs.email.value.toLowerCase()
    const password = this.refs.password.value

    if (email && password) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(email)) {
        this.checkForDuplicates(email)
        .then(response => response.json())
        .then(json => {
          if (!json.usernameExists) {
            this.props.setSessionItem('email', email)
            this.props.setSessionItem('username', email)
            this.props.setSessionItem('password', password)

            this.validateAddress()
            .then(() => {

              this.props.setSessionItem('address', {
                countryName: this.state.countryName,
                countryCode: this.state.countryCode,
                city: this.refs.city ? this.refs.city.value : '',
                zip: this.refs.zip ? this.refs.zip.value : '',
                address: this.refs.address ? this.refs.address.value : ''
              })

              this.props.setTax(this.state.taxPercent)
              this.props.nextPage()
            })
            .catch(error => {
              console.log(error)
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

  renderAddressInfo = () => {
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
    const emailClass = this.state.errorType === 'email' ? 'red-outline' : ''
    const passwordClass = this.state.errorType === 'password' ? 'red-outline' : ''
    const countryClass = this.state.errorType.indexOf('country') > -1 ? 'red-outline' : ''

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
