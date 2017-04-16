import React from 'react'
import './suggestionsHeader.css'

const SuggestionsHeader= ({ stats, portfolio, suggestions = [],  isPortfolioTrades}) => {
  let cashAllocation = ''
  if (portfolio.length) { cashAllocation = portfolio[portfolio.length - 1].percentage_weight.toFixed(2) }


  let suggestionsLength = ''
  if (!isPortfolioTrades) {
    suggestionsLength = suggestions.filter(sug => sug.model && sug.action === 'BUY' ? false : true).length
  } else {
    suggestionsLength = suggestions.filter(sug => sug.model ? true : false).length
  }

  return (
    <section className="suggestion-header">
      <ul>
        <li className="panel cagr blue">
          <div className="symbol">
            <i className="fa fa-line-chart white-color"></i>
          </div>
          <div className="value">
            <h3 className="white-color">{stats.CAGR ? stats.CAGR.toFixed(2) + '%' : ''}</h3>
            <p className="white-color">Annual growth</p>
          </div>
        </li>

        <li className="panel profitable-stocks white gray-border">
          <div className="symbol">
            <i className="fa fa-pie-chart blue-color"></i>
          </div>
          <div className="value">
            <h3 className="blue-color">{stats.WLRatio ? stats.WLRatio.toFixed(2) + '%' : ''}</h3>
            <p className="blue-color">Sold with profit</p>
          </div>
        </li>

        <li className="panel green">
          <div className="symbol">
            <i className="fa fa-list white-color"></i>
          </div>
          <div className="value">
            <h3 className="white-color">{suggestionsLength ? suggestionsLength : ''}</h3>
            <p className="white-color">{!isPortfolioTrades ? 'Suggestions' : 'Trades'}</p>
          </div>
        </li>

        <li className="panel white gray-border">
          <div className="symbol">
            <i className="fa fa-usd green-color"></i>
          </div>
          <div className="value white">
            <h3 className="green-color">{cashAllocation ? cashAllocation + '%' : ''}</h3>
            <p className="green-color">Percent in cash</p>
          </div>
        </li>

      </ul>
    </section>
  )
}

export default SuggestionsHeader
