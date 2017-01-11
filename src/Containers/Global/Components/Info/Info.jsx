import React from 'react'
import './info.css'

class Info extends React.Component {
  render() {
    return (
      <div className="info-circle">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <div className="explanation">
          <h3>{this.props.title}</h3>
          <div>{this.props.explanation}</div>
        </div>
      </div>
    )
  }
}

export default Info
