import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import FacebookAuth from 'react-facebook-auth';
 
export default class FacebookButton2 extends Component {
    render (){
        return (
        <div>
            <FacebookAuth
            appId="<app-id>"
            callback={this.authenticate}
            component={this.MyFacebookButton}
            />
        </div>
        )
    }

    MyFacebookButton = ({ onClick }) => (
        <button onClick={onClick}>
          Login with facebook
        </button>
    );

    authenticate = (response) => {
        console.log(response);
        // Api call to server so we can validate the token
    };
}


 


