import React, { Component } from 'react'
import './likeDislike.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {updateIdeaIndicator} from 'actions/ideaActions'
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_CURRENT_IDEA_LIKES } from 'reducers/types'
import { ADD_USER_TO_IDEA_DISLIKES } from 'reducers/types'
import {showLogInScreen} from 'actions/commonActions'
// import {updateUserIdeaWithLike} from 'actions/userActions'

class LikeDislike extends Component {
  componentDidUpdate(prevProps) {
    console.log("like updated")
  }

  handleDislikeClick = () => {
    if(!this.props.loggedIn){
      console.log("showing login screen");
      showLogInScreen();
    }else{    
      if(this.props.enabled) {
        console.log("showing send like request");
        this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
          //dont add disliked idea to user. not interesting., but add it to the user created idea for stats
          '/api/user/userDisliked/', null,     
          '/api/items/ideaDisliked/',ADD_USER_TO_IDEA_DISLIKES);
      }
    }
  }

  handleLikeClick = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{   
      if(this.props.enabled) {
        this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
          '/api/user/userLiked/',ADD_LIKED_IDEA_TO_USER,    //dont add difficult ideas to user
          '/api/items/ideaLiked/',ADD_USER_TO_CURRENT_IDEA_LIKES);

          // this.props.updateUserIdeaWithLike(this.props.userID,this.props.idea);
      }

        //also send a request to the user to add the user as a like person to the idea thats in the user
    }
  }

  render() {
    return (
      <div className="bottomIndicator">
        <img src={require("images/like.png")} id="likeButton" className={"bottomButton hoverClickHand"}
          onClick={this.handleLikeClick}/>
        {this.props.idea.liked === undefined ? 0 : this.props.idea.liked.length}
        <img src={require("images/upArrow.png")} onClick={this.handleLikeClick} className={"bottomButton hoverClickHand"} />
        
        {this.props.idea.disliked === undefined ? 0 : this.props.idea.disliked.length}
        <img src={require("images/downArrow.png")} id="dislikeButton" className={"bottomButton hoverClickHand"}
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
