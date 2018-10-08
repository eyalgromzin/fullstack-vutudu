import React, { Component } from 'react'
import './likeDislike.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import { LIKE_IDEA, DISLIKE_IDEA } from 'reducers/types'
import { likeIdea, dislikeIdea } from 'actions/ideaActions'

class LikeDislike extends Component {
  constructor(props){
    super(props);
  }

  handleDislikeClick = () => {
    this.props.dislikeIdea(this.props.userID, this.props.ideaID);  
  }

  handleLikeClick = () => {
    this.props.likeIdea(this.props.userID, this.props.ideaID); 
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/like.png")} id="likeButton" class="bottomButton hoverClickHand" 
          onClick={this.handleLikeClick}/>
        {this.props.likes.length}
        
        <img src={require("images/dislike.png")} id="dislikeButton" class="bottomButton hoverClickHand" 
          onClick={this.handleDislikeClick}/>
        {this.props.dislikes == null ? 0 : this.props.dislikes.length}
        
        <span> ({Math.round((this.props.likes/((this.props.likes + this.props.dislikes) == 0? 1 : (this.props.likes + this.props.dislikes)) * 100))}%)</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    likes: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].liked,
    dislikes: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].disliked,
    userID: state.userReducer.loggedInUserID,
    ideaID: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex]._id
  };
}

export default connect(mapStateToProps, {likeIdea, dislikeIdea})(LikeDislike);
