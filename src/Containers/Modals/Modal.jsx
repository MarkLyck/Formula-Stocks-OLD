import React from 'react'
import _ from 'underscore'
import './modal.css'


const closeModal = (e, closeModal) => {
  if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
    closeModal(e)
  }
}

class Modal extends React.Component {
  render() {
    const { containerStyles, modalStyles, children } = this.props

    return (
      <div onClick={(e) => closeModal(e, this.props.closeModal)} className="modal-container" style={containerStyles}>
        <div className="modal" style={modalStyles} ref="modal">
          {children}
        </div>
      </div>
    )
  }
}

export default Modal
