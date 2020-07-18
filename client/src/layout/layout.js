import React, { Component } from 'react'
import './layout.css'
import { connect } from 'react-redux';
import LoginScreen from '../components/loginScreen/loginScreen'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, Redirect, DefaultRoute } from "react-router";
import createIdeaLayout from '../components/createComponent/createIdeaLayout';
import searchLayout from '../components/searchLayout/searchLayout';
import userPageLayout from 'components/layouts/userPageLayout/userPageLayout';
import TopBar from 'components/topBar'


import MobileLayout from '../components/mobileLayout/mobileLayout';
import {
  SET_IS_MAIN_LOADING
} from 'reducers/types'

class Layout extends Component {
  

  isClientMobile() {
    let mql = window.matchMedia('(max-width: 750px)');
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && mql.matches ) {
        return true;
    }
    return false;
  }
  
  render() {
    const isMobile = this.isClientMobile()

    if(isMobile){
      return (
        <Router>
          <React.Fragment>
            <Route path="/" component={MobileLayout} exact />
          </ React.Fragment>
        </Router>
      ) 
    }else{
      return (
        <React.Fragment>
          {/* {this.props.isMainLoading?
          <div id="mainLoadingScreen">
            <img src={require("images/loading2.gif")} id="mainLoadingImg"  alt="" />
          </div>
          : ""
          } */}
          
          <Router>
            <React.Fragment>
              <LoginScreen />
              <TopBar />
              <div id="layoutContainer">
                <Route path="/" component={searchLayout} exact />
                <Route path="/search/:place?/:time?/:numOfPeople?/:more?" component={searchLayout} /> 
                <Route path="/idea/:ideaID/:place?/:time?/:numOfPeople?/:more?" component={searchLayout} /> 
                <Route path="/create" component={createIdeaLayout} />
                <Route path="/user" component={userPageLayout} />
              </div>
            </ React.Fragment>
          </Router>
        </React.Fragment>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn,
    userID: state.userPageReducer.loggedInUserID,
    isMainLoading: state.commonReducer.isMainLoading
  };
}

export default connect(mapStateToProps)(Layout);    