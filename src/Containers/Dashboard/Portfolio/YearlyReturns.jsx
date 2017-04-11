import React from 'react'
import moment from 'moment'
import './yearlyReturns.css'

const YearlyReturns = ({ portfolioYields }) => {
  if (!portfolioYields.length) {
    return (
      <div className="yearly-returns">
        <ul className="return-list">
          <li className="return five-year">
            <h3 className="year">5 years</h3>
            <h4 className="return"></h4>
          </li>
          <div className="vert-divider"/>
          <li className="return three-year">
            <h3 className="year">36 months</h3>
            <h4 className="return"></h4>
          </li>
          <div className="vert-divider"/>
          <li className="return two-year">
            <h3 className="year">24 months</h3>
            <h4 className="return"></h4>
          </li>
          <div className="vert-divider"/>
          <li className="return">
            <h3 className="year">12 months</h3>
            <h4 className="return"></h4>
          </li>
        </ul>
      </div>
    )
  }

  let additionalMonths = 1
  if (portfolioYields.slice(-13)[0].date.month === moment().format('M')) {
    additionalMonths = 2
  }

  const fiveYearStart = portfolioYields.slice(-(12 * 5 + additionalMonths))[0].balance
  const threeYearStart = portfolioYields.slice(-(12 * 3 + additionalMonths))[0].balance
  const twoYearStart = portfolioYields.slice(-(12 * 2 + additionalMonths))[0].balance
  const oneYearStart = portfolioYields.slice(-12 - additionalMonths)[0].balance
  const lastBalance = portfolioYields[portfolioYields.length - 1].balance

  return (
    <div className="yearly-returns">
      <ul className="return-list">
        <li className="return five-year">
          <h3 className="year">5 years</h3>
          <h4 className="return">+{((lastBalance - fiveYearStart) / fiveYearStart * 100).toFixed(2)}%</h4>
        </li>
        <div className="vert-divider"/>
        <li className="return three-year">
          <h3 className="year">36 months</h3>
          <h4 className="return">+{((lastBalance - threeYearStart) / threeYearStart * 100).toFixed(2)}%</h4>
        </li>
        <div className="vert-divider"/>
        <li className="return two-year">
          <h3 className="year">24 months</h3>
          <h4 className="return">+{((lastBalance - twoYearStart) / twoYearStart * 100).toFixed(2)}%</h4>
        </li>
        <div className="vert-divider"/>
        <li className="return">
          <h3 className="year">12 months</h3>
          <h4 className="return">+{((lastBalance - oneYearStart) / oneYearStart * 100).toFixed(2)}%</h4>
        </li>
      </ul>
    </div>
  )
}

export default YearlyReturns
