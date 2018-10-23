import React, { Component } from 'react'
import 'commonCss.css'
import './layout.css'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
    <React.Fragment>
    <div id="leftSideBar">
      <div id="mainLogo vertical-text"> VUTUDU </div> 
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
    </React.Fragment>
    )
  }
}
