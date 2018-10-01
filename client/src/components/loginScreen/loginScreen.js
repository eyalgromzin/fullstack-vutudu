import React, { Component } from 'react'
import './loginScreen.css'
// import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/socialButtons/google'
import FacebookButton from 'components/socialButtons/facebook6'
import { connect } from 'react-redux';
import { commonReducer } from 'reducers/commonReducer';

class LoginScreen extends Component {
  render() {
    if(!this.props.loggedIn){
        return (
            <div id="loginScreen">
                <div id="loginContent">
                    <div id="mainLogoLoginContainer">
                        <div id="loginScreenMainLogo"> Vutudu </div>
                    </div>
                    <div >  
                        <div class="LoginButtonContainer"> 
                            <FacebookButton />
                        </div>
                        <div class="LoginButtonContainer"> 
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
        loggedIn: state.commonReducer.loggedIn
    }
}

export default connect(mapStateToProps)(LoginScreen);  //mapStateToProps


