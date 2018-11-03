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
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      null,null,    
      '/api/items/ideaDisliked/',ADD_USER_TO_IDEA_DISLIKES);
  }

  handleLikeClick = () => {
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/userLiked/',ADD_LIKED_IDEA_TO_USER,    //dont add difficult ideas to user
      '/api/items/ideaLiked/',ADD_USER_TO_IDEA_LIKES);
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/like.png")} id="likeButton" className={"bottomButton hoverClickHand"}
          onClick={this.handleLikeClick}/>
        {this.props.liked.length}
        <img src={require("images/upArrow.png")} onClick={this.handleLikeClick} className={"bottomButton hoverClickHand"} />
        
        {this.props.disliked.length}
        <img src={require("images/downArrow.png")} id="dislikeButton" className={"bottomButton hoverClickHand"}
          onClick={this.handleDislikeClick}/>
        
        
        <span> ({Math.round((this.props.liked.length/((this.props.liked.length + this.props.disliked.length) == 0? 1 : (this.props.liked.length + this.props.disliked.length)) * 100))}%)</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    liked: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].liked,
    disliked: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].disliked,
    userID: state.userPageReducer.loggedInUserID,
    ideaID: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex]._id,
    idea: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex],
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(LikeDislike);
