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
import { convertLinksToThumbNails }  from 'commonUtils'

class IdeaCardInUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currentPreviewedIdeas.length > 0 ? 
          <div id="ideaCardWithButtonsInUser">
            <div id="userIdeaCard">
              <div id="ideaCardInUserWithStats"> 
                <div className="ideaStats" >
                  <div className="userPageIdeaIndicator">
                    Place:<span className="ideaPropertyField">{this.props.currentPreviewedIdea.place}</span>
                  </div>
                  <div className="userPageIdeaIndicator">
                    # People:
                    <span className="ideaPropertyField">
                      {this.props.currentPreviewedIdea.minNumOfPeople}-{this.props.currentPreviewedIdea.maxNumOfPeople}
                    </span>
                  </div>
                </div>
                <div id="ideaCardInUser"> 
                  <div className="ideaTitle">
                    {this.props.currentPreviewedIdea.title}
                  </div>
                  <div id="ideaContentText"> 
                    <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>
                      {this.props.content}
                    </Linkify>
                  </div>
                </div>
              </div>

              <div id="userCardBottomSection">
                <div id="cardIndicationButtons">
                  <div id="cardIndicators"> 
                    <LikeDislike enabled={false} idea={this.props.currentPreviewedIdea} />
                  </div>
                </div>
                <div id="userActionButtons">
                  <EditIdeaButton />
                  <DeleteIdeaButton idea={this.props.currentPreviewedIdea} />
                </div>
                
              </div>
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
  var convertedContent = convertLinksToThumbNails(state.userPageReducer.currentPreviewedIdea.content)

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
