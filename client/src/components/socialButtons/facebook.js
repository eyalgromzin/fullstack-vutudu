import FacebookLogin from 'react-facebook-login';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadOrCreateUserIfNotExists } from 'actions/userActions'
import { bindActionCreators } from 'redux';
import './socialButtons.css'


class facebook extends Component {
  responseFacebook = (response) => {
    if (response.accessToken) {
      var fullName = response.name;
      var firstName = fullName.split(" ")[0]
      var lastName = fullName.split(" ")[1]
      var userID = response.userID

      if(fullName === undefined){
        console.log('Connection to facebook timed out');
        return
      }

      var user = {
        firstName: firstName,
        lastName: lastName,
        id: userID
      }

      this.props.loadOrCreateUserIfNotExists(user);

    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }

  componentClicked = () => {
      console.log('cliked fb');
  }

  render() {
    return (
      <div>
        <FacebookLogin  //https://github.com/keppelen/react-facebook-login
            appId="1886935948065131"
            autoLoad={true}
            disabled={false}
            cssClass="facebookButton"
            fields="name,email,picture"
            onClick={this.componentClicked}
            // onFocus={this.props.onLoginScreenFocus}
            // onBlur={this.props.onLoginBlur}
            callback={this.responseFacebook} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return({
    loadOrCreateUserIfNotExists: bindActionCreators (loadOrCreateUserIfNotExists, dispatch),
  })
}

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(facebook); 
