import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import './styles/userList.css'

import Chrome from './icons/Chrome_Logo.svg'
import AndroidBrowser from './icons/Android_Browser_Logo.svg'
import Edge from './icons/Edge_Browser_Logo.svg'
import Firefox from './icons/Firefox_Browser_Logo.png'
import Safari from './icons/Safari_Browser_Logo.svg'
import IE from './icons/IE_Browser_Logo.png'
import Opera from './icons/Opera_Browser_Logo.png'
import PhantomJS from './icons/PhantomJS_Browser_Logo.png'

import Windows from './icons/Windows_Logo.png'
import OSX from './icons/Macos_Logo.png'
import iOS from './icons/iOS_Logo.png'
import Android from './icons/Android_Logo.png'
import Linux from './icons/Linux_Logo.png'

const VisitorList = ({ visitors }) => {

  visitors = _.sortBy(visitors, (visitor) => visitor._kmd.lmt).reverse()

  const fixedVisitors = visitors.map((visitor, i) => {

    let browserIcon
    if (visitor.browser.indexOf('Chrome') > -1 || visitor.browser === 'Blink') { browserIcon = Chrome}
    else if (visitor.browser.indexOf('Firefox') > -1) { browserIcon = Firefox}
    else if (visitor.browser === 'Safari') { browserIcon = Safari}
    else if (visitor.browser === 'Microsoft Edge') { browserIcon = Edge}
    else if (visitor.browser === 'IE') { browserIcon = IE}
    else if (visitor.browser === 'Android Browser') { browserIcon = AndroidBrowser}
    else if (visitor.browser === 'Opera') { browserIcon = Opera}
    else if (visitor.browser === 'PhantomJS') { browserIcon = PhantomJS}

    let osIcon
    if (visitor.os === 'Windows') { osIcon = Windows }
    else if (visitor.os === 'OS X') { osIcon = OSX }
    else if (visitor.os === 'iOS') { osIcon = iOS }
    else if (visitor.os === 'Android') { osIcon = Android }
    else if (visitor.os === 'Linux') { osIcon = Linux }

    let device = 'fa-desktop'
    if (visitor.device === 'mobile') { device = 'fa-mobile' }
    else if (visitor.device === 'ipad') { device = 'fa-tablet' }

    return (
      <tbody key={i} className="visitor">
        <tr>
          <td className="location-info">{visitor.location.country_name}{visitor.location.region_code ? `, ${visitor.location.region_code}` : ''}</td>
          <td>{visitor.referer.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0]}</td>
          <td>{moment(visitor._kmd.lmt).fromNow()}</td>
          <td className="device-info">
            <img src={browserIcon} className="icon" alt="browser"/>
            <img src={osIcon} className="icon" alt="OS"/>
            <i className={`fa ${device}`} aria-hidden="true"></i>
          </td>
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
          <th>Visited</th>
          <th>Device</th>
        </tr>
      </thead>
      {fixedVisitors}
    </table>
  )
}

export default VisitorList
