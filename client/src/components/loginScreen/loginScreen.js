import React, { Component } from 'react'
import './loginScreen.css'
import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/socialButtons/google'


export default class LoginScreen extends Component {
  render() {
    return (
      <div id="loginScreen">
        <div id="loginContent">
            <div id="mainLogoLoginContainer">
                <div id="mainLogo"> Vutudu </div>
            </div>
            
            <div id="loginButtons"> 
                <div class="LoginButtonContainer">
                    <FacebookButton />
                </div>
                <div class="LoginButtonContainer">
                    <GoogleButton />
                </div>
            </div>
        </div>
      </div>
        // <FacebookButton />
    )
  }
}
