import FacebookLogin from 'react-facebook-login';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadOrCreateUserIfNotExists } from 'actions/userActions'
import { bindActionCreators } from 'redux';
import './socialButtons.css'
import {CHANGE_LOGGED_IN_TYPE} from 'reducers/types'
import store from 'store'
import {loggedInWith} from 'common'
// import { useHistory } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory"



class facebook extends Component {
  constructor(props){
    super(props)

    this.state = {
      isToRedirect: false,
      redirectPath: "/" + props.pageAfterLogin,
    }
  }

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

      store.dispatch({type: CHANGE_LOGGED_IN_TYPE, payload: "Facebook"});
      loggedInWith.loggedInWith = 'Facebook'

      var user = {
        firstName: firstName,
        lastName: lastName,
        id: userID
      }

      this.props.loadOrCreateUserIfNotExists(user);

      if(this.props.pageAfterLogin !== undefined && this.props.pageAfterLogin != ''){
        // const history = useHistory();
        // history.push("/" + this.props.pageAfterLogin);
        // this.context.history.push("/" + this.props.pageAfterLogin)
        // this.props.router.push("/" + this.props.pageAfterLogin)
        // this.props.history.push("/" + this.props.pageAfterLogin)
        this.setState({isToRedirect: true})
        const history = createHistory();
        history.push("/" + this.props.pageAfterLogin);
        // in your function then call add the below 
        // const history = createHistory();
        // // Use push, replace, and go to navigate around.
        // history.push("/" + this.props.pageAfterLogin);
      }

    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }

  componentClicked = () => {
      console.log('cliked fb');
  }

  render() {
    if (this.state.isToRedirect){
      return <Redirect to={this.state.redirectPath} />
    }

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

// facebook.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired
//   }),
//   to: PropTypes.string.isRequired
// };

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
