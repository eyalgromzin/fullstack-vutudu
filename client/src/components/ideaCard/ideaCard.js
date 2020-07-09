import React, { Component } from 'react'
import Linkify from 'react-linkify';
import './ideaCard.css'
import IdeaNextButtonsPreviousButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import { connect } from 'react-redux';
import {
  SET_CURRENT_IDEA
} from 'reducers/types'
import 'commonCss.css'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import IdeaCardContent from 'components/ideaCard/ideaCardContent'
import EditIdeaButton from 'components/ideaCard/editIdeaButton' 
import DeleteIdeaButton from './deleteIdeaButton';
import ReactTooltip from "react-tooltip";

class IdeaCard extends Component {
  constructor(props){
    super(props)

    let ideaIndex = 0

    this.state = {
      ideaIndex: ideaIndex,            
      isPopoverOpen: false,
    }
  }

  rightArrowClick = () => {
    if(this.props.ideas === undefined){
      return
    }
    
    var ideasCount = this.props.ideas.length;
    let ideaIndex = 0;

    if(this.props.ideas !== undefined && this.props.idea !== undefined){
      ideaIndex = this.props.ideas.findIndex(ideaI => this.props.idea._id == ideaI._id)
    }

    if(ideasCount <= 1){
      return 
    }
    
    ideaIndex += 1
    
    if(ideaIndex == ideasCount){
      ideaIndex = 0
    }

    var idea = this.props.ideas[ideaIndex];
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea });

    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(ideaIndex)  //legacy
    if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(idea, ideaIndex)
  }

  leftArrowClick = () => {
    if(this.props.ideas === undefined){
      return
    }
    
    var ideasCount = this.props.ideas.length;
    let ideaIndex = 0;

    if(this.props.ideas !== undefined && this.props.idea !== undefined){
      ideaIndex = this.props.ideas.findIndex(ideaI => this.props.idea._id == ideaI._id)
    }

    if(ideasCount <= 1){
      return 
    }
    
    ideaIndex -= 1
    
    if(ideaIndex == -1){
      ideaIndex = ideasCount - 1
    }

    var idea = this.props.ideas[ideaIndex];
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea });

    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(ideaIndex)  //legacy
    if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(idea, ideaIndex)
  }

  togglePopover = () => {
    var newState = !this.state.isPopoverOpen
    this.setState({ isPopoverOpen: newState });
    var s = this.state.isPopoverOpen;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps != this.props){
      if(nextProps != null && nextProps.idea !== undefined){
        if(nextProps.idea._id != this.props.idea._id && nextProps.ideas !== undefined){
          let index = nextProps.ideas.findIndex(ideaI => nextProps.idea.id == ideaI.id)          
          this.setState({
            idea: nextProps.idea,
            ideaIndex: index,
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
    if(this.props.idea!== undefined && this.props.idea.content !== undefined){
      return (
        <React.Fragment>          
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
                    {this.props.idea.title}
                  </div>
                  <div id="ideaContentText"> 
                    <Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}>                      
                      <IdeaCardContent content={this.props.idea.content} createdIn={this.props.idea.createdIn} />
                    </Linkify>
                  </div>
                </div>
                <div id="shareAndLikeContainer">
                  {this.props.deleteable ? <DeleteIdeaButton loggedInUserID={this.props.userID} 
                                                  idea={this.props.idea} /> : ""}
                  {this.props.editable && this.props.idea.createdIn == "web" ? <EditIdeaButton /> : ""}
                  {this.props.editable && this.props.idea.createdIn != "web" ? 
                    <React.Fragment>
                      <img data-tip="Created in mobile,<br /> Editable Only in mobile" 
                        src={require("images/writeBlackWithoutBorderGrey.png")} alt="" className="userPageIdeaButton tilt"  /> 
                      <ReactTooltip multiline={true} />
                    </React.Fragment>
                    : 
                    ""
                  }
                  <LikeDislike enabled={this.props.enabled} />
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
    idea: state.ideaCardReducer.currentIdea,
    userID: state.userPageReducer.loggedInUserID,
  };
}

export default connect(mapStateToProps)(IdeaCard);