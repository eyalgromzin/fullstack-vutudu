import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import IdeasList from 'components/ideasList'
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  SET_USER_CURRENT_PREVIEWED_IDEA,
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  SET_CURRENT_IDEA,
  REMOVE_IDEA_FROM_TOP_TABLE,
  } from "reducers/types";
import {showLogInScreen} from 'actions/commonActions'
import IdeaCard from 'components/ideaCard/ideaCard'
import EditableIdeaAndButton from 'components/createComponent/editableIdeaAndButton'

class userPageLayout extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedIdeaIndex: -1,
    }
  }

  onIdeaTypeDropDownClick = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }
  }

  onLoginSuccess = () => {
    this.props.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: this.props.currentPreviewedIdeas[0]});
  }

  facebookLogout = () =>{
    this.props.history.push('/search')
    window.FB.logout()
    this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.selectedIdeaIndex == -1 && (this.updating == false || this.updating === undefined)){
      this.updating = true
      let index = this.props.currentPreviewedIdeas.findIndex(ideaI => this.props.idea._id == ideaI._id)
      this.setState({selectedIdeaIndex: index})
    }

    if(nextProps.currentPreviewedIdeas.length > 0 )
      return true
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

  OnIdeaDeleted = (idea) => {
    
  }



  createUserIdeaCard = () => {
    let isCurrentPreviewedIdeaExists = typeof this.props.currentPreviewedIdea !== 'undefined' &&
                                      (Object.keys(this.props.currentPreviewedIdea).length != 0)

    let isEditable = this.props.selectedDropDownType.toLowerCase() == 'created';

    let idea = this.props.currentPreviewedIdeas[this.state.selectedIdeaIndex]

    if(this.props.currentPreviewedIdeas.length == 0 || !isCurrentPreviewedIdeaExists){
      return  <div id="userIdeaCardDummy" > 
                <div id="emptyIdeaText" className="middleVerticalAlign">No Idea Selected </div>
              </div> 
    }else{
      if(this.props.isIdeaEdited && isCurrentPreviewedIdeaExists){
        return <EditableIdeaAndButton idea={idea} />
      }else{
        return isCurrentPreviewedIdeaExists && !this.props.isIdeaEdited ? 
          this.props.currentPreviewedIdeas.length > 0 ? 
            <div id="ideaCardWithButtonsInUser">
              <div id="userIdeaCard">
                <IdeaCard enabled={true} 
                  showNextPreviousButtons={true} 
                  editable={isEditable} 
                  deleteable={true} 
                  ideas={this.props.currentPreviewedIdeas}
                  onSelectedIndexChange={this.onSelectedIndexChange} 
                  cardLeftArrowContainerClassName="userCardLeftArrowContainer" 
                  cardRightArrowContainerClassName="userCardRightArrowContainer" 
                  onIdeaDeleted={idea => this.OnIdeaDeleted(idea)}
                  />
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
    this.props.dispatch({type: SET_CURRENT_IDEA, payload: idea});

    let selectedIndex = -1
    for (let i = 0; i < this.props.currentPreviewedIdeas.length; i++){
      if(this.props.currentPreviewedIdeas[i]._id == idea._id){
        selectedIndex = i;
      }
    }
    this.setState({selectedIdeaIndex: selectedIndex});
  }

  onSelectedIndexChange = (newIndex) => {
    if(newIndex === undefined){
      return 
    }

    this.setState({selectedIdeaIndex: newIndex})    

    let ideas = this.props.currentPreviewedIdeas
    let idea = ideas[newIndex]

    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: idea});
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});  //to update ideas list 
	}

  createUserIdeasList = () => {
    if (this.props.currentPreviewedIdeas.length > 0){
      return <div id="ideasList">
        <IdeasList 
          ideas={this.props.currentPreviewedIdeas} 
          imageClassName="topTableItemImage"
          titleClassName="topTableItemTitle" 
          listItemClassName="ideaCardListItem" 
          selectedListItemClassName="selectedItemsListItem"
          isToShowImage={false}  
          onClick={this.ideaSelected}           
          selectedIndex={this.state.selectedIdeaIndex}  
          />
      </div>
    }else{
      return <span id="emptyIdeasList">Empty Ideas List...</span>
    }      
  }

  render() {
    let userIdeasList = this.createUserIdeasList()
    
    let userIdeaCard = this.createUserIdeaCard()

    let logoutButton = this.createLogourButton()

    if(this.props.currentPreviewedIdeas.length > 0){
      var s = 4;
      s++;
    }

    return (
      <React.Fragment>
        <div id="userLayout">
          <div id="userNameAndLogourBar">
            <div id="userFullName">{this.props.firstName + " " + this.props.lastName + " - " + this.props.email} </div>
            {logoutButton}
          </div>

          <div id="userListAndCard">
            <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
              <div id="UserIdeasTypeDropDown" onClick={this.onIdeaTypeDropDownClick}>
                <UserIdeasTypeDropDown />    
              </div>
                {userIdeasList}
            </div>
            <div id="userLayoutIdeaPreview">
              {userIdeaCard}
            </div>
          </div>
        </div>
      </React.Fragment>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    currentIdea: state.ideaCardReducer.currentIdea,
    firstName: state.userPageReducer.loggedInUserFirstName,
    lastName: state.userPageReducer.loggedInUserLastName,
    idea: state.ideaCardReducer.currentIdea,
    email: state.userPageReducer.email,
    userID: state.userPageReducer.loggedInUserID,
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
    updateToggle: state.userPageReducer.updateToggle,
    loggedIn: state.commonReducer.loggedIn,
    selectedDropDownType: state.userPageReducer.selectedDropDownType,
    loggedInWith: state.userPageReducer.loggedInWith
  };
}

export default connect(mapStateToProps)(userPageLayout) //getLikedIdeas
