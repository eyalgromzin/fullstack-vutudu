import React, { Component } from 'react'
import Linkify from 'react-linkify';
import './ideaCard.css'
import IdeaNextButtonsPreviousButtons from './cardButtons/nextPreviousButtons/nextPreviousButtons'
import { connect } from 'react-redux';
import {
  SET_CURRENT_IDEA,
  REMOVE_IDEA_FROM_TOP_TABLE
} from 'reducers/types'
import 'commonCss.css'
import ShareButton from 'components/ideaCard/cardButtons/shareButton'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import IdeaCardContent from 'components/ideaCard/ideaCardContent'
import EditIdeaButton from 'components/ideaCard/editIdeaButton' 
import DeleteIdeaButton from './deleteIdeaButton';
import ReactTooltip from "react-tooltip";
import dcopy from 'deep-copy';
import { indexOf } from 'lodash';

class IdeaCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      ideaIndex: -1,            
      isPopoverOpen: false,
    }
  }

  rightArrowClick = () => {
    if(this.props.ideas === undefined){
      return
    }
    
    let ideaIndex = this.state.ideaIndex;
    if(ideaIndex === -1){
      if(this.props.ideas !== undefined && this.props.idea !== undefined){
        ideaIndex = this.props.ideas.findIndex(ideaI => this.props.idea._id == ideaI._id)
      }
    }

    var ideasCount = this.props.ideas.length;

    if(ideasCount <= 1){
      return 
    }
    
    ideaIndex += 1
    
    if(ideaIndex == ideasCount){
      ideaIndex = 0
    }

    this.setState({ideaIndex: ideaIndex})

    var idea = this.props.ideas[ideaIndex];
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea });

    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(ideaIndex)  //legacy
    // if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(idea, ideaIndex)
  }

  leftArrowClick = () => {
    if(this.props.ideas === undefined){
      return
    }
    
    var ideasCount = this.props.ideas.length;

    let ideaIndex = this.state.ideaIndex;
    if(ideaIndex === -1){
      if(this.props.ideas !== undefined && this.props.idea !== undefined){
        ideaIndex = this.props.ideas.findIndex(ideaI => this.props.idea._id == ideaI._id)
      }
    }

    if(ideasCount <= 1){
      return 
    }
    
    ideaIndex -= 1
    
    if(ideaIndex == -1){
      ideaIndex = ideasCount - 1
    }

    this.setState({ideaIndex: ideaIndex})

    var idea = this.props.ideas[ideaIndex];
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea });

    if(this.props.onSelectedIndexChange !== undefined) this.props.onSelectedIndexChange(ideaIndex)  //legacy
    // if(this.props.onSelectedIdeaChange !== undefined) this.props.onSelectedIdeaChange(idea, ideaIndex)
  }

  setIdeaIndex = (index) => {
    this.setState({ideaIndex: index})
  }

  

  togglePopover = () => {
    var newState = !this.state.isPopoverOpen
    this.setState({ isPopoverOpen: newState });
    var s = this.state.isPopoverOpen;
  }

  shouldComponentUpdate(nextProps, nextState){
    let isToUpdate = false

    if(nextProps != this.props){
      isToUpdate = true
    }

    if(nextProps.idea != null && this.props.idea === undefined){
      isToUpdate = true

      let index = nextProps.ideas.findIndex(ideaI => nextProps.idea._id == ideaI._id)          
      this.setState({
        ideaIndex: index,
      })
    }

    if(nextProps.idea != null && nextProps.idea._id != this.props.idea._id){
      isToUpdate = true

      let index = nextProps.ideas.findIndex(ideaI => nextProps.idea._id == ideaI._id)          
      this.setState({
        ideaIndex: index,
      })
    }

    if(nextState != this.state){
      isToUpdate = true
    }

    if (isToUpdate == true){
      if(this.props.idea !== undefined && this.props.idea._id !== undefined && 
        this.props.ideas !== undefined && this.state.ideaIndex == -1 ){
        let index = this.props.ideas.findIndex(ideaI => this.props.idea._id == ideaI._id)          
        this.setState({
          ideaIndex: index,
        })
      }
    }

    return isToUpdate
  }

  onIdeaDeleted = () => {
    this.props.dispatch({type: REMOVE_IDEA_FROM_TOP_TABLE, payload: this.props.idea._id});

    if(this.state.ideaIndex >= this.props.ideas.length - 1){
      let nextIdeaIndex = 0
      this.setState({ideaIndex: 0})
      this.props.onSelectedIndexChange(0) 
      this.props.dispatch({ type: SET_CURRENT_IDEA, payload: this.props.ideas[0] });           
    }else{
      let currentIdeaIndex = this.state.ideaIndex
      var ideas = dcopy(this.props.ideas)      
      ideas.splice(currentIdeaIndex, 1);   //removes the unneeded idea
      this.props.dispatch({ type: SET_CURRENT_IDEA, payload: ideas[currentIdeaIndex] });
      this.props.onSelectedIndexChange(currentIdeaIndex)
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
                  {this.props.editable || this.props.email == "eyalgromzin@gmail.com" || this.props.email == "ilyagromzy@hotmail.com" ? 
                    <DeleteIdeaButton loggedInUserID={this.props.userID}  idea={this.props.idea} onIdeaDeleted={this.onIdeaDeleted} /> 
                    : 
                    ""}
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
    email: state.userPageReducer.email,
  };
}

export default connect(mapStateToProps, null, null, {forwardRef: true})(IdeaCard);