import React, { Component } from 'react'
import './layout.css'
import logo from '../images/logo.svg';
import './layout.css';

// import Counter from './components/Counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from '../store'
import TopBar from '../components/topBar/topBar'
import SearchBar from '../components/searchBar/searchBar'
import IdeaCard from '../components/ideaCard/ideaCard'
import CreateIdeaBar from '../components/searchBar/createIdeaBar'
import CreateIdeaCard from '../components/ideaCard/createIdeaCard'
import LoginScreen from '../components/loginScreen/loginScreen'

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
      <div>
        {this.props.loggedIn == false ? <LoginScreen /> : <React.Fragment />}
        <div id="mainPage">
          <TopBar />
          <div class="mainContent">
            {this.props.currentPage == createIdeaPage ? 
              <React.Fragment>
                <CreateIdeaBar />
                <CreateIdeaCard />
              </React.Fragment>
              :
              <React.Fragment>
                <SearchBar />
                <IdeaCard/>
              </React.Fragment> 
            }
          </div>
        </div>
      </div>
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