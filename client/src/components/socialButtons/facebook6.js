import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { commonReducer } from 'reducers/commonReducer'
import {CHANGE_LOGGED_IN_STATE} from 'reducers/types'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUserIfNotExists } from 'actions/userActions'
import { bindActionCreators } from 'redux';
import store from 'store'

import {
  SET_USER_LIKED_IDEAS,
  SET_USER_CREATED_IDEAS
} from 'reducers/types' 
import { updateUserIdeas } from 'actions/userActions'


class facebook6 extends Component {
  responseFacebook = (response) => {
    if (response.accessToken) {
      store.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });

      var fullName = response.name;
      var firstName = fullName.split(" ")[0]; 
      var lastName = fullName.split(" ")[1]; 

      var user = {
        firstName: firstName,
        lastName: lastName,
        id: response.id
      }

      this.props.createUserIfNotExists1(user);

      this.updateUserIdeas();
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }

  updateUserIdeas = () => {
    this.props.updateUserIdeas(this.props.userID, 'Liked', SET_USER_LIKED_IDEAS);
    this.props.updateUserIdeas(this.props.userID, 'Created', SET_USER_CREATED_IDEAS);
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
    createUserIfNotExists1: bindActionCreators (createUserIfNotExists, dispatch),
    updateUserIdeas: bindActionCreators (updateUserIdeas, dispatch)
  })
}

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(facebook6); 
