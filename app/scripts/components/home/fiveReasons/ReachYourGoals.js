import React from 'react'
import $ from 'jquery'

const ReachYourGoals = React.createClass({
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
      this.setState({animate: true})
      $(window).off('scroll', this.animate)
    };
  },
  render() {
    let imgClass;
    if (this.state.animate) {
      imgClass = 'slide-up-reach-goal-img'
    }
    return (
      <section className="split-section bg-gray reach-your-goals">
        <div className="content" ref="content">
          <div className="left">
            <img className={imgClass} src="assets/images/man-at-computer.png" ref="img"/>
          </div>
          <div className="right">
            <h2 className="title">Reach your goals!</h2>
            <p>
              To reach your goals, whether it is to live a dream, retire
              comfortably, or simply make your savings grow - you’ll also
              need a strategy.<br/><br/>

              A strategy, which will help you systematically buy low,
              and sell high. Formula Stocks makes that easy.
            </p>
          </div>
        </div>
      </section>
    )
  }
})

export default ReachYourGoals
