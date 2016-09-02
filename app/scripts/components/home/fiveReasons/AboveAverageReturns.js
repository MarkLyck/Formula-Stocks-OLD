import React from 'react'
import $ from 'jquery'

const AboveAverageReturns = React.createClass({
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
    let hT = $(this.refs.right).offset().top
    let hH = $(this.refs.right).outerHeight()
    let wH = $(window).height()

    if ($(window).scrollTop() > (hT + hH - wH)) {
      this.setState({animate: true})
      $(window).off('scroll', this.animate)
    };
  },
  render() {
    let p1, p2, p3, p4, p5, p6, p7;
    if (this.state.animate) {
      p1 = 'fade-in p1'
      p2 = 'fade-in p2'
      p3 = 'fade-in p3'
      p4 = 'fade-in p4'
      p5 = 'fade-in p5'
      p6 = 'fade-in p6'
      p7 = 'fade-in p7'
    }

    return (
      <section className="split-section above-average-returns">
        <div className="content">
          <div className="left">
            <h2 className="title">Prefer above-average returns?</h2>
            <p>
              The world is full of investment information.
              Because this information is offered to
              a large number of people,
              the market has already adjusted to it and priced it in,
              when you receive it.  <br/><br/>

              So in order to outperform the markets,
              you will need an edge, an informational
              advantage available only to a minority.
            </p>
          </div>
          <div className="right" ref="right">
            <div className="container">
              <p className={p1}>+61%</p>
              <p className={p2}>+47%</p>
              <p className={p3}>+43%</p>
              <p className={p4}>+32%</p>
              <p className={p5}>+29%</p>
              <p className={p6}>+23%</p>
              <p className={p7}>+17%</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

export default AboveAverageReturns
