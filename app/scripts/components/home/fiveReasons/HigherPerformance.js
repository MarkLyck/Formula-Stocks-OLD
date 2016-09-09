import React from 'react'
import $ from 'jquery'
import Scroll from 'react-scroll'

import store from '../../../store'



const HigherPerformance = React.createClass({
  getInitialState() {
    return {animate: false}
  },
  componentDidMount() {
    $(window).on('scroll', this.animate)
  },
  componentWillUnmount() {
    $(window).off('scroll', this.animate)
  },
  animate() {
    let hT = $(this.refs.content).offset().top
    let hH = $(this.refs.content).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      console.log('animate');
      this.setState({animate: true})
      $(window).off('scroll', this.animate)
    };
  },
  tryIt() {
    store.settings.history.push('/signup')
    sessionStorage.selectedPlan = 'basic'
  },
  render() {
    let Link = Scroll.Link;

    let imgClass;
    if (this.state.animate) {
      imgClass = 'slide-up-mockup-img'
    }

    return (
      <div className="bg-white split-section higher-performance">
        <div className="content" ref="content">
          <div className="left">
            <h2 className="title">Higher performance at a lower cost</h2>
            <p>
                Formula Stocks technology greatly improves odds for investment performance above
                the market averages.<br/><br/>

                Convenient, time saving and easy to use.<br/><br/>


                It comes at a low flat fee, typically providing considerable savings compared
                to other methods of investing, such as funds or money management.<br/><br/>

                Higher performance at a lower cost. What’s not to like?
            </p>
            <div className="cta">
              <button className="filled-btn" onClick={this.tryIt}>Try it for free!</button>
              <Link className="outline-btn blue-color" to="ourProducts" smooth={true} offset={-100} duration={500}>Learn more</Link>
            </div>
          </div>
          <div className="right">
            <img src="assets/images/Ipad.png" className={imgClass}/>
          </div>
        </div>
      </div>
    )
  }
})

export default HigherPerformance
