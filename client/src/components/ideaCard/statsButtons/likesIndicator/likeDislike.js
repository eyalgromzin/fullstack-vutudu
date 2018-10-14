import React, { Component } from 'react'
import './likeDislike.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {updateIdeaIndicator} from 'actions/ideaActions'
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'
import { ADD_DISLIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_DISLIKES } from 'reducers/types'

class LikeDislike extends Component {
  constructor(props){
    super(props);

    this.enabled = props.enabled;
  }

  handleDislikeClick = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
      '/api/user/userLiked/',ADD_LIKED_IDEA_TO_USER,    
      '/api/items/ideaDisliked/',ADD_USER_TO_IDEA_DISLIKES);
  }

  handleLikeClick = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
      null,null,    //dont add difficult ideas to user
      '/api/items/idealiked/',ADD_USER_TO_IDEA_LIKES);
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/like.png")} id="likeButton" className={"bottomButton " + (this.enabled? "hoverClickHand" : "")}
          onClick={this.handleLikeClick}/>
        {this.props.liked.length}
        
        <img src={require("images/dislike.png")} id="dislikeButton" class="bottomButton " + (this.enabled? "hoverClickHand" : "")
          onClick={this.handleDislikeClick}/>
        {this.props.disliked.length}
        
        <span> ({Math.round((this.props.liked.length/((this.props.liked.length + this.props.disliked.length) == 0? 1 : (this.props.liked.length + this.props.disliked.length)) * 100))}%)</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    liked: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].liked,
    disliked: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].disliked,
    userID: state.userReducer.loggedInUserID,
    ideaID: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex]._id
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(LikeDislike);
