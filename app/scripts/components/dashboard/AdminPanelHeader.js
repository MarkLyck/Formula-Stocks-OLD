import React from 'react'

import store from '../../store'

const AdminPanelHeader = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentWillReceiveProps(newProps) {
    // this.setState({
    //   stats: store.plans.get(newProps.plan).get('stats'),
    //   suggestionsLength: store.plans.get(newProps.plan).get('suggestions').length
    // })
  },
  render() {
    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-users white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">823</h3>
              <p className="white-color">Unique Visitors</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-flask blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">23</h3>
              <p className="blue-color">Subscribers</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-list white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">17</h3>
              <p className="white-color">Trials</p>
            </div>
          </li>



          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">37.82%</h3>
              <p className="green-color">Conversion Rate</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
})

export default AdminPanelHeader
