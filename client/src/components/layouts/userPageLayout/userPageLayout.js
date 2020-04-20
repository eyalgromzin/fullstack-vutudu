import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import IdeaCardInUser from 'components/ideaCard/ideaCardInUser'
import IdeaCard from 'components/ideaCard/ideaCard'
import EditIdeaCardInUser from 'components/ideaCard/editIdeaCardInUser';
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  } from "reducers/types";
import {showLogInScreen} from 'actions/commonActions'
import ideaCardInUser from '../../ideaCard/ideaCardInUser';

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

  };
}

export default connect(mapStateToProps)(userPageLayout) //getLikedIdeas
