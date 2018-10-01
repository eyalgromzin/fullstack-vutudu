import React, { Component } from 'react'
import './topBar.css'
import 'commonCss.css'
import { connect } from 'react-redux';
import {CHANGE_PAGE_TO_SHOW_USER, 
  CHANGE_PAGE_TO_CREATE_IDEA,
  CHANGE_PAGE_TO_SHOW_IDEAS} from 'reducers/types'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TopBar extends Component {
  constructor(props){
    super(props);
  }

  showUserDropDown = () => {

  }

  render() {
    return (
      <div id="TopBar mainContent">
        <div className="mainContent"> 
          <img src={require("images/logo3.png")} className="topBarLogo verticalMiddleAlign" />
          <div id="mainLogo"> VUTUDU </div> 
            <Route render={({history}) => (
              <React.Fragment>
                <img id="userButton" src={require("images/user.png")} className="topBarIcon verticalMiddleAlign alignRight"
                  onClick={() => { history.push('/user') }}
                />
                <img id="newIdeaButton" src={require("images/newIdea.png")} className="topBarIcon verticalMiddleAlign alignRight"
                  onClick={() => { history.push('/create') }}
                />
                <img id="searchIdeasButton" src={require("images/search.png")} className="topBarIcon verticalMiddleAlign alignRight" 
                  onClick={() => { history.push('/search') }}
                />
              </React.Fragment>
            )} />
            
        </div>
      </div>  
    )
  }
}

export default connect()(TopBar);