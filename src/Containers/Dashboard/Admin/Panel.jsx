/* eslint-disable */
import React from 'react'
import moment from 'moment'
import _ from 'underscore'

import admin from '../../../admin'
import AdminPanelHeader from './Headers'
import BrowserPieChart from './BrowserPieChart'
import Userlist from './UserList'

import DAUGraph from './DAUGraph'
import './styles/panel.css'

const AdminPanel = React.createClass({
  getInitialState() {
    return {visitors: admin.visits.toJSON()}
  },
  componentDidMount() {
    admin.visits.on('change update', this.updateState)
    admin.visits.fetch()
  },
  componentWillUnmount() {
    admin.visits.off('change update', this.updateState)
  },
  updateState() {
    this.setState({visitors: admin.visits.toJSON()})
  },
  filterVisitors(visitors) {
    let uniqueIPs = []
    let uniqueVisitors = visitors.filter((visitor) => {
      if (uniqueIPs.indexOf(visitor.location.ip) === -1) {
        uniqueIPs.push(visitor.location.ip)
        return true
      } else {
        return false
      }
    })
    return uniqueVisitors
  },
  render() {
    const filteredVisitors = this.filterVisitors(this.state.visitors)
    let images = filteredVisitors.map((visitor) => {
      let color = 'rgba(18, 217, 158, 0.5)'
      if (visitor.type === 4)
        color = '#da1354'
      else if (visitor.type > 0 && visitor.type < 5)
        color = '#27A5F9'
      else if (moment().format('YYYYMMDD') - moment(visitor._kmd.lmt).format('YYYYMMDD') <= 1)
        color = '#f9f027'

      return({
        "type": "circle",
        "theme": "light",

        "width": 6,
        "height": 6,
        "color": color,
        "longitude": visitor.location.longitude,
        "latitude": visitor.location.latitude,
        "title": `${visitor.location.country_name}<br/>${visitor.location.city}<br/>${moment(visitor._kmd.lmt).fromNow()}`,
      });
    })

    let map = React.createElement(AmCharts.React, {
      "class":"map",
      "type": "map",
      "theme": "light",
      "projection": "eckert6",
      "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": true,
        "images": images,
      },
      "areasSettings": {
        "autoZoom": true,
        "rollOverColor": "#cccccc",
        "rollOverOutlineColor": "#8c8c8c",
        "selectedColor": "#cccccc",
        "outlineColor": "#8c8c8c",
        "color": "#515156",
      },
      "zoomControl": {
        "buttonIconColor": "#8c8c8c",
      }
    })
    let ChromeUsers = filteredVisitors.filter((visitor) => visitor.browser === 'Chrome' || visitor.browser === 'Blink' ? true : false).length
    let FirefoxUsers = filteredVisitors.filter((visitor) => visitor.browser === 'Firefox' ? true : false).length
    let IEUsers = filteredVisitors.filter((visitor) => visitor.browser === 'IE' ? true : false).length
    let EdgeUsers = filteredVisitors.filter((visitor) => visitor.browser === 'Edge' ? true : false).length
    let SafariUSers = filteredVisitors.filter((visitor) => visitor.browser === 'Safari' ? true : false).length
    let OtherUsers = (filteredVisitors.length - ChromeUsers - FirefoxUsers - IEUsers - EdgeUsers - SafariUSers)

    return (
      <div className="admin-panel">
        <AdminPanelHeader/>
        <div className="unqiue-visiotrs">
          <div className="visitor-map">
            {map}
          </div>
        </div>
        <div className="DAU-container">
          <h2>Daily Visitors</h2>
          <DAUGraph data={filteredVisitors}/>
        </div>
        <div className="browsers-container">
          <h2>Browsers</h2>
          <div className="browsers">
            <BrowserPieChart title="Chrome" max={filteredVisitors.length} value={ChromeUsers}/>
            <BrowserPieChart title="Safari" max={filteredVisitors.length} value={SafariUSers}/>
            <BrowserPieChart title="Firefox" max={filteredVisitors.length} value={FirefoxUsers}/>
            <BrowserPieChart title="IE" max={filteredVisitors.length} value={IEUsers}/>
            <BrowserPieChart title="Edge" max={filteredVisitors.length} value={EdgeUsers}/>
            <BrowserPieChart title="Other" max={filteredVisitors.length} value={OtherUsers}/>
          </div>
        </div>
        <div className="user-list-container">
          <h2>Users</h2>
          <Userlist/>
        </div>
      </div>
    )
  }
})

export default AdminPanel
