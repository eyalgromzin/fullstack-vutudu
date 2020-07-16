import React, { Component } from 'react'
import './ideaCard.css'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import DifficultyIndicator from './statsButtons/difficultyIndicator/difficultyIndicator'
import TimeIndicator from './statsButtons/timeIndicator/timeIndicator'
import { connect } from 'react-redux';
import Linkify from 'react-linkify';
// import { Button } from 'react-bootstrap';
import 'commonCss.css'
import EditIdeaButton from './editIdeaButton' 
import DeleteIdeaButton from './deleteIdeaButton' 
import { convertLinksToContent }  from 'commonUtils'
import IdeaCard from './ideaCard'
import dcopy from 'deep-copy'

class IdeaCardInUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  var convertedContent = convertLinksToContent(state.userPageReducer.currentPreviewedIdea.content)

  return {
    currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
    content: convertedContent,
    place: state.userPageReducer.currentPreviewedIdea.place,
    time: state.userPageReducer.currentPreviewedIdea.time,
    minNumOfPeople: state.userPageReducer.currentPreviewedIdea.minNumOfPeople,
    maxNumOfPeople: state.userPageReducer.currentPreviewedIdea.maxNumOfPeople,
  };
}

export default connect(mapStateToProps)(IdeaCardInUser)
