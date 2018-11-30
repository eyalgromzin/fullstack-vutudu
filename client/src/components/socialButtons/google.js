import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import './socialButtons.css'
import { connect } from 'react-redux';
import { CHANGE_LOGGED_IN_STATE } from 'reducers/types'



class GoogleButton extends Component {

    onsuccessGoogleLogin = (response) => {
        // If responseType is not 'code', callback will return the GoogleAuth object.
        // If responseType is 'code', callback will return the offline token for use on your server.

        console.log(response);
        this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });
    }

    onFailGoogleLogin = (response) => {
        this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
        console.log(response);
    }

    render() {
        return (
        <div>
            <GoogleLogin
                clientId="961387820511-dv0jhq1vo0nji3meddqop1f58lua25jk.apps.googleusercontent.com"
                buttonText="Login with Google"
                className="socialButton"
                onSuccess={this.onsuccessGoogleLogin}
                onFailure={this.onFailGoogleLogin}
            />
        </div>
        )
    }
}

export default connect()(GoogleButton);

