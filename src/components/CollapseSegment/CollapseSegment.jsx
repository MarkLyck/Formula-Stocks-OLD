import React from 'react'
import './collapseSegment.css'

class CollapseSegment extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    if (!this.state.expanded) {
      return (
        <div className="collapsable collapsed" style={{ background: this.props.bg ? this.props.bg : '' }}>
          <div className="toggle" onClick={ () => this.setState({ expanded: !this.state.expanded }) } style={{ background: this.props.bg ? this.props.bg : '' }}>
            <h2 className="title">{this.props.title}</h2>
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        </div>
      )
    } else {
      return (
        <div className="collapsable expanded" style={{ background: this.props.bg ? this.props.bg : '' }}>
          <div className="toggle" onClick={ () => this.setState({ expanded: !this.state.expanded }) } style={{ background: this.props.bg ? this.props.bg : '' }}>
            <h2 className="title">{this.props.title}</h2>
            <i className="material-icons">keyboard_arrow_up</i>
          </div>
          {this.props.children}
        </div>
      )
    }
  }
}

export default CollapseSegment
