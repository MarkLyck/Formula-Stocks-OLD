/**
 * Top Level App Component.
 * @module containers/App
 */

 import React from 'react'
 // import { connect } from 'react-redux'
 // import { bindActionCreators } from 'redux'

 class Main extends React.Component {
   render() {
     return (
       <div>
         {this.props.children}
       </div>
     )
   }
 }

 export default Main
