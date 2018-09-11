import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux';
import {CHANGE_LOGGED_IN_STATE} from 'reducers/commonReducer'

class FacebookButton extends Component {
    state={
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = (response) => {
        if (response.accessToken) {
          this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
        console.log(response);
    }

    componentClicked = () => 
    console.log('clicked');

  render() {
      let fbContent;

      if(this.state.isLoggedIn){
        fbContent = null;
      }else{
        fbContent = (<FacebookLogin
        appId="1886935948065131"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} 
        icon="fa-facebook"
        />);
      }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

export default connect()(FacebookButton);