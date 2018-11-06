import React, { Component } from 'react'
import 'commonCss.css'
import './layout.css'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class SideBar extends Component {
  render() {
    return (
    <React.Fragment>
    <div id="leftSideBar">
      
            <Route render={({history}) => (
              <React.Fragment>
                <img id="searchIdeasButton" src={require("images/search_white.png")} className="leftBarIcon verticalMiddleAlign" 
                  onClick={() => { history.push('/search') }}
                />
                <img id="newIdeaButton" src={require("images/writeWhite.png")} className="leftBarIcon verticalMiddleAlign"
                  onClick={() => { history.push('/create') }}
                />
                <img id="userButton" src={require("images/userIconWhite.png")} className="leftBarIcon verticalMiddleAlign alignMiddle"
                  onClick={() => { history.push('/user') }}
                />
                
                <div id="mainLogo" class="vertical-text"> VUTUDU </div> 

              </React.Fragment> 
            )} />
    </div>
    </React.Fragment>
    )
  }
}
