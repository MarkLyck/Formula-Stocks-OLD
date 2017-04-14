import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showNotification } from '../../../actions/notifications'

import store from '../../../store'
import admin from '../../../admin'
import JSONIcon from './icons/json_icon.svg'
import './styles/api.css'

class AdminAPI extends Component {
  onDrop(files) {
    const { actions } = this.props
    /* ACCEPTABLE FILENAMES */
    const filenames = [
        "annual_basic.json",
        "annual_entry.json",
        "annual_premium.json",
        "annual_business.json",
        "annual_fund.json",
        "monthly_basic.json",
        "monthly_entry.json",
        "monthly_premium.json",
        "monthly_business.json",
        "monthly_fund.json",
        "weekly_basic.json",
        "weekly_entry.json",
        "weekly_premium.json",
        "weekly_business.json",
        "weekly_fund.json"
    ];

    let badFiles = files.filter(file => filenames.indexOf(file.name) === -1 ? true : false)

    if (badFiles.length > 0) {
      actions.showNotification(`Invalid file name: ${badFiles[0].name}`, 'error')
      return null
    } else {
      admin.filesToUpload = files.length
      let entryFiles = files.filter(file => (file.name.indexOf('basic') > -1 || file.name.indexOf('entry') > -1) ? true : false)
      let premiumFiles = files.filter(file => file.name.indexOf('premium') > -1 ? true : false)
      let businessFiles = files.filter(file => file.name.indexOf('business') > -1 ? true : false)
      let fundFiles = files.filter(file => file.name.indexOf('fund') > -1 ? true : false)

      if (entryFiles.length > 0) {
        store.plans.get('basic').updateData(entryFiles)
      }
      if (premiumFiles.length > 0) {
        store.plans.get('premium').updateData(premiumFiles)
      }
      if (businessFiles.length > 0) {
        store.plans.get('business').updateData(businessFiles)
      }
      if (fundFiles.length > 0) {
        store.plans.get('fund').updateData(fundFiles)
      }
    }
  }

  render() {
    return (
      <div className="admin-api">
        <div className="wrapper white">
          <h2>Upload JSON files</h2>
          <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
            <div>
              <h3>Drag and drop JSON files here</h3>
              <img src={JSONIcon} alt="json"/>
            </div>
          </Dropzone>
        </div>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actions = { showNotification }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(AdminAPI)
