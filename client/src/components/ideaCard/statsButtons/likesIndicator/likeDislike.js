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
import { 
  ADD_LIKED_IDEA_TO_USER, 
  ADD_USER_ID_TO_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES,
  REMOVE_USER_FROM_IDEA_LIKES,
  REMOVE_USER_FROM_IDEA_DISLIKES,
  SET_USER_LIKED_IDEAS,
  // ADD_USER_TO_LIKED_OF_CREATED_IDEA
 } from 'reducers/types'
 import Modal from 'react-modal';
import {showLogInScreen} from 'actions/commonActions'

class LikeDislike extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  addLike = () => {
    //add current User  id to the idea likes
    //then add the idea to user liked ideas
    this.props.idea.liked.push(this.props.userID)
    
    this.props.addLikedIdeaToUser(this.props.userID, this.props.idea)
    
    // '/api/items/ideaLiked/',ADD_USER_TO_CURRENT_IDEA_LIKES
    this.props.addUserIDToIdeaLikes(this.props.userID, this.props.idea._id)

    //pop the user id from the liked idea. to remove the duplicate
    this.props.idea.liked.pop(this.props.userID)
      this.setState({clickedLike: true});
  }

  removeLike = () => {
    this.props.updateIdeaIndicator(this.props.userID, this.props.idea,
      null, null,       
      '/api/items/removeIdeaLiked/',REMOVE_USER_FROM_IDEA_LIKES);  
    
    this.props.removeUserLikedIdea(this.props.userID, this.props.idea)

    this.setState({clickedLike: false});
  }

  addDislike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/userDisliked/', null,       
      '/api/items/ideaDisliked/',ADD_USER_TO_IDEA_DISLIKES);

      this.setState({clickedDislike: true});
  }

  removeDislike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeUserDisliked/', null,       
      '/api/items/removeIdeaDisliked/',REMOVE_USER_FROM_IDEA_DISLIKES);  

      this.setState({clickedDislike: false});
  }

  handleDislikeClick = () => {
    this.togglePopover();
    this.addDislike();
  }

  handleLikeClick = () => {
    this.togglePopover();
    this.addLike();
  }
  // if(this.props.enabled) {
  //   if(this.isClickedDislike()){
  //     this.removeDislike();
  //     this.addLike();
  //   }else if(this.isLiked()){
  //     this.removeLike();
  //   }else{
  //     this.addLike();
  //   }
  // }

  isLiked = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.liked === undefined)){
      return this.props.idea.liked.includes(this.props.userID);
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
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.disliked === undefined)){
      return this.props.idea.disliked.includes(this.props.userID);
    }

    return false;
  }

  togglePopover = () => {
    // if(this.isLiked()){
    //   this.removeLike()
    // } else if(this.isDisliked){
    //   this.removeDislike()
    // }else{
    //   var newState = !this.state.isPopoverOpen
    //   this.setState({ isPopoverOpen: newState });
    //   var s = this.state.isPopoverOpen;
    // }

    var newState = !this.state.isPopoverOpen
    this.setState({ isPopoverOpen: newState });
    var s = this.state.isPopoverOpen;
  }


  render() {
    let percentageText = "(0%)"
    if(this.props.idea.liked === undefined || this.props.idea.disliked === undefined){
      percentageText = "(0%)"
    }else if(this.props.idea.liked.length + this.props.idea.disliked.length == 0){
      percentageText = "(0%)"
    }else{
      let percentage = Math.round((this.props.idea.liked.length / (this.props.idea.liked.length + this.props.idea.disliked.length)) * 100)
      percentageText = "(" + percentage + "%)"
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
        <div id="likeContainer" class="inlineBlock">
          <Popover
            isOpen={this.state.isPopoverOpen}
            position={'top'} // preferred position
            content={(
              <div id="likeDislikeContainer" onMouseLeave={this.togglePopover}>
                <img onClick={this.handleLikeClick} src={require("images/likeFull.png")} className="inlineBlock smallIconSize marginRight10px" />
                <img onClick={this.handleDislikeClick} src={require("images/dislike.png")} className="inlineBlock smallIconSize" />
              </div>
            )}
          >
            <div><img src={heartImagePath} onClick={this.handleHeartClick} className={"bottomButton"} /></div>
          </ Popover>
          
          {percentageText}
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

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
    showLogin: state.commonReducer.showLogin,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDislike);  //, updateUserIdeaWithLike
