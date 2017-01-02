import React from 'react'

class Billing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="billing signup-content">
        <div className="left">
          <form className="billing-form">
            <input/>
          </form>
        </div>
        <div className="right">
          <div className="steps">
            <div className="step"><div className="circle"/><p>Choose a plan</p></div>
            <div className="step"><div className="circle selected"/><p>Billing</p></div>
            <div className="step"><div className="circle"/><p>Done</p></div>
          </div>
          <div className="line"/>
        </div>
      </div>
    )
  }
}

export default Billing
