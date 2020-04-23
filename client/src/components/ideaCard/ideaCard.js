import React, { Component } from 'react'
import Linkify from 'react-linkify';
import './ideaCard.css'
import IdeaNextButtonsPreviousButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import { connect } from 'react-redux';
import 'commonCss.css'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'
import CardIndicators from 'components/ideaCard/cardIndicators'
import { convertJsonContentToHtml } from 'commonUtils'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import IdeaCardContent from 'components/ideaCard/ideaCardContent'


class IdeaCard extends Component {
  render() {
    if(this.props.idea.content !== undefined){
      // var convertedContentJsx = convertJsonContentToHtml(this.props.idea.content)
      // convertedContent = Promise.resolve(convertedContent);
      // var convertedContentJsx = <div> this is an idea card </div>  //works

      return (
        <React.Fragment>
          <div id="ideaCardIdeaArrows">
            {this.props.showNextPreviousButtons? <IdeaNextButtonsPreviousButtons /> : null}
          </div>
          <div className="IdeaContent">
            <div id="ideaCardWithButtons">
              <div id="ideaCardWithShare" >
                <div id="ideaCard"> 
                  <div className="ideaTitle"> 
                    {this.props.idea.title}
                  </div>
                  <div id="ideaContentText"> 
                    <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>
                      {/* {ReactHtmlParser(convertedContent)} */}
                      <IdeaCardContent content={this.props.idea.content} createdIn={this.props.idea.createdIn} />
                    </Linkify>
                  </div>
                </div>
                <div id="shareAndLikeContainer">
                  <LikeDislike idea={this.props.idea} enabled={this.props.enabled} />
                  <div id="shareButtonContainer">
                    <ShareButton />
                  </div>
                </div>
              </div>
              {/* <CardIndicators idea={this.props.idea} enabled={this.props.enabled} />  //enabled={true} */}
            </div> 
          </div>
        </React.Fragment>
      )
    }else{
      return <React.Fragment />
    }
  }
}

function mapStateToProps(state) {
  return {
    title: state.searchPageReducer.currentIdea.title,
    content: state.searchPageReducer.currentIdea.content,
    place: state.searchPageReducer.currentIdea.place,
    time: state.searchPageReducer.currentIdea.time,
    minNumOfPeople: state.searchPageReducer.currentIdea.minNumOfPeople,
    maxNumOfPeople: state.searchPageReducer.currentIdea.maxNumOfPeople
  };
}

export default connect(mapStateToProps)(IdeaCard);