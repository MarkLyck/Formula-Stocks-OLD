import React from 'react'
import _ from 'underscore'
import './modal.css'


const closeModal = (e, closeModal) => {
  if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
    closeModal(e)
  }
}

const Modal = (props) => (
  <div onClick={(e) => closeModal(e, props.closeModal)} className="modal-container" style={props.containerStyles}>
    <div className="modal" style={props.modalStyles} ref="modal">
      {props.children}
    </div>
  </div>
)

export default Modal
