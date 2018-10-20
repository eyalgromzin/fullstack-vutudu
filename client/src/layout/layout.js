import React, { Component } from 'react'
import './layout.css'
import logo from '../images/logo.svg';

// import Counter from './components/Counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from '../store'
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
  
  render() {
    return (
      <React.Fragment>
        <LoginScreen />
        <Router>
          <React.Fragment>
            {/* <div class="mainContent"> */}
              <TopBar />    
              <Redirect from="/" to="/search" />
              <Route path="/search" component={searchLayout} />
              <Route path="/create" component={createLayout} />
              <Route path="/user" component={userLayout} />
            {/* </div> */}
          </ React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.commonReducer.currentPage,
    loggedIn: state.commonReducer.loggedIn
  };
}

export default connect(mapStateToProps)(Layout);