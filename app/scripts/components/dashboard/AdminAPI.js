import React from 'react'
import Dropzone from 'react-dropzone'

import admin from '../../admin'
// import $ from 'jquery'

import store from '../../store'

const AdminAPI = React.createClass({
  onDrop(files) {
    console.log('onDrop');
    /* ACCEPTABLE FILENAMES */
    const filenames = [
        "annual_basic.json",
        "annual_premium.json",
        "annual_business.json",
        "annual_fund.json",
        "monthly_basic.json",
        "monthly_premium.json",
        "monthly_business.json",
        "monthly_fund.json",
        "weekly_basic.json",
        "weekly_premium.json",
        "weekly_business.json",
        "weekly_fund.json"
    ];

    // files.forEach((file,i) => {
      // console.log(i);
      // if (filenames.indexOf(file.name) > -1) {


        let basicFiles = files.filter((file) => { if (file.name.indexOf('basic') > -1) { return true } })
        let premiumFiles = files.filter((file) => { if (file.name.indexOf('premium') > -1) { return true } })
        let businessFiles = files.filter((file) => { if (file.name.indexOf('business') > -1) { return true } })
        let fundFiles = files.filter((file) => { if (file.name.indexOf('fund') > -1) { return true } })

        if (basicFiles.length > 0) {
          store.plans.get('basic').updateData(basicFiles)
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

      // } else {
      //   console.log('Bad file!');
      // }

    // })
  },
  render() {
    return (
      <div className="admin-api">
        API PANEL
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>

      </div>
    )
  }
})

export default AdminAPI
