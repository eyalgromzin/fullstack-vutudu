import React, { Component } from 'react'
import Linkify from 'react-linkify';
import './ideaCard.css'
import IdeaNextButtonsPreviousButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap';
import 'commonCss.css'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'
import CardIndicators from 'components/ideaCard/cardIndicators'


class IdeaCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="mainContent">
          <IdeaNextButtonsPreviousButtons />
          <div id="ideaCardWithButtons">
            <div id="ideaCardWithShare" >
              <div id="ideaCard"> 
                <div className="ideaTitle"> 
                  {this.props.title}
                </div>
                <div id="ideaContentText"> 
                  <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>
                    {this.props.content}
                  </Linkify>
                </div>
              </div>
              <div id="shareContainer">
                <ShareButton />
              </div>
            </div>
            <CardIndicators idea={this.props.idea} enabled={true} refresh={this.props.refresh} enabled={this.props.enabled} />
          </div> 
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  
  return {
    title: state.searchPageReducer.currentIdea.title,
    content: state.searchPageReducer.currentIdea.content,
    place: state.searchPageReducer.currentIdea.place,
    minTIme: state.searchPageReducer.currentIdea.minTIme,
    maxTime: state.searchPageReducer.currentIdea.maxTime,
    minNumOfPeople: state.searchPageReducer.currentIdea.minNumOfPeople,
    maxNumOfPeople: state.searchPageReducer.currentIdea.maxNumOfPeople
  };
}

export default connect(mapStateToProps)(IdeaCard);