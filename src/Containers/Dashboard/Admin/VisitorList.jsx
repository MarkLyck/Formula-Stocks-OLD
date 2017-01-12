import React from 'react'
import moment from 'moment'
import './styles/userList.css'

const VisitorList = ({ visitors }) => {

  console.log('visitorlist: ', visitors)

  const fixedVisitors = visitors.map((visitor, i) => {
    return (
      <tbody key={i} className="visitor">
        <tr>
          <td>{visitor.location.country_name}</td>
          <td>{visitor.referer.replace('https://', '').replace('http://', '').split('/')[0]}</td>
          <td>{moment(visitor._kmd.lmt).fromNow()}</td>
          <td>{visitor.browser} {visitor.os} {visitor.device}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <table className="user-list">
      <thead className="labels">
        <tr>
          <th>Location</th>
          <th>Referer</th>
          <th>Last seen</th>
          <th>Device</th>
        </tr>
      </thead>
      {fixedVisitors}
    </table>
  )
}

export default VisitorList
