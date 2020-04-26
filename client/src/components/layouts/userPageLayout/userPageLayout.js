import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import IdeasList from 'components/ideasList/ideasList'
import IdeaCardInUser from 'components/ideaCard/ideaCardInUser'
import EditIdeaCardInUser from 'components/ideaCard/editIdeaCardInUser';
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  SET_USER_CURRENT_PREVIEWED_IDEA,
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  } from "reducers/types";
import {showLogInScreen} from 'actions/commonActions'
import IdeaCard from 'components/ideaCard/ideaCard'

class userPageLayout extends Component {
  constructor(props){
    super(props);

    this.props.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS});

    this.state = {
      selectedIdeaIndex: 0
    }
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

  createLogourButton = () => {
    if(this.props.loggedInWith == 'Google'){
      return <span onClick={this.googleLogoutSuccess} style={{cursor: 'pointer'}} >logout</span>
    }else if(this.props.loggedInWith == 'Facebook'){
      return <div id="userLogoutButton" onClick={this.facebookLogout} onMouseDown={this.facebookLogout} 
            style={{cursor: 'pointer'}}>logout</div>
    }
  }

  createUserIdeaCard = () => {
    let isCurrentPreviewedIdeaExists = typeof this.props.currentPreviewedIdea !== 'undefined' &&
                                      (Object.keys(this.props.currentPreviewedIdea).length != 0)

    if(this.props.currentPreviewedIdeas.length == 0 || !isCurrentPreviewedIdeaExists){
      return  <div id="userIdeaCardDummy" > 
                <div id="emptyIdeaText" className="middleVerticalAlign">No Idea Selected </div>
              </div> 
    }else{
      if(this.props.isIdeaEdited && isCurrentPreviewedIdeaExists){
        return <EditIdeaCardInUser />
      }else{
        return isCurrentPreviewedIdeaExists && !this.props.isIdeaEdited ? 
          this.props.currentPreviewedIdeas.length > 0 ? 
            <div id="ideaCardWithButtonsInUser">
              <div id="userIdeaCard">
                <IdeaCard idea={this.props.currentPreviewedIdea} enabled={true} showNextPreviousButtons={true} 
                  editable={this.props.editable} deleteable={true} ideas={this.props.currentPreviewedIdeas}
                  onSelectedIndexChange={this.onSelectedIndexChange} />
              </div>
            </div>
            :
            ""
          : 
          ""               
      }
    }
  }

  ideaSelected = (idea) => {
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: idea});
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});  //to update ideas list 
  }

  onSelectedIndexChange = (newIndex) => {
		this.setState({selectedIdeaIndex: newIndex})
	}

  createUserIdeasList = () => {
    if (this.props.currentPreviewedIdeas.length > 0){
      return <div id="ideasList">
        <IdeasList ideas={this.props.currentPreviewedIdeas} onIdeaSelected={this.ideaSelected} 
          onSelectedIndexChange={this.onSelectedIndexChange} selectedIndex={this.state.selectedIdeaIndex}  />
      </div>
    }else{
      return <span id="emptyIdeasList">Empty Ideas List...</span>
    }      
  }

  render() {
    let userIdeasList = this.createUserIdeasList()
    
    let userIdeaCard = this.createUserIdeaCard()

    let logoutButton = this.createLogourButton()

    return (
      <React.Fragment>
        <div id="userLayout">
          <div id="userNameAndLogourBar">
            <div id="userFullName">Full name {this.props.userFullName}</div>
            {logoutButton}
          </div>

          <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
            <div className="fieldHeader">   </div>
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
