import FacebookLogin from 'react-facebook-login';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUserIfNotExists } from 'actions/userActions'
import { bindActionCreators } from 'redux';


class facebook extends Component {
  responseFacebook = (response) => {
    if (response.accessToken) {
      

      var fullName = response.name;
      var firstName = fullName.split(" ")[0]; 
      var lastName = fullName.split(" ")[1]; 

      var user = {
        firstName: firstName,
        lastName: lastName,
        id: response.id
      }

      this.props.createUserIfNotExists(user);
      

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

function mapDispatchToProps(dispatch) {
  return({
    createUserIfNotExists: bindActionCreators (createUserIfNotExists, dispatch),
  })
}

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(facebook); 
