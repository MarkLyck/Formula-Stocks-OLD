import React from 'react'

class Recommendations extends React.Component {
  constructor() {
    super()

    this.changeVideo = this.changeVideo.bind(this)
    this.playVideo = this.playVideo.bind(this)
    this.pauseVideo = this.pauseVideo.bind(this)
    this.state = { plan: 'business', video: 'paused' }
  }

  changeVideo(plan) {
    this.setState({plan: plan, video: 'paused'});
  }
  playVideo() {
    this.refs.video.play();
    this.setState({video: 'playing'});
  }
  pauseVideo() {
    this.refs.video.pause();
    this.setState({video: 'paused'});
  }

  render() {
    let basClass, preClass, busClass, funClass;
    if (this.state.plan === 'premium') { preClass='selected' }
    if (this.state.plan === 'business') { busClass='selected' }
    if (this.state.plan === 'fund') { funClass='selected' }

    let yAxis = (
      <ul className="y-axis">
        <li>300%</li>
        <li>200%</li>
        <li>100%</li>
        <li>0%</li>
      </ul>
    )

    let xAxis = (
      <ul className="x-axis">
        <li>0</li>
        <li>1 year</li>
        <li>2 years</li>
        <li>3 years</li>
        <li>4 years</li>
      </ul>
    )

    let video;
    if (this.state.video === 'paused') {
      video = (
        <div className="video-container paused" onClick={this.playVideo}>
          {yAxis}
          {xAxis}
          <video src={`/assets/videos/recommendations_${this.state.plan}.mp4`} ref='video' poster={`/assets/videos/posters/${this.state.plan}.png`}/>
        </div>
      )
    } else if (this.state.video === 'playing') {
      video = (
        <div className="video-container playing" onClick={this.pauseVideo}>
          {yAxis}
          {xAxis}
          <video src={`/assets/videos/recommendations_${this.state.plan}.mp4`} ref='video' poster={`/assets/videos/posters/${this.state.plan}.png`}/>
        </div>
      )
    }

    return (
      <section className="recommendations">
        <h2 className="title">Scatter plot of returns</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <p>
              Click play to watch the historical outcomes of all Formula Stocks recommendations.<br/><br/>

              In the videos you will see price movements in white, indicating the smoothed path price
              has taken from buy recommendation to sell recommendation.<br/><br/>

              In the resulting scatter plot, white indicate winning positions, grey losing.<br/><br/>

              Our recommendations are rules based, and the rules do not change.
              So we can quantify every call ever made.<br/><br/>

              It becomes clear that risk/reward is skewed very significantly
              in favour of reward.<br/><br/>
              You can view a total of 10,190 recommendations.
            </p>
          </div>
          <div className="right">
            <div className="plans">
              <button onClick={this.changeVideo.bind(null, 'premium')} className={preClass}>Premium</button>
              <button onClick={this.changeVideo.bind(null, 'business')} className={busClass}>Business</button>
              <button onClick={this.changeVideo.bind(null, 'fund')} className={funClass}>Fund</button>
            </div>
            {video}
          </div>
        </div>
      </section>
    )
  }
}

export default Recommendations
