import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import IdeaCardInUser from 'components/ideaCard/ideaCardInUser'
import EditIdeaCardInUser from 'components/ideaCard/editIdeaCardInUser';
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  } from "reducers/types";
import {showLogInScreen} from 'actions/commonActions'
// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginManager,
// } = FBSDK;

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

  logout = () =>{
    // LoginManager().logOut()
    var f = 5
    window.FB.logout()
    this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
  }

  render() {
    let isCurrentPreviewedIdeaEmpty = typeof this.props.currentPreviewedIdea === 'undefined' ||
                                      (Object.keys(this.props.currentPreviewedIdea).length === 0 &&
                                      this.props.currentPreviewedIdea.constructor === Object)

    return (
      <React.Fragment>
        <div id="userLayout">
          <div id="userNameAndLogourBar">
            <div id="userFullName">Full name {this.props.userFullName}</div>
            <div id="userLogoutButton" onClick={this.logout} onMouseDown={this.logout} style={{cursor: 'pointer'}}>logout</div>
          </div>

          <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
            <div class="fieldHeader">   </div>
            <div id="UserIdeasTypeDropDown" onClick={this.onIdeaTypeDropDownClick}>
              <UserIdeasTypeDropDown />    
            </div>
            {this.props.currentPreviewedIdeas.length > 0 ? 
              <div id="userIdeasList">
                <UserIdeasList ideas={this.props.currentPreviewedIdeas} updateViewToggle={this.props.updateToggle} />
              </div>
              :
              <span id="emptyIdeasList">Empty Ideas List...</span>
            }
          </div>

          <div id="userLayoutIdeaPreview">
            {this.props.currentPreviewedIdeas.length == 0 || isCurrentPreviewedIdeaEmpty ?
              <div id="userIdeaCardDummy" > 
                <div id="emptyIdeaText" className="middleVerticalAlign">No Idea Selected </div>
              </div> 
              : 
              this.props.isIdeaEdited && !isCurrentPreviewedIdeaEmpty? 
              <EditIdeaCardInUser />
                :
              !isCurrentPreviewedIdeaEmpty? <IdeaCardInUser enabled={false} showNextPreviousButtons={true}/> : ""               
            }
            
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

  };
}

export default connect(mapStateToProps)(userPageLayout) //getLikedIdeas
