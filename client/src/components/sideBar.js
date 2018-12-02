import React, { Component } from 'react'
import 'commonCss.css'
import './layout.css'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {showLogInScreen} from 'actions/commonActions'


class SideBar extends Component {
  showLogin = () => {
    showLogInScreen();
  }

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

                {
                  this.props.loggedIn?
                  <img id="userButton" src={require("images/userIconWhite.png")} className="leftBarIcon verticalMiddleAlign alignMiddle"
                  onClick={() => { history.push('/user') }} />
                  :
                  <img id="userButton" src={require("images/userIconWhite.png")} className="leftBarIcon verticalMiddleAlign alignMiddle"
                  onClick={this.showLogin} />
                }

                <div id="mainLogo" className="vertical-text"> VUTUDU </div> 

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

export default connect(mapStateToProps)(SideBar);