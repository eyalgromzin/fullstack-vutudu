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
import Linkify from 'react-linkify';
// import { Button } from 'react-bootstrap';
import 'commonCss.css'
import { SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT } from 'reducers/types'
import EditIdeaButton from './editIdeaButton' 
import DeleteIdeaButton from './deleteIdeaButton' 

class IdeaCardInUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currentPreviewedIdeas.length > 0 ? 
          <div id="ideaCardWithTopBar">
            <div className="ideaIndicators" >
              <div className="userPageIdeaIndicator">
                place: {this.props.currentPreviewedIdea.place}
              </div>
              <div className="userPageIdeaIndicator">
                # of ppl: {this.props.currentPreviewedIdea.minNumOfPeople}-{this.props.currentPreviewedIdea.maxNumOfPeople}
              </div>
            </div>
            <div id="ideaCardWithButtonsInUser">
              <div id="ideaCardInUser"> 
                <div className="ideaTitle">
                  {this.props.currentPreviewedIdea.title}
                </div>
                <div id="ideaContentText"> 
                  <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>
                    {this.props.currentPreviewedIdea.content}
                  </Linkify>
                </div>
              </div>
              <div id="cardIndicationButtons">
                <div id="cardIndicators"> 
                  <LikeDislike enabled={false} idea={this.props.currentPreviewedIdea} />
                  <TimeIndicator enabled={false}  idea={this.props.currentPreviewedIdea}  />  
                  <DifficultyIndicator enabled={false} idea={this.props.currentPreviewedIdea} />
                </div>
              </div>
              <EditIdeaButton />
              <DeleteIdeaButton idea={this.props.currentPreviewedIdea} />
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
    currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
    place: state.userPageReducer.currentPreviewedIdea.place,
    minTime: state.userPageReducer.currentPreviewedIdea.minTime,
    maxTime: state.userPageReducer.currentPreviewedIdea.maxTime,
    minNumOfPeople: state.userPageReducer.currentPreviewedIdea.minNumOfPeople,
    maxNumOfPeople: state.userPageReducer.currentPreviewedIdea.maxNumOfPeople,
  };
}

export default connect(mapStateToProps)(IdeaCardInUser)