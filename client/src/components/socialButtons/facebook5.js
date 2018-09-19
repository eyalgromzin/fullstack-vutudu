import React, { Component } from 'react';
import {FBLogin} from 'react-fb-login';
 
const params = {
   appId: 'your_facebook_app_id',
   scope: 'public_profile',
   cookie: false,
   language: 'en_US',
   version: 'v3.0',
   xfbml: true,
}
 
const onFbLoginEvent = () => {
   const fbLoginEvent = new Event('onFbLogin');
   document.dispatchEvent(fbLoginEvent);
}
 
const loginCb = (response) => {
   console.info('Already logged: ', response);
   onFbLoginEvent();
};
 
const notloginCb = (response) => {
   console.error('You are not logged: ', response);
};
 
const settings = {
   params,
   loginCb,
   notloginCb,
};
 
// @FBLogin(settings)
export default class LoginButton extends Component {
   render() {
       return (
           <button style={this.props.fbCSS}>
               Login
           </button>
       );
   }
}