import _ from 'underscore'
import React from 'react'

import admin from '../../admin'
import AdminPanelHeader from './AdminPanelHeader'
import BrowserPieChart from './BrowserPieChart'
import Userlist from './Userlist'

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
  render() {
    let images = this.state.visitors.map((visitor) => {
      let color = (visitor.type > 0 && visitor.type < 5) ? '#27A5F9' : visitor.type === 5 ? '#da1354' : '#12D99E'
      return({
        "type": "circle",
        "theme": "light",

        "width": 10,
        "height": 10,
        "color": color,
        "longitude": visitor.location.longitude,
        "latitude": visitor.location.latitude,
        "title": `${visitor.location.country_name}<br/>${visitor.location.city}<br/>`,
        // "value": visitor.amount
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
        "rollOverColor": "#ccc",
        "selectedColor": "#ccc",
        "color": "#26262C",
      },
      "export": {
        "enabled": true
      }
    })
    let ChromeUsers = this.state.visitors.filter((visitor) => visitor.browser === 'Chrome' ? true : false).length
    let FirefoxUsers = this.state.visitors.filter((visitor) => visitor.browser === 'Firefox' ? true : false).length
    let IEUsers = this.state.visitors.filter((visitor) => visitor.browser === 'IE' ? true : false).length
    let EdgeUsers = this.state.visitors.filter((visitor) => visitor.browser === 'Edge' ? true : false).length
    let SafariUSers = this.state.visitors.filter((visitor) => visitor.browser === 'Safari' ? true : false).length
    let OtherUsers = (this.state.visitors.length - ChromeUsers - FirefoxUsers - IEUsers - EdgeUsers - SafariUSers)

    return (
      <div className="admin-panel">
        <AdminPanelHeader/>
        <div className="unqiue-visiotrs">
          <div className="visitor-map">
            {map}
          </div>
        </div>
        <div className="browsers-container">
          <h2>Browsers</h2>
          <div className="browsers">
            <BrowserPieChart title="Chrome" max={this.state.visitors.length} value={ChromeUsers}/>
            <BrowserPieChart title="Safari" max={this.state.visitors.length} value={SafariUSers}/>
            <BrowserPieChart title="Firefox" max={this.state.visitors.length} value={FirefoxUsers}/>
            <BrowserPieChart title="IE" max={this.state.visitors.length} value={IEUsers}/>
            <BrowserPieChart title="Edge" max={this.state.visitors.length} value={EdgeUsers}/>
            <BrowserPieChart title="Other" max={this.state.visitors.length} value={OtherUsers}/>
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
