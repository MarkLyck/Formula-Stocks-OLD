import React from 'react'

class CollapseSegment extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    if (!this.state.expanded) {
      return (
        <div className="collapsable collapsed" style={{ background: this.props.bg ? this.props.bg : '' }}>
          <button onClick={ () => this.setState({ expanded: !this.state.expanded }) } style={{ background: this.props.bg ? this.props.bg : '' }}>
            <h2 className="title">{this.props.title}</h2>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
      )
    } else {
      return (
        <div className="collapsable expanded" style={{ background: this.props.bg ? this.props.bg : '' }}>
          <button onClick={ () => this.setState({ expanded: !this.state.expanded }) } style={{ background: this.props.bg ? this.props.bg : '' }}>
            <h2 className="title">{this.props.title}</h2>
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </button>
          {this.props.children}
        </div>
      )
    }
  }
}

export default CollapseSegment
