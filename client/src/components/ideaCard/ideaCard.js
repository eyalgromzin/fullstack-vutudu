import React, { Component } from 'react'
import Linkify from 'react-linkify';
import './ideaCard.css'
import IdeaNextButtonsPreviousButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import { connect } from 'react-redux';
import 'commonCss.css'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'
import CardIndicators from 'components/ideaCard/cardIndicators'
import { findIdeaIndex } from 'commonUtils'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import IdeaCardContent from 'components/ideaCard/ideaCardContent'
import EditIdeaButton from 'components/ideaCard/editIdeaButton' 
import DeleteIdeaButton from './deleteIdeaButton';


class IdeaCard extends Component {
  constructor(props){
    super(props)

    let currentIdeaIndex = findIdeaIndex(props.idea, props.ideas)

    this.state = {
      currentIdeaIndex: currentIdeaIndex,
      ideas: props.ideas,
      idea: props.idea,
    }
  }

  rightArrowClick = () => {
    var ideasCount = this.props.ideas.length;

    if(ideasCount <= 1){
      return 
    }
    
    let currentIdeaIndex = this.state.currentIdeaIndex

    currentIdeaIndex += 1
    
    if(currentIdeaIndex == ideasCount){
      currentIdeaIndex = 0
    }

    this.setState({currentIdeaIndex: currentIdeaIndex})
    
    var currentIdea = this.props.ideas[currentIdeaIndex];
    this.setState({idea: currentIdea}) 

    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(currentIdeaIndex)  //legacy
    if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(currentIdea, currentIdeaIndex)
  }

  leftArrowClick = () => {
    var ideasCount = this.props.ideas.length;

    if(ideasCount <= 1){
      return 
    }

    let currentIdeaIndex = this.state.currentIdeaIndex

    currentIdeaIndex--;

    if(currentIdeaIndex == -1){
      currentIdeaIndex = this.props.ideas.length - 1;
    }
    
    this.setState({currentIdeaIndex: currentIdeaIndex })
    
    var currentIdea = this.props.ideas[currentIdeaIndex];
    this.setState({idea: currentIdea}) 
    
    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(currentIdeaIndex)  //legacy
    if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(currentIdea, currentIdeaIndex)  
  }

  

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps != this.props){
      if(nextProps != null && nextProps.idea !== undefined){
        if(nextProps.idea._id != this.props.idea._id){
          let index = findIdeaIndex(nextProps.idea, nextProps.ideas)
          this.setState({
            idea: nextProps.idea,
            currentIdeaIndex: index,
          })
        }
      }
      
      return true
    }

    if(nextState != this.state){
      return true
    }
  }

  render() {
    // this.state != null && 
    if(this.state.idea!== undefined && this.state.idea.content !== undefined){
      return (
        <React.Fragment>
          {/* <div id="ideaCardIdeaArrows">
            {this.props.showNextPreviousButtons? <IdeaNextButtonsPreviousButtons ideas={this.props.ideas} /> : null}
          </div> */}
          <div className="IdeaContent">
            <div id="ideaCardWithButtons">
              <div id="ideaCardWithShare" >
                <div id="ideaCard"> 
                  <div id="cardLeftArrowContainer" className={this.props.cardLeftArrowContainerClassName} onClick={this.leftArrowClick}>
                    <img id="ideaCardLeftArrow" src={require("images/leftArrow.png")}  />
                  </div>
                  <div id="cardRightArrowContainer" className={this.props.cardRightArrowContainerClassName} onClick={this.rightArrowClick} >
                    <img id="ideaCardRightArrow" src={require("images/rightArrow.png")} />
                  </div>
                  <div className="ideaTitle"> 
                    {this.state.idea.title}
                  </div>
                  <div id="ideaContentText"> 
                    <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>
                      {/* {ReactHtmlParser(convertedContent)} */}
                      <IdeaCardContent content={this.state.idea.content} createdIn={this.state.idea.createdIn} />
                    </Linkify>
                  </div>
                </div>
                <div id="shareAndLikeContainer">
                  {this.props.deleteable ? <DeleteIdeaButton loggedInUserID={this.props.userID} 
                                                  idea={this.state.idea} /> : ""}
                  {this.props.editable ? <EditIdeaButton /> : ""}
                  <LikeDislike idea={this.state.idea} enabled={this.props.enabled} />
                  <div id="shareButtonContainer">
                  <ShareButton />
                  </div>
                  
                </div>
              </div>
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
    maxNumOfPeople: state.searchPageReducer.currentIdea.maxNumOfPeople,
    userID: state.userPageReducer.loggedInUserID,
  };
}

export default connect(mapStateToProps)(IdeaCard);