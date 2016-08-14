import React from 'react'

const ProfileCard = React.createClass({
  render() {
    let topStyle = {
      backgroundImage: `url("assets/images/profiles/${this.props.imgName}.jpg")`
    }
    return (
      <div className="profile">
        <div className="top" style={topStyle}></div>
        <div className="bottom">
          <h3>{this.props.name}</h3>
          <h4>{this.props.title}</h4>
        </div>
      </div>
    )
  }
})

export default ProfileCard
