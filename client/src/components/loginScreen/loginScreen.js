import React, { Component } from 'react'
import './loginScreen.css'
// import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/socialButtons/google'
import FacebookButton from 'components/socialButtons/facebook'
import { connect } from 'react-redux';
import { hideLogInScreen } from 'actions/commonActions'

class LoginScreen extends Component {
    closeLoginScreen = () => {
        console.log("clicked closeLoginScreen")
        hideLogInScreen();
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

function mapStateToProps(state) {
    return {
        loggedIn: state.commonReducer.loggedIn,
        showLogin: state.commonReducer.showLogin,
        userID: state.userPageReducer.loggedInUserID,

    }
}

export default connect(mapStateToProps)(LoginScreen);  //mapStateToProps


