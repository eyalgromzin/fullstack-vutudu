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
} from 'reducers/types'

class SideBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentPage: "search"
    }
  }

  showNewIdeaScreen = (history) => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{  
      this.setState({currentPage: "newIdea"})
      history.push('/create')
    }
  }

  openUserPage = (history) => {
    if(!this.props.loggedIn){
      showLogInScreen();
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
    <div id="leftSideBar">
      
            <Route render={({history}) => (
              <React.Fragment>
                <img id="searchIdeasButton" src={require("images/searchWhiteWithoutBorder.png")} 
                className={this.state.currentPage == "search"? 
                  "leftBarIconSelected verticalMiddleAlign tilt clickAnimation" : 
                  "leftBarIcon verticalMiddleAlign tilt clickAnimation" }
                  onClick={() => this.searchClick(history)} />

                <img id="newIdeaButton" src={require("images/writeWhiteNoBorder.png")} 
                className={this.state.currentPage == "newIdea"? 
                "leftBarIconSelected verticalMiddleAlign tilt clickAnimation" : 
                "leftBarIcon verticalMiddleAlign tilt clickAnimation" }
                  onClick={() => this.showNewIdeaScreen(history) } />

                <img id="userButton" src={require("images/userWhiteNoBorder.png")} 
                className={this.state.currentPage == "user"? 
                "leftBarIconSelected verticalMiddleAlign tilt clickAnimation" : 
                "leftBarIcon verticalMiddleAlign tilt clickAnimation" }
                onClick={() => this.openUserPage(history) 
                  } />

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