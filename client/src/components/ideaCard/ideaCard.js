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
import DoneButton from './doneButton'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'


class IdeaCard extends Component {
  constructor(props){
    super(props);

    //load from this idea everything. 
    //then it will be able to get from redux the idea, and pass it as props . and use it.
    this.state = {
      idea: {}
    }
  }

  render() {
    return (
      <React.Fragment>
        <IdeaPreviousNextButtons />
        <div id="ideaCardWithButtons">
          <div id="ideaCardWithShare" >
            
            <div id="ideaCard"> 
              <div id="ideaTitle"> 
                {this.props.title}
              </div>
              <div id="ideaContentText"> 
                {this.props.content}
              </div>
            </div>
            <div id="shareContainer">
                <ShareButton />
            </div>
            
          </div>
          <div id="cardIndicationButtons">
              <div id="cardIndicators"> 
                <LikeDislike />
                <TimeIndicator />
                <DifficultyIndicator />
              </div>
          </div>
        </div> 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  
  return {
    title: state.ideasReducer.currentIdea.title,
    content: state.ideasReducer.currentIdea.content,
    place: state.ideasReducer.currentIdea.place,
    minTIme: state.ideasReducer.currentIdea.minTIme,
    maxTime: state.ideasReducer.currentIdea.maxTime,
    minNumOfPeople: state.ideasReducer.currentIdea.minNumOfPeople,
    maxNumOfPeople: state.ideasReducer.currentIdea.maxNumOfPeople
  };
}

export default connect(mapStateToProps)(IdeaCard);