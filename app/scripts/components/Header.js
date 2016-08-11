import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

import Hero from './Hero'

const Header = React.createClass({
  componentDidMount() {
    $(window).scroll(function(){
        if($(window).scrollTop() === 0){
            $("nav").css({"background-color":"transparent"});
            $(".nav-link").css({"color":`white`});
        }
        else if ($(window).scrollTop() < 100){
            $('nav').css({"background-color":`rgba(255, 255, 255, ${$(window).scrollTop() / 100})`});
            if ($(window).scrollTop() > 40){
              $(".nav-link").css({"color":`rgba(73, 73, 73, ${$(window).scrollTop() / 50})`});
            } else {
              $(".nav-link").css({"color":`white`});
            }
        } else {
          $("nav").css({"background-color":"white"});
          $(".nav-link").css({"color":`rgba(73, 73, 73, 1)`});
        }
    })
  },
  render: function() {
    return (
      <header>
        <nav>
          <div className="content">
            <img id="logo" src="assets/images/logo_horizontal.svg"/>
            <div className="right">
              <Link to="/" className="nav-link" >Home</Link>
              <a className="nav-link" to="login">Login</a>
              <a className="nav-link" >Signup</a>
            </div>
          </div>
        </nav>
        <Hero/>
      </header>
    )
  }
})

export default Header
