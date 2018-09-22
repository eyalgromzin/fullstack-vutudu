import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import {CHANGE_LOGGED_IN_STATE, commonReducer} from 'reducers/commonReducer'
import React, { Component } from 'react'
import { connect } from 'react-redux';


class facebook6 extends Component {

  responseFacebook = (response) => {
    if (response.accessToken) {
      this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });
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

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn
  };
}

export default connect(mapStateToProps)(facebook6);
