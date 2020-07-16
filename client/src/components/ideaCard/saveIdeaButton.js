import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './ideaCard.css'
import {
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
  CHANGE_USER_UPDATE_TOGGLE,
  UPDATE_IDEA_IN_LIST,
  UPDATE_CURRENT_IDEA,
} from 'reducers/types'
import { updateIdea } from 'actions/ideaActions'
import store from 'store';
import { showLogInScreen } from 'actions/commonActions'
import { isIdeaTitleExists } from 'actions/ideaActions';
import { uuidv4, getImageLinkFromIdeaContent } from 'commonUtils'
import { updateCreatedIdeaInUser } from 'actions/userActions'
import { UPDATE_LOCAL_USER_CREATED_IDEA } from '../../reducers/types';
var ls = require('local-storage');


class SaveIdeaButton extends Component {
  constructor(props){
    super();
  }

  onSaveIdea = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
      return
    }

    this.props.placesRef.validate() 
    this.props.timeRef.validate()
    this.props.numOfPeopleRef.validate() 
    this.props.subjectsRef.validate() 
    this.props.imagePickerRef.validate() 
    this.props.titleRef.validate()

    if(this.props.placesRef.validate() &&
        this.props.timeRef.validate() &&
        this.props.numOfPeopleRef.validate() &&
        this.props.subjectsRef.validate() &&
        this.props.imagePickerRef.validate() && 
        this.props.titleRef.validate()){

      // this.props.isIdeaTitleExists(this.props.titleRef.state.text, this.isTitleExistsCallback);
      this.saveIdea()
    }

    store.dispatch({ type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE, payload: true });
  }

  isTitleExistsCallback = (isTitleExists) => {
    if(!isTitleExists){
      this.saveIdea()
    }else{
      this.showAlert()
    }
  }

  saveIdea = () => {
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});

    store.dispatch({type: CHANGE_USER_UPDATE_TOGGLE});

    let cloudImagePath = ""
    if(this.props.imagePickerRef.state.imageName == ""){
      cloudImagePath = getImageLinkFromIdeaContent(this.props.idea.content)
    }else{
      var uniqueIdentifier = this.props.imagePickerRef.state.uniqueIdentifier

      if(ls.get(uniqueIdentifier) != null){
        cloudImagePath = ls.get(uniqueIdentifier)
      }else{
        cloudImagePath = "images/" + uuidv4() + this.props.imagePickerRef.state.imageName
      }
    }
    

    let content = '[{"first":"TEXT","fourth":"","second":0,"third":"' + this.props.contentRef.state.text + '"}, ' + 
                    '{"first":"IMAGE","fourth":"","second":1,"third":"' + cloudImagePath + '"}]'

    let ideaId = this.props.idea._id
    let places = this.props.placesRef.state.text.split(",")
    let subjects = this.props.subjectsRef.state.text.split(",")
    let title = this.props.titleRef.state.text
    let minTime = this.props.timeRef.state.minTime
    let maxTime = this.props.timeRef.state.maxTime
    let minNumOfPeople = this.props.newMinNumOfPeople
    let maxNumOfPeople = this.props.newMaxNumOfPeople

    this.props.updateIdea(      
      ideaId,
      title,
      content,
      places,
      subjects,
      minTime,
      maxTime,
      minNumOfPeople,
      maxNumOfPeople, 
      (res) => {
        console.log('got reply from: /api/items/updateIdeaAllFields');

        store.dispatch({
          type: UPDATE_IDEA_IN_LIST,
          payload: {ideaId, title, content, places, minTime, maxTime, minNumOfPeople, maxNumOfPeople, 
                subjects}
        });
        
        store.dispatch({  //works
          type: UPDATE_CURRENT_IDEA,
          payload: {ideaId, title, content, 
            places, subjects, minTime, maxTime, minNumOfPeople, maxNumOfPeople}
        });

        
      });

      this.props.updateCreatedIdeaInUser(this.props.userID, ideaId, title, content, places, subjects, 
        minTime, maxTime, minNumOfPeople, maxNumOfPeople, (res) => {
          console.log('got reply from: /api/items/updateUserCreatedIdeaAllFields');
          store.dispatch({  //works
            type: UPDATE_LOCAL_USER_CREATED_IDEA,
            payload: {ideaId, title, content, 
              places, subjects, minTime, maxTime, minNumOfPeople, maxNumOfPeople}
          });
        })
  }

  closeAlert = () => {
    this.setState({show: false})
  }

  showAlert = () => {
    this.setState({show: true})
  }

  render() {
    return (
      <React.Fragment>
        <div id="saveIdeaButton" onClick={() => {this.onSaveIdea() }} > Save Idea </div>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return({
    updateIdea: bindActionCreators (updateIdea, dispatch),
    updateCreatedIdeaInUser: bindActionCreators (updateCreatedIdeaInUser, dispatch),
    isIdeaTitleExists: bindActionCreators (isIdeaTitleExists, dispatch),
    dispatch
  })
}

function mapStateToProps(state) {
  return {
    // currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,    
    newTags: state.editableIdeaReducer.subjects,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdeas
                          .filter (idea => {return state.editableIdeaReducer.id == idea._id})[0],
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    userID: state.userPageReducer.loggedInUserID,
    updateToggle: state.userPageReducer.updateToggle,
    newTime: state.editableIdeaReducer.time,
    placesText: state.editableIdeaReducer.placesText,
    subjectsText: state.editableIdeaReducer.subjectsText,
    newMinNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    newMaxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps,mapDispatchToProps )(SaveIdeaButton) //updateUserIdeas