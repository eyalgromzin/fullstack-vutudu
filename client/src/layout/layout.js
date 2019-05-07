import React, { Component } from 'react'
import './layout.css'
import { connect } from 'react-redux';
import LoginScreen from '../components/loginScreen/loginScreen'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import createIdeaLayout from '../components/createCopmonent/createIdeaLayout';
import searchLayout from '../components/searchLayout/searchLayout';
import userPageLayout from 'components/layouts/userPageLayout/userPageLayout';
import SideBar from 'components/sideBar'
import { updateTopIdeas } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import {
  SET_IS_MAIN_LOADING
} from 'reducers/types'

class Layout extends Component {
  componentWillMount(){
    //get top table results
    this.props.dispatch({type: SET_IS_MAIN_LOADING, payload: true})
    this.props.updateTopIdeas();
  }
  
  render() {
    return (
      <React.Fragment>
        {this.props.isMainLoading?
        <div id="mainLoadingScreen">
          <img src={require("images/loading2.gif")} id="mainLoadingImg"  alt="" />
        </div>
        : ""
        }
        <LoginScreen />
        <Router>
          <React.Fragment>
              <SideBar />
              <Redirect from="/" to="/search" />  {/* cause on startup , the url is /, and it shows nothing */}
              <Route path="/search" component={searchLayout} />
              <Route path="/create" component={createIdeaLayout} />
              <Route path="/user" component={userPageLayout} />
          </ React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTopIdeas: bindActionCreators (updateTopIdeas, dispatch),
    dispatch,
  }
}
 
function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn,
    userID: state.userPageReducer.loggedInUserID,
    isMainLoading: state.commonReducer.isMainLoading
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);    