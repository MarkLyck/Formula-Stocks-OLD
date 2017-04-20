import React from 'react'
import './scatterPlot.css'

import basic from './videos/recommendations_basic.mp4'
import premium from './videos/recommendations_premium.mp4'
import business from './videos/recommendations_business.mp4'
import fund from './videos/recommendations_fund.mp4'

import basicPoster from './videos/basic.png'
import premiumPoster from './videos/premium.png'
import businessPoster from './videos/business.png'
import fundPoster from './videos/fund.png'

const videos = {
  basic: {
    video: basic,
    poster: basicPoster
  },
  premium: {
    video: premium,
    poster: premiumPoster
  },
  business: {
    video: business,
    poster: businessPoster
  },
  fund: {
    video: fund,
    poster: fundPoster
  }
}

class ScatterPlot extends React.Component {
  constructor() {
    super()

    this.changeVideo = this.changeVideo.bind(this)
    this.playVideo = this.playVideo.bind(this)
    this.pauseVideo = this.pauseVideo.bind(this)
    this.state = { plan: 'premium', video: 'paused' }
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
    if (this.state.plan === 'basic') { basClass='selected' }
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
          {/* <video src={`/assets/videos/recommendations_${this.state.plan}.mp4`} ref='video' poster={`/assets/videos/posters/${this.state.plan}.png`}/> */}
          <video src={videos[this.state.plan].video} ref='video' poster={videos[this.state.plan].poster}/>
        </div>
      )
    } else if (this.state.video === 'playing') {
      video = (
        <div className="video-container playing" onClick={this.pauseVideo}>
          {yAxis}
          {xAxis}
          <video src={videos[this.state.plan].video} ref='video' poster={videos[this.state.plan].poster}/>
          {/* <video src={`/assets/videos/recommendations_${this.state.plan}.mp4`} ref='video' poster={`/assets/videos/posters/${this.state.plan}.png`}/> */}
        </div>
      )
    }

    return (
      <section className="recommendations section">
        <h2 className="title">Scatter plot of returns</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <p>
              Click play to watch the historical outcomes of all Formula Stocks
              recommendations.<br/><br/>

              In the videos you will see price movements in white, illustrating the
              approximated path prices have taken from purchase to sale recommendation.<br/><br/>

              In the resulting scatter plot, white indicates winning positions and grey losing.<br/><br/>

              Our recommendations are rules based. So we can quantify every call ever made.<br/><br/>

              You will see that risk/reward is skewed very significantly in favor of reward.<br/><br/>

              A total of 10,190 recommendations can be viewed.
            </p>
          </div>
          <div className="right">
            <div className="plans">
              {this.props.path !== '/pro' ? <button onClick={this.changeVideo.bind(null, 'basic')} className={basClass}>Basic</button> : ''}
              <button onClick={this.changeVideo.bind(null, 'premium')} className={preClass}>Premium</button>
              <button onClick={this.changeVideo.bind(null, 'business')} className={busClass}>Business</button>
              {this.props.path === '/pro' ? <button onClick={this.changeVideo.bind(null, 'fund')} className={funClass}>Fund</button> : ''}
            </div>
            {video}
          </div>
        </div>
      </section>
    )
  }
}

export default ScatterPlot
