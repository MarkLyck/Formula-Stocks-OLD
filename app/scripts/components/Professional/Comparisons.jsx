import React from 'react'

class Comparisons extends React.Component {
  render() {
    return (
      <section className="comparisons">
        <h2 className="title">Compare Formula Stocks to:</h2>
        <div className="divider"/>
        <ul className="comparisons-list">
          <li>
            <h3>Passive management</h3>
          </li>
          <li>
            <h3>Growth investing or Garp</h3>
          </li>
          <li>
            <h3>Graham's net nets</h3>
          </li>
          <li>
            <h3>Magic formula</h3>
          </li>
          <li>
            <h3>Value investing</h3>
          </li>
          <li>
            <h3>Quantitative investing</h3>
          </li>
          <li>
            <h3>Active fund management</h3>
          </li>
        </ul>
      </section>
    )
  }
}

export default Comparisons
