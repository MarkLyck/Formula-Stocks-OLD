/**
 * Top Level App Component.
 * @module containers/App
 */

 import React, { Component } from 'react'

 class Main extends Component {
   render() {
     return (
       <div>
         {this.props.children}
       </div>
     )
   }
 }

 export default Main
