import React, { Component } from 'react'
import './ideaCard.css'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import DifficultyIndicator from './statsButtons/difficultyIndicator/difficultyIndicator'
import TimeIndicator from './statsButtons/timeIndicator/timeIndicator'
import IdeaPreviousNextButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import CardCountInfo from './cardButtons/cardCountInfo/cardCountInfo'
import IdeaAttachmentsButton from './cardButtons/ideaAttachmentsButton/ideaAttachmentButton'
import IdeaPlaceButton from './cardButtons/placeButton/placeButton'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import 'commonCss.css'
import DoneButton from './doneButton'

class ShowIdeaCardInUser extends Component {
  constructor(){
    super();
  }

  editIdeaID = (ideaID) => {
    //make the fields to text boxes to edit the fields
    this.state.isEdit = true;
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: true});
  }

  editIdea = () => {
    //make the fields to text boxes to edit the fields
    this.editIdeaID(this.props.currentPreviewedIdea._id);
  }

  render() {
    return (
        <div id="ideaCardWithButtons">
          <div id="ideaCard"> 
            <div id="topCardButtons">
              <div id="cardIndicators"> 
                <LikeDislike enabled="false" />
                <TimeIndicator enabled="false" />
                <DifficultyIndicator enabled="false" />
              </div>
            </div>
          
            <div id="ideaContentText"> 
              {this.props.content}
            </div>
            <div id="ideaMainContentBottomButtons"> 
              {/* <IdeaAttachmentsButton /> */}
              {/* <IdeaPlaceButton /> */}
            </div>
            <div>
              
            
                  
            </div>
          </div>
          { this.props.currentPreviewedIdeaType == "Created" && this.props.currentPreviewedIdea != null 
              && !this.state.isEdit ? 
            <img src={require("images/edit.png")} id="editIdeaButton" 
            onClick={() => {
                this.editIdea()
              }}  />  
            : 
            <React.Fragment /> 
          }

          {
            this.state.isEdit && 
            <img src={require("images/save.png")} id="editIdeaButton" 
            onClick={() => {
                this.editIdea()
              }}  />  
          }
          <div id="statusButtons">
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.userReducer.currentPreviewedIdea.title,
    content: state.userReducer.currentPreviewedIdea.content,
    currentPreviewedIdeaType: state.userReducer.selectedDropDownType,
    currentPreviewedIdea: state.userReducer.currentPreviewedIdea,
  };
}

export default connect(mapStateToProps)(ShowIdeaCardInUser)
