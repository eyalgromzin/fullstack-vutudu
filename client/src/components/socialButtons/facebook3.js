import { FacebookLogin } from 'react-facebook-login-component';
import React, { Component } from 'react'

export default class facebook3 extends Component {
    constructor (props, context) {
        super(props, context);
      }
     
      responseFacebook (response) {
        console.log(response);
        //anything else you want to do(save to localStorage)...
      }
     
      render () {
        return (
          <div>
            <FacebookLogin socialId="yourAppID"
                           language="en_US"
                           scope="public_profile,email"
                           responseHandler={this.responseFacebook}
                           xfbml={true}
                           fields="id,email,name"
                           version="v2.5"
                           className="facebook-login"
                           buttonText="Login With Facebook"/>
          </div>
        );
      }
}
