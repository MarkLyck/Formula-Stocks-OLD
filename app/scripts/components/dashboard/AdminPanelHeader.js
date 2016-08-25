import React from 'react'

import store from '../../store'
import admin from '../../admin'

const AdminPanelHeader = React.createClass({
  getInitialState() {
    return {fetched: false, visitors: admin.visits.toJSON()}
  },
  componentDidMount() {
    admin.visits.on('change update', this.updateState)
    admin.visits.fetch()
  },
  componentWillUnmount() {
    admin.visits.off('change update', this.updateState)
  },
  updateState() {
    console.log(admin.visits.toJSON());
    this.setState({visitors: admin.visits.toJSON()})
  },
  render() {
    let subscribers = this.state.visitors.filter((visitor) => {
      if (visitor.type > 0 && visitor.type < 5) {
        return true
      } else {
        return false
      }
    })
    let trials = this.state.visitors.filter((visitor) => {
      if (visitor.type === 0) {
        return true
      } else {
        return false
      }
    })

    let conversionRate = 0.00;
    if (subscribers.length !== 0) {
      conversionRate = 100 - this.state.visitors.length / subscribers.length * 100
    }
    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.visitors.length}</h3>
              <p className="white-color">Unique Visitors</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-flask blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{subscribers.length}</h3>
              <p className="blue-color">Subscribers</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-list white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{trials.length}</h3>
              <p className="white-color">Trials</p>
            </div>
          </li>



          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{conversionRate}%</h3>
              <p className="green-color">Conversion Rate</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
})

export default AdminPanelHeader
