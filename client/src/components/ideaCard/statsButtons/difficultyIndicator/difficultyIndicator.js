import React, { Component } from 'react'
import './difficultyIndicator.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {ADD_USER_TO_IDEA_ADDED_EASY, ADD_USER_TO_IDEA_ADDED_HARD, } from 'reducers/types'
import {updateIdeaIndicator} from 'actions/ideaActions'
import {showLogInScreen} from 'actions/commonActions'

class DiffictultyIndicator extends Component {
constructor(props){
  super(props)

  this.handleAddDifficultyClick = this.handleAddDifficultyClick.bind(this);
  this.handleReduceDifficultyClick = this.handleReduceDifficultyClick.bind(this);
}

  handleAddDifficultyClick(){
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{  
      this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
                      null,null,    //dont add difficult ideas to user
                      'api/items/addedHardToIdea/',ADD_USER_TO_IDEA_ADDED_HARD);
    }
  }

  handleReduceDifficultyClick(){
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{  
      this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
                      null,null,    //dont add easy ideas to user
                      'api/items/addedEasyToIdea/',ADD_USER_TO_IDEA_ADDED_EASY);
    }
  }

  render() {
    return (
      <div className="bottomIndicator">
        <img src={require("images/difficulty.png")} id="difficultyImage" className="bottomButton"/>
        <img src={require("images/upArrow.png")} id="increaseDifficulty" className="bottomButton hoverClickHand" 
          onClick={this.handleAddDifficultyClick}/>

        {this.props.idea.addedHard.length}

        <img src={require("images/downArrow.png")} id="decreaseDifficulty" className="bottomButton hoverClickHand" 
          onClick={this.handleReduceDifficultyClick}/>        

        {this.props.idea.addedEasy.length}

        <span> ({Math.round((this.props.idea.addedHard.length/(this.props.idea.addedEasy.length + this.props.idea.addedHard.length == 0 ? 1 : this.props.idea.addedEasy.length + this.props.idea.addedHard.length)) * 100) }%)  </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator} )(DiffictultyIndicator);