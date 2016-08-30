import _ from 'underscore'
import React from 'react'

import admin from '../../admin'
import AdminPanelHeader from './AdminPanelHeader'
import BrowserPieChart from './BrowserPieChart'

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
    // console.log(this.state.visitors);
    // let fixedVisitors = this.state.visitors.reduce((returnSoFar, visitor) => {
    //   visitor.amount = 1
    //   let index = 0
    //   let duplicates = returnSoFar.filter((vtor, i) => {
    //     if (vtor.location.city === visitor.location.city) {
    //       index = i
    //       return true
    //     }
    //   })
    //
    //   if (duplicates.length === 0) {
    //     returnSoFar.push(visitor)
    //   } else {
    //     console.log('else running');
    //     let newVisitor = returnSoFar[index]
    //     newVisitor.amount += 1
    //     returnSoFar = returnSoFar.splice(0,index).concat(newVisitor, returnSoFar.splice(index + 1))
    //   }
    //   return returnSoFar
    // }, [])
    // console.log('fixed: ', fixedVisitors);

    // let max = 1;
    // let min = 15;


    let images = this.state.visitors.map((visitor) => {

      // if (visitor.amount > max) {
      //   max = visitor.amount
      // }
      // let size = visitor.amount / max * 20
      // if (size <= 5) {
      //   size = 5
      // }

      // console.log(visitor);
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


//          <h2>Unique visitors</h2>
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
      </div>
    )
  }
})

export default AdminPanel
