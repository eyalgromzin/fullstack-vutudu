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
// import { Button } from 'react-bootstrap';
import 'commonCss.css'
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
      <React.Fragment>
        {this.props.currentPreviewedIdeas.length > 0 ? 
          <div id="ideaCardWithButtonsInUser">
            <div id="ideaCardInUser"> 
              <div class="ideaTitle">
                {this.props.title}
              </div>
              <div id="ideaContentText"> 
                {this.props.content}
              </div>
            </div>
            <div id="cardIndicationButtons">
                <div id="cardIndicators"> 
                  <LikeDislike enabled="false" />
                  <TimeIndicator enabled="false" />
                  <DifficultyIndicator enabled="false" />
                </div>
              </div>
            <EditIdeaButton />
            
            <div id="statusButtons">
            </div>
        </div>
        :
        ""
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.userPageReducer.currentPreviewedIdea.title,
    content: state.userPageReducer.currentPreviewedIdea.content,
    currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
  };
}

export default connect(mapStateToProps)(ShowIdeaCardInUser)
