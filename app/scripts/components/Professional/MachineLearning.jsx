import React from 'react'
import CollapseSegment from './components/CollapseSegment.jsx'

class MachineLearning extends React.Component {
  render() {
    return (
      <section className="machine-learning">
        <h2 className="title">Machine Learning</h2>
        <div className="divider"/>
        <CollapseSegment title="What is machine learning?" bg="#ffffff">
          <p>
            Machine learning is the study of computer algorithms that improve through experience. As a
            branch of the artificial intelligence field it deals with algorithms that can learn from and make
            predictions based on input data and utilize these to reach even more optimal predictions and
            decisions.
          </p>
        </CollapseSegment>
        <p>
          We use machine learning to obtain a level of experience which it is quite
          impossible to obtain through regular career experience.<br/><br/>

          We humans usually learn through experience and mistakes.
          There is however only so much experience, and so many mistakes possible in any
          normal career with potential for teaching durable lessons of general value.
          Our machine learning software is capable of experiencing millions and millions
          of events and decision outcomes, in the same timeframe we as human beings
          can experience less than hundred. This greatly accelerates experience,
          rationalization, learning, knowledge.
        </p>
      </section>
    )
  }
}

export default MachineLearning
