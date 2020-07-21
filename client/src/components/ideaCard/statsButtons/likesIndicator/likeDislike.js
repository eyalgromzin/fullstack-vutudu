import React, { Component } from 'react'
import './likeDislike.css'
import 'commonCss.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {updateIdeaIndicator} from 'actions/ideaActions'
import {removeUserLikedIdea} from 'actions/userActions'
import {addLikedIdeaToUser} from 'actions/userActions'
import {addUserIDToIdeaLikes} from 'actions/ideaActions'
import { bindActionCreators } from 'redux';
import Popover from 'react-tiny-popover'
import 'cssAnimations.css'
import { 
  ADD_LIKED_IDEA_TO_USER, 
  ADD_USER_ID_TO_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES,
  REMOVE_USER_FROM_IDEA_LIKES,
  SET_CURRENT_IDEA,
  REMOVE_USER_FROM_IDEA_DISLIKES,
  // ADD_USER_TO_LIKED_OF_CREATED_IDEA
 } from 'reducers/types'
 import Modal from 'react-modal';
import {showLogInScreen} from 'actions/commonActions'
import { SET_TOP_HARD_IDEAS } from '../../../../reducers/types';

class LikeDislike extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPopoverOpen: false,      
      updateHeart: false,
    };
  }

  toggleUpdateHeart = () => {
    this.setState({
      updateHeart: !this.state.updateHeart,
    })
  }

  addLike = () => {
    //add current User  id to the idea likes
    //then add the idea to user liked ideas
    this.props.currentIdea.liked.push(this.props.userID)
    
    this.props.addLikedIdeaToUser(this.props.userID, this.props.currentIdea)
    
    // '/api/items/ideaLiked/',ADD_USER_TO_CURRENT_IDEA_LIKES
    this.props.addUserIDToIdeaLikes(this.props.userID, this.props.currentIdea._id, () => {
        //update current idea
        this.props.currentIdea.liked.push(this.props.userID)
        this.props.dispatch({type: SET_CURRENT_IDEA, payload: this.props.currentIdea})        
        
      }
    )

    this.toggleUpdateHeart();
  }

  addDislike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.currentIdea,
      null, null,       
      '/api/items/ideaDisliked/',ADD_USER_TO_IDEA_DISLIKES,
      () => this.props.currentIdea.disliked.push(this.props.userID));

      this.toggleUpdateHeart();
  }

  removeDislike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.currentIdea,
      null, null,       
      '/api/items/removeIdeaDisliked/',REMOVE_USER_FROM_IDEA_DISLIKES);

      this.toggleUpdateHeart();
  }

  removeLike = () => {
    this.props.updateIdeaIndicator(this.props.userID, this.props.currentIdea,
      null, null,       
      '/api/items/removeIdeaLiked/',REMOVE_USER_FROM_IDEA_LIKES,
      ); 
    
    this.props.removeUserLikedIdea(this.props.userID, this.props.currentIdea)    

    this.toggleUpdateHeart();
  }

  handleDislikeClick = () => {
    this.togglePopover();
    this.addDislike();
  }

  handleLikeClick = () => {
    this.togglePopover();
    this.addLike();
  }
  
  isLiked = () => {
    if(!(this.props.currentIdea === undefined || this.props.currentIdea == null || this.props.currentIdea.liked === undefined)){
      return this.props.currentIdea.liked.includes(this.props.userID);
    }

    return false;
  }

  handleHeartClick = () => {
    if(this.props.loggedIn){
      if(this.isLiked()){
        this.removeLike()
      } else if(this.isDisliked()){
        this.removeDislike()
      }else{
        this.togglePopover()
      }
    }else{
      showLogInScreen();
    }
  }

  isDisliked = () => {
    if(!(this.props.currentIdea === undefined || this.props.currentIdea == null || this.props.currentIdea.disliked === undefined)){
      return this.props.currentIdea.disliked.includes(this.props.userID);
    }

    return false;
  }

  togglePopover = () => {
    var newState = !this.state.isPopoverOpen
    this.setState({ isPopoverOpen: newState });
    var s = this.state.isPopoverOpen;
  }

  hidePopup = () => {
    this.setState({isPopoverOpen: false})
  }

  render() {
    let percensubjecteText = "(0%)"
    if(this.props.currentIdea.liked === undefined || this.props.currentIdea.disliked === undefined){
      percensubjecteText = "(0%)"
    }else if(this.props.currentIdea.liked.length + this.props.currentIdea.disliked.length == 0){
      percensubjecteText = "(0%)"
    }else{
      let percensubjecte = Math.round((this.props.currentIdea.liked.length / (this.props.currentIdea.liked.length + this.props.currentIdea.disliked.length)) * 100)
      percensubjecteText = "(" + percensubjecte + "%)"
    }

    var heartImagePath = ""
    if(this.isDisliked()){
      heartImagePath = require("images/dislike.png")
    }else if(this.isLiked()){
      heartImagePath = require("images/likeFull.png")
    }else{
      heartImagePath = require("images/emptyLike.png")
    }

    return (
      <React.Fragment>
        <div id="likeContainer" className="inlineBlock">
          <Popover
            isOpen={this.state.isPopoverOpen}
            position={'top'} // preferred position
            content={(
              <div id="likeDislikeContainer" onMouseLeave={this.hidePopup}>
                <img onClick={this.handleLikeClick} src={require("images/likeFull.png")} className="inlineBlock smallIconSize marginRight10px tilt" />
                <img onClick={this.handleDislikeClick} src={require("images/dislike.png")} className="inlineBlock smallIconSize tilt" />
              </div>
            )}
          >
            <div><img src={heartImagePath} onClick={this.handleHeartClick} className="bottomButton tilt" /></div>
          </ Popover>
          
          {percensubjecteText}
        </div>    
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateIdeaIndicator: bindActionCreators (updateIdeaIndicator, dispatch),
    removeUserLikedIdea: bindActionCreators (removeUserLikedIdea, dispatch),    
    addUserIDToIdeaLikes: bindActionCreators (addUserIDToIdeaLikes, dispatch),    
    addLikedIdeaToUser: bindActionCreators (addLikedIdeaToUser, dispatch),    
    dispatch,
  }
}
// removeLikeFromSearchIdea: bindActionCreators (removeLikeFromSearchIdea, dispatch),    

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
    showLogin: state.commonReducer.showLogin,
    loggedIn: state.commonReducer.loggedIn,
    currentIdea: state.ideaCardReducer.currentIdea
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDislike);  //, updateUserIdeaWithLike
