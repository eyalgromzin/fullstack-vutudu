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
      </div>
    )
  }
}

function mapStateToProps(state) {
  var x=5;
  x++;
  return {
    content: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].content,
    title: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].title
  };
}

export default connect(mapStateToProps)(IdeaCard);