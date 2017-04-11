import React from 'react'
import './stats.css'

const Stats = ({ stats, portfolio }) => {
  const positiveStocks = portfolio.filter(stock => (stock.purchase_price - stock.dividends) <= stock.latest_price ? true : false).length
  const percentPositive = (positiveStocks / (portfolio.length - 1) * 100).toFixed(2)

  const avgSize = (portfolio.reduce((prev, stock) => {
    if (prev === 0) { prev = Number(stock.percentage_weight) }
    else if (stock.ticker !== 'CASH') { prev += Number(stock.percentage_weight) }
    return prev
  }, 0) / (portfolio.length - 1)).toFixed(2)

  return (
    <ul className="stats">
        <li className="statistic blue">
          <div className="symbol">
            <i className="fa fa-bar-chart white-color"></i>
          </div>
          <div className="value">
            <h3 className="white-color">{stats.WLRatio.toFixed(2)}%</h3>
            <p className="white-color">Sold with profit</p>
          </div>
        </li>

        <li className="statistic white gray-border">
          <div className="symbol">
            <i className="fa fa-pie-chart blue-color"></i>
          </div>
          <div className="value">
            <h3 className="blue-color">{percentPositive}%</h3>
            <p className="blue-color">Curr. profitable stocks</p>
          </div>
        </li>

        <li className="statistic green">
          <div className="symbol">
            <i className="fa fa-th-large white-color"></i>
          </div>
          <div className="value">
            <h3 className="white-color">{avgSize}%</h3>
            <p className="white-color">Avg. size</p>
          </div>
        </li>

        <li className="statistic white gray-border">
          <div className="symbol">
            <i className="fa fa-line-chart green-color"></i>
          </div>
          <div className="value white">
            <h3 className="green-color">{stats.CAGR.toFixed(2)}%</h3>
            <p className="green-color">Annual growth</p>
          </div>
        </li>
    </ul>
  )
}

export default Stats
