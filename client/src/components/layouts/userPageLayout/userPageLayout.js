import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import IdeaCardInUser from 'components/ideaCard/ideaCardInUser'
import IdeaCard from 'components/ideaCard/ideaCard'
import EditIdeaCardInUser from 'components/ideaCard/editIdeaCardInUser';
// import { loggedInWith } from 'common.js'
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  } from "reducers/types";
import {showLogInScreen} from 'actions/commonActions'
import ideaCardInUser from '../../ideaCard/ideaCardInUser';
import { GoogleLogout } from 'react-google-login';

class userPageLayout extends Component {
  constructor(props){
    super(props);

    this.props.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS});
  }

  onIdeaTypeDropDownClick = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }
  }

  facebookLogout = () =>{
    this.props.history.push('/search')
    window.FB.logout()
    this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
  }

  googleLogoutSuccess = () => {
    this.props.history.push('/search')
    console.log("signed out of google");
    this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
  }

  render() {
    let isCurrentPreviewedIdeaEmpty = typeof this.props.currentPreviewedIdea === 'undefined' ||
                                      (Object.keys(this.props.currentPreviewedIdea).length === 0 &&
                                      this.props.currentPreviewedIdea.constructor === Object)

    let userIdeasList = ""
    if (this.props.currentPreviewedIdeas.length > 0){
      userIdeasList = 
      <div id="userIdeasList">
        <UserIdeasList ideas={this.props.currentPreviewedIdeas} updateViewToggle={this.props.updateToggle} />
      </div>
    }else{
      userIdeasList = <span id="emptyIdeasList">Empty Ideas List...</span>
    }      
    
    let userIdeaCard = ""
    if(this.props.currentPreviewedIdeas.length == 0 || isCurrentPreviewedIdeaEmpty){
      userIdeaCard = 
      <div id="userIdeaCardDummy" > 
        <div id="emptyIdeaText" className="middleVerticalAlign">No Idea Selected </div>
      </div> 
    }else{
      if(this.props.isIdeaEdited && !isCurrentPreviewedIdeaEmpty){
        userIdeaCard = <EditIdeaCardInUser />
      }else{
        userIdeaCard = !isCurrentPreviewedIdeaEmpty? <IdeaCardInUser enabled={false} showNextPreviousButtons={true}/> : ""               
      }
    }

    let logoutButton
    if(this.props.loggedInWith == 'Google'){
      logoutButton = <span onClick={this.googleLogoutSuccess} >logout</span>
    }else if(this.props.loggedInWith == 'Facebook'){
      logoutButton = 
        <div id="userLogoutButton" onClick={this.facebookLogout} onMouseDown={this.facebookLogout} style={{cursor: 'pointer'}}>logout</div>
    }

    return (
      <React.Fragment>
        <div id="userLayout">
          <div id="userNameAndLogourBar">
            <div id="userFullName">Full name {this.props.userFullName}</div>
            {logoutButton}
          </div>

          <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
            <div class="fieldHeader">   </div>
            <div id="UserIdeasTypeDropDown" onClick={this.onIdeaTypeDropDownClick}>
              <UserIdeasTypeDropDown />    
            </div>
            {userIdeasList}
          </div>

          <div id="userLayoutIdeaPreview">
            {userIdeaCard}
            
          </div>
        </div>
      </React.Fragment>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.userPageReducer.loggedInUserFirstName,
    lastName: state.userPageReducer.loggedInUserLastName,
    userID: state.userPageReducer.loggedInUserID,
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
    updateToggle: state.userPageReducer.updateToggle,
    loggedIn: state.commonReducer.loggedIn,
    loggedInWith: state.userPageReducer.loggedInWith
  };
}

export default connect(mapStateToProps)(userPageLayout) //getLikedIdeas
