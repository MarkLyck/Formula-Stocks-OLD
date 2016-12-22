import $ from 'jquery'
import _ from 'underscore'
import React from 'react'

import store from '../../store'
import Modal from '../Modal'

import SelectPlanForm from './SelectPlanForm'
import SignupForm from './SignupForm'
import PaymentForm from './PaymentForm.jsx'

const Signup = React.createClass({
  getInitialState: function() {
    return {modal: 'signup', formAnimation: 'bounce-down', passedProps: {}}
  },
  closeModal(e) {
    if (e) {
      if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('form-modal-container') !== -1 ) {
        this.setState({slideOut: true, formAnimation: 'slide-out'})
        window.setTimeout(() => {
          store.settings.history.push('/')
        }, 300)
      }
    }
  },
  goToModal(newModal, passedProps) {
    this.setState({modal: newModal, passedProps: passedProps, formAnimation: 'slide-in-right'})
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
    if (this.state.modal === 'payment') {
      modalStyles = {
        width: '60%',
        maxWidth: '700px',
        background: 'none',
      }
    }

    let modalContent;
    if (this.state.modal === 'signup') {
      modalContent = <SignupForm goToModal={this.goToModal} passedProps={this.state.passedProps} formAnimation={this.state.formAnimation}/>
    } else if (this.state.modal === 'selectPlan') {
      modalContent = <SelectPlanForm goToModal={this.goToModal} passedProps={this.state.passedProps} formAnimation={this.state.formAnimation}/>
    } else if (this.state.modal === 'payment') {
      modalContent = <PaymentForm goToModal={this.goToModal} passedProps={this.state.passedProps} formAnimation={this.state.formAnimation}/>
    }

    return (
      <Modal closeModal={this.closeModal} containerStyles={containerStyles} modalStyles={modalStyles}>
        {modalContent}
      </Modal>
    )
  }
})

export default Signup
