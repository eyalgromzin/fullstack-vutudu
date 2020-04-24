import React, { Component } from 'react'
import 'commonCss.css'
import 'cssAnimations.css'
import './layout.css'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {showLogInScreen} from 'actions/commonActions'
import { 
  SET_TOP_TABLE_IS_IDEA_CLICKED,
  CHANGE_SEARCHED_STATE,
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
} from 'reducers/types'

class TopBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentPage: "search"
    }
  }

  showCreateIdeaScreen = (history) => {
    if(!this.props.loggedIn){
      showLogInScreen('create', history);
    }else{  
      this.props.dispatch({type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE, value: false})
      this.setState({currentPage: "newIdea"})
      history.push('/create')
    }
  }

  openUserPage = (history) => {
    if(!this.props.loggedIn){
      showLogInScreen('user', history);
    }else{  
      this.setState({currentPage: "user"})
      history.push('/user')
    }
    
  }

  searchClick = (history) => {
    this.setState({currentPage: "search"})
    this.props.dispatch({type: SET_TOP_TABLE_IS_IDEA_CLICKED, payload: false});
    this.props.dispatch({type: CHANGE_SEARCHED_STATE, payload: false});
    return history.push('/search')
  }
    
  render() {
    return (
    <React.Fragment>
    <div id="topBar">
      <Route render={({history}) => (
        <React.Fragment>
          <div id="rightSideButtons">
            <img id="searchIdeasButton" src={require("images/search.png")} 
            className={this.state.currentPage == "search"? 
              "topBarIconSelected tilt clickAnimation" : 
              "topBarIcon tilt clickAnimation" } alt="" 
              onClick={() => this.searchClick(history)} />

            <img id="newIdeaButton" src={require("images/plus.png")} 
            className={this.state.currentPage == "newIdea"? 
            "topBarIconSelected tilt clickAnimation" : 
            "topBarIcon tilt clickAnimation" } alt="" 
              onClick={() => this.showCreateIdeaScreen(history) } />

            <img id="userButton" src={require("images/user.png")} 
            className={this.state.currentPage == "user"? 
            "topBarIconSelected tilt clickAnimation" : 
            "topBarIcon tilt clickAnimation" } alt="" 
            onClick={() => this.openUserPage(history) 
              } />
          </div>
          
          <div id="mainLogo" className=""> 
            <span id="mainLogoText">VUTUDU</span>
            <img src={require("images/logo.png")} id="mainLogoImage" alt="VUTUDU" />            
          </div> 
          

        </React.Fragment> 
      )} />
    </div>
    </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps)(TopBar);