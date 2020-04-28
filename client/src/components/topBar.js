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
  SET_CURRENT_PAGE,
  IS_TOP_TABLE_SHOULD_BE_CLEAN,
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
      this.setState({currentPage: "create"})
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
    this.props.dispatch({type: IS_TOP_TABLE_SHOULD_BE_CLEAN, payload: true});
    return history.push('/search')
  }
    
  render() {
    let selectedTab = ""
    if(this.state.currentPage == "search") selectedTab = "search" 
    if(this.state.currentPage == "create") selectedTab = "create" 
    if(this.state.currentPage == "user") selectedTab = "user" 

    if(this.props.currentPage == "search" && this.state.currentPage != "search") {
      this.setState({currentPage: "search" })
      this.props.dispatch({type: SET_CURRENT_PAGE, value: ""})
    }
    if(this.props.currentPage == "create" && this.state.currentPage != "create") {
      this.setState({currentPage: "create" })
      this.props.dispatch({type: SET_CURRENT_PAGE, value: ""})
    }
    if(this.props.currentPage == "user" && this.state.currentPage != "user"){
      this.setState({currentPage: "user" })
      this.props.dispatch({type: SET_CURRENT_PAGE, value: ""})
    } 

    return (
    <React.Fragment>
    <div id="topBar">
      <Route render={({history}) => (
        <React.Fragment>
          <div id="mainLogo" className=""> 
            <img src={require("images/logo.png")} id="mainLogoImage" alt="VUTUDU" />     
            <span id="mainLogoText">VUTUDU</span>
          </div> 
          <div id="rightSideButtons">
            <img id="searchIdeasButton" src={require("images/search.png")} 
            className={this.state.currentPage == "search"? 
              "topBarIconSelected tilt clickAnimation" : 
              "topBarIcon tilt clickAnimation" } alt="" 
              onClick={() => this.searchClick(history)} />

            <img id="newIdeaButton" src={require("images/plus.png")} 
            className={this.state.currentPage == "create"? 
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
    currentPage: state.commonReducer.currentPage
  };
}

export default connect(mapStateToProps)(TopBar);