import React, { Component } from 'react'
import './likeDislike.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {updateIdeaIndicator} from 'actions/ideaActions'
import { 
  ADD_LIKED_IDEA_TO_USER, 
  ADD_USER_TO_CURRENT_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES,
  REMOVE_USER_FROM_IDEA_LIKES,
  REMOVE_USER_FROM_IDEA_DISLIKES,
  // ADD_USER_TO_LIKED_OF_CREATED_IDEA
 } from 'reducers/types'
import {showLogInScreen} from 'actions/commonActions'

class LikeDislike extends Component {
  constructor(props){
    super(props);

    this.state = {
      clickedLike: false,
      clickedDisike: false
    }
  }

  addLike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/userLiked/',ADD_LIKED_IDEA_TO_USER,    
      '/api/items/ideaLiked/',ADD_USER_TO_CURRENT_IDEA_LIKES
      );  

      this.setState({clickedLike: true});
  }

  removeLike = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeUserliked/', null,       
      '/api/items/removeIdeaLiked/',REMOVE_USER_FROM_IDEA_LIKES);  
    
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
    if(!this.props.loggedIn){
      console.log("showing login screen");
      showLogInScreen();
    }else{    
      if(this.props.enabled) {
        console.log("showing send like request");
        if(this.isClickedLike()){
          this.removeLike();
          this.addDislike();
        }else if (this.isClickedDislike()){
            this.removeDislike();
        }else{
            this.addDislike();
        }
      }
    }
  }

  handleLikeClick = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{   
      if(this.props.enabled) {
        if(this.isClickedDislike()){
          this.removeDislike();
          this.addLike();
        }else if(this.isClickedLike()){
          this.removeLike();
        }else{
          this.addLike();
        }
      }
    }
  }

  isClickedLike = () => {
    return this.props.idea.liked.includes(this.props.userID) || this.state.clickedLike;
  }

  isClickedDislike = () => {
    return this.props.idea.disliked.includes(this.props.userID) || this.state.clickedDisike;
  }

  render() {
    let clickedLike = this.isClickedLike();
    let clickedDislike = this.isClickedDislike();

    return (
      <div className="bottomIndicator">
        <img src={require("images/like.png")} id="likeButton" className={"bottomButton hoverClickHand"}
          onClick={this.handleLikeClick}/>
        {this.props.idea.liked === undefined ? 0 : this.props.idea.liked.length}
        <img src={clickedLike ? require("images/upArrowHighlighted.png") : require("images/upArrow.png")} onClick={this.handleLikeClick} className={"bottomButton hoverClickHand"} />
        
        {this.props.idea.disliked === undefined ? 0 : this.props.idea.disliked.length}
        <img src={clickedDislike ? require("images/downArrowHighlighted.png") : require("images/downArrow.png")} id="dislikeButton" className={"bottomButton hoverClickHand"}
          onClick={this.handleDislikeClick}/>
        
        <span> ({ this.props.idea.liked === undefined || this.props.idea.disliked === undefined ? 0 : Math.round((this.props.idea.liked.length/((this.props.idea.liked.length + this.props.idea.disliked.length) == 0? 1 : (this.props.idea.liked.length + this.props.idea.disliked.length)) * 100))}%)</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
    showLogin: state.commonReducer.showLogin,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(LikeDislike);  //, updateUserIdeaWithLike
