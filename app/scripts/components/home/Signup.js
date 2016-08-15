import $ from 'jquery'
import _ from 'underscore'
import React from 'react'

import store from '../../store'
import Modal from '../Modal'

import SelectPlanForm from './SelectPlanForm'
import SignupForm from './SignupForm'
import PaymentForm from './PaymentForm'

const Signup = React.createClass({
  getInitialState: function() {
    return {modal: 'payment', formClasses: 'signup bounce-down'}
  },
  closeModal(e) {
    if (e) {
      if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1 ) {
        this.setState({slideOut: true, formClasses: 'signup slide-out'})
        window.setTimeout(() => {
          store.settings.history.push('/')
        }, 300)
      }
    }
  },
  goToModal(newModal) {
    this.setState({modal: newModal})
  },
  render: function() {
    let containerStyles = {animation: '300ms fadeIn'}

    if (this.state.slideOut) {
      containerStyles = {background: 'rgba(0,0,0,0)'}
    }

    let modalStyles = {
      width: '60%',
      maxWidth: '400px',
      background: 'none',
    }

  let modalContent;
  if (this.state.modal === 'signup') {
    modalContent = <SignupForm goToModal={this.goToModal}/>
  } else if (this.state.modal === 'selectPlan') {
    modalContent = <SelectPlanForm goToModal={this.goToModal}/>
  } else if (this.state.modal === 'payment') {
    modalContent = <PaymentForm goToModal={this.goToModal}/>
  }

    return (
      <Modal closeModal={this.closeModal} containerStyles={containerStyles} modalStyles={modalStyles}>
        {modalContent}
      </Modal>
    )
  }
})

export default Signup
