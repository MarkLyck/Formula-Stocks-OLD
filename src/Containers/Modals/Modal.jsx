import React from 'react'
import _ from 'underscore'
import './modal.css'

class Modal extends React.Component {
  closeModal(e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
      this.props.closeModal(e)
    }
  }
  render() {
    return (
      <div onClick={this.closeModal.bind(this)} className="modal-container" style={this.props.containerStyles}>
        <div onScroll={this.scroll} className="modal" style={this.props.modalStyles} ref="modal">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
