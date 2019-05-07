import React, { Component } from 'react'
import './loginScreen.css'
// import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/socialButtons/google'
import FacebookButton from 'components/socialButtons/facebook'
import { connect } from 'react-redux';
import { hideLogInScreen } from 'actions/commonActions'

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    closeLoginScreen = () => {
        console.log("clicked closeLoginScreen")
        hideLogInScreen();
    }
    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeLoginScreen()
        }
    }

    render() {
        if(!this.props.loggedIn && this.props.showLogin){  
            return (
                <div id="loginScreen">    
                    <div id="loginContent" onClick={this.onLoginBlur} ref={this.setWrapperRef}>
                        {/* <div>
                            <div id="loginXButton" onClick={this.closeLoginScreen}> X </div>
                        </div> */}
                        <div id="mainLogoLoginContainer">
                            <div id="loginScreenMainLogo"> Vutudu </div>
                        </div>
                        <div >  
                            <div className="LoginButtonContainer"> 
                                <FacebookButton onLoginScreenFocus={this.onLoginScreenFocus} onLoginBlur={this.onLoginBlur} />
                            </div>
                            <div className="LoginButtonContainer"> 
                                <GoogleButton onLoginScreenFocus={this.onLoginScreenFocus} onLoginBlur={this.onLoginBlur} />
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


