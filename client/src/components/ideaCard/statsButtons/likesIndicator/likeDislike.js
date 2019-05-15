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
import Popup from 'reactjs-popup'
import {showLogInScreen} from 'actions/commonActions'

class LikeDislike extends Component {
  constructor(props){
    super(props);
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
    if(this.props.enabled){
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
  }

  handleLikeClick = () => {
    if(this.props.enabled){
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
  }

  isClickedLike = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.liked === undefined)){
      return this.props.idea.liked.includes(this.props.userID);
    }

    return false;
  }

  isClickedDislike = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.disliked === undefined)){
      return this.props.idea.disliked.includes(this.props.userID);
    }

    return false;
  }

  render() {
    let clickedLike = this.isClickedLike();
    let clickedDislike = this.isClickedDislike();

    return (
      <div className="bottomIndicator">
        
        <Popup
          trigger={<img src={require("images/like.png")} id="likeButton" className={"bottomButton"} alt="" 
                    onClick={this.handleLikeClick}/>}
          position="top center"
          on="hover">
          <div id="infoButton">
            <div id="infoContent">
              <div>Vote for like or dislike</div>
            </div>
          </div>
        </Popup>
        {this.props.idea.liked === undefined ? 0 : this.props.idea.liked.length}
        <img src={clickedLike ? require("images/upArrowHighlighted.png") : require("images/upArrow.png")}  alt="" 
          onClick={this.handleLikeClick} className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} />
        
        {this.props.idea.disliked === undefined ? 0 : this.props.idea.disliked.length}
        <img src={clickedDislike ? require("images/downArrowHighlighted.png") : require("images/downArrow.png")}  alt="" 
          id="dislikeButton" className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} onClick={this.handleDislikeClick}/>
        
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
