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

export default class ShowIdeaCardInUser extends Component {
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
            <div id="ideaTitle"> 
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
          <div id="statusButtons">
          </div>
      </div>
    )
  }
}
