import React from 'react'

class Stock extends React.Component {
  render() {
    const stock = this.props.stock
    const percentChange = ((stock.sell_price - stock.purchase_price) * 100 / stock.purchase_price).toFixed(2)
    const changeClass = (stock.sell_price - stock.purchase_price).toFixed(2) > 0 ? 'positive' : 'negative'

    return (
      <tbody>
        <tr className="stock-table-row">
          <td className="stock-name">
            <div className="wrapper">
              <p className="stock-name-tag"><span className="semi-bold">{stock.name}</span> ({stock.ticker})</p>
            </div>
          </td>
          <td className="portfolio-td"><p className="blue-color">${stock.purchase_price.toFixed(2)}</p></td>
          <td className="portfolio-td"><p className="class-checker">${stock.sell_price.toFixed(2)}</p></td>
          <td className="portfolio-td"><p className={changeClass}>{percentChange}%</p></td>
        </tr>
      </tbody>
    )
  }
}

export default Stock
