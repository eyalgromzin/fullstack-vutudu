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
import { SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT } from 'reducers/types'
import EditIdeaButton from './editIdeaButton' 

class ShowIdeaCardInUser extends Component {
  constructor(){
    super();

    this.state ={ 
      isEdit: false,
    }
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
            <div class="ideaTitle">
              {this.props.title}
            </div>
            <div id="ideaContentText"> 
              {this.props.content}
            </div>
            <div id="ideaMainContentBottomButtons"> 
              {/* <IdeaAttachmentsButton /> */}
              {/* <IdeaPlaceButton /> */}
            </div>
          </div>
          
          <EditIdeaButton />
          
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
