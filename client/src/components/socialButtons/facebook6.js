import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import React, { Component } from 'react'

export default class facebook6 extends Component {

    responseFacebook = (response) => {
        console.log(response);
      }

      componentClicked = () => {
          console.log('cliked fb');
      }

  render() {
    return (
      <div>
        <FacebookLogin
            appId="1886935948065131"
            autoLoad={true}
            disabled={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />
      </div>
    )
  }
}
