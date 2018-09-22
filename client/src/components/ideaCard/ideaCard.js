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


class IdeaCard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id="ideaCardWithButtons">
          <div id="ideaCard"> 
            <div id="topCardButtons">
              <IdeaPreviousNextButtons />
              <div id="cardIndicators"> 
                <LikeDislike />
                <TimeIndicator />
                <DifficultyIndicator />
              </div>
            </div>
            <div id="ideaTitle"> 
              {this.props.title}
            </div>
            <div id="ideaContentText"> 
              {this.props.content}
            </div>
            <div id="ideaMainContentBottomButtons"> 
              <IdeaAttachmentsButton />
              <IdeaPlaceButton />
            </div>
          </div>
          <div id="statusButtons">
          </div>
          <div>
            <Button bsSize="large" class="alignMiddleDiv" id="doneButton"> Done! </Button>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  return {
    title: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].title,
    content: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].content,
    place: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].place,
    minTIme: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minTIme,
    maxTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxTime,
    minNumOfPeople: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minNumOfPeople,
    maxNumOfPeople: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxNumOfPeople
  };
}

export default connect(mapStateToProps)(IdeaCard);