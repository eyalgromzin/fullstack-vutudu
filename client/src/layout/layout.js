import React, { Component } from 'react'
import './layout.css'
import logo from '../images/logo.svg';

// import Counter from './components/Counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from 'store'
import TopBar from '../components/topBar/topBar'
import SearchBar from '../components/searchBar/searchBar'
import IdeaCard from '../components/ideaCard/ideaCard'
import CreateIdeaBar from '../components/searchBar/createIdeaBar'
import EditIdeaCard from '../components/ideaCard/editIdeaCard'
import LoginScreen from '../components/loginScreen/loginScreen'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import createLayout from '../components/createCopmonent/createLayout';
import searchLayout from '../components/searchLayout/searchLayout';
import userLayout from '../components/layouts/userLayout/userLayout';
import SideBar from 'components/sideBar'
// import { updateUserIdeas } from '../actions/userActions';

import {
  SET_USER_LIKED_IDEAS,
  SET_USER_CREATED_IDEAS
} from 'reducers/types' 

export const showIdeaPage = 'SHOW_IDEAS';
export const createIdeaPage = 'CREATE_IDEA';

 



class Layout extends Component {

  constructor(){
    super();

    //TODO: get current page from redux
    this.state = {
      currentPage: showIdeaPage,
      place: ''
    }
  }

  // componentDidMount() {
  //   //update user ideas on website startup
  //   // this.props.updateUserIdeas(this.props.userID, 'Liked', SET_USER_LIKED_IDEAS);
  //   // this.props.updateUserIdeas(this.props.userID, 'Created', SET_USER_CREATED_IDEAS);
  // }
  
  render() {
    return (
      <React.Fragment>
        <LoginScreen />
        <Router>
          <React.Fragment>
              {/* <TopBar />     */}
              <SideBar />
              <Redirect from="/" to="/search" />  {/* cause on startup , the url is /, and it shows nothing */}
              <Route path="/search" component={searchLayout} />
              <Route path="/create" component={createLayout} />
              <Route path="/user" component={userLayout} />
          </ React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.commonReducer.currentPage,
    loggedIn: state.commonReducer.loggedIn,
    userID: state.userPageReducer.loggedInUserID,

  };
}

export default connect(mapStateToProps)(Layout);    