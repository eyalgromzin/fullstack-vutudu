import React, { Component } from 'react'
import './loginScreen.css'
// import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/socialButtons/google'
import FacebookButton from 'components/socialButtons/facebook6'
import { connect } from 'react-redux';
import { commonReducer } from 'reducers/commonReducer';
import {hideLogInScreen} from 'actions/commonActions'
import {
    SET_USER_LIKED_IDEAS,
    SET_USER_CREATED_IDEAS
  } from 'reducers/types' 
import { updateUserIdeas } from 'actions/userActions'
import { bindActionCreators } from 'redux';

class LoginScreen extends Component {
    closeLoginScreen = () => {
        console.log("clicked closeLoginScreen")
        hideLogInScreen();
    }

    updateUserIdeas = () => {
        this.props.updateUserIdeas(this.props.userID, 'Liked', SET_USER_LIKED_IDEAS);
        this.props.updateUserIdeas(this.props.userID, 'Created', SET_USER_CREATED_IDEAS);
    }

    componentDidUpdate = () => {
        if(this.props.loggedIn){
          this.updateUserIdeas();
        }
      }

  render() {
    if(!this.props.loggedIn && this.props.showLogin){  
        return (
            <div id="loginScreen">
                <div id="loginContent">
                    <div>
                        <div id="loginXButton" onClick={this.closeLoginScreen}> X </div>
                    </div>
                    <div id="mainLogoLoginContainer">
                        <div id="loginScreenMainLogo"> Vutudu </div>
                    </div>
                    <div >  
                        <div className="LoginButtonContainer"> 
                            <FacebookButton />
                        </div>
                        <div className="LoginButtonContainer"> 
                            <GoogleButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <React.Fragment />
        )
    }
    
  }
}

function mapDispatchToProps(dispatch) {
    return({
      updateUserIdeas: bindActionCreators (updateUserIdeas, dispatch)
    })
  }

function mapStateToProps(state) {
    return {
        loggedIn: state.commonReducer.loggedIn,
        showLogin: state.commonReducer.showLogin,
        userID: state.userPageReducer.loggedInUserID,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);  //mapStateToProps


