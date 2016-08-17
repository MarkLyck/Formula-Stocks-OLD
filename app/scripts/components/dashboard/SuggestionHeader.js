import React from 'react'

const SuggestionHeader = React.createClass({
  render() {
    //<img src="assets/icons/chart_icon.svg"/>
    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-line-chart white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">19.58%</h3>
              <p className="white-color">CAGR</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">82.67%</h3>
              <p className="blue-color">Profitable Stocks</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-list white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">12</h3>
              <p className="white-color">Suggestions</p>
            </div>
          </li>



          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-money green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">19.58%</h3>
              <p className="green-color">Percent in Cash</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
})

export default SuggestionHeader
