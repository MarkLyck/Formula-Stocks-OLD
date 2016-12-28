import React from 'react'

class CollapseSegment extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    if (!this.state.expanded) {
      return (
        <div className="collapsable collapsed">
          <button onClick={() => this.setState({ expanded: !this.state.expanded })}>
            <h2 className="title">{this.props.title}</h2>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
      )
    } else {
      return (
        <div className="collapsable expanded">
          <button onClick={() => this.setState({ expanded: !this.state.expanded })}>
            <h2 className="title">{this.props.title}</h2>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <div className="underline"/>
          {this.props.children}
        </div>
      )
    }
  }
}

export default CollapseSegment
