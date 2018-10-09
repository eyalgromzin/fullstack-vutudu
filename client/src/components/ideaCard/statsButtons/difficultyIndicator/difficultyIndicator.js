import React, { Component } from 'react'
import './difficultyIndicator.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import { ADD_DIFFICULTY,REDUCE_DIFFICULTY } from 'reducers/types'

class DiffictultyIndicator extends Component {
constructor(props){
  super(props)

  this.handleAddDifficultyClick = this.handleAddDifficultyClick.bind(this);
  this.handleReduceDifficultyClick = this.handleReduceDifficultyClick.bind(this);
}

  handleAddDifficultyClick(){
    updateIdeaData(this.props.userID,this.props.ideaID,'api/items/ideaAddedDifficuly/',)
  }

  handleReduceDifficultyClick(){
    this.props.dispatch({ type: REDUCE_DIFFICULTY });
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/difficulty.png")} id="difficultyImage" class="bottomButton"/>
        <img src={require("images/upArrow.png")} id="increaseDifficulty" class="bottomButton hoverClickHand" onClick={this.handleAddDifficultyClick}/>
        {this.props.hardCount.length}
        <img src={require("images/downArrow.png")} id="decreaseDifficulty" class="bottomButton hoverClickHand" onClick={this.handleReduceDifficultyClick}/>        
        {this.props.easyCount.length}
        <span> ({Math.round((this.props.hardCount.length/(this.props.easyCount.length + this.props.hardCount.length == 0 ? 1 : this.props.easyCount.length + this.props.hardCount.length)) * 100) }%)  </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hardCount: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].addedHard,
    easyCount: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].addedEasy,
    userID: state.userReducer.loggedInUserID,
    ideaID: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex]._id
  };
}

export default connect(mapStateToProps)(DiffictultyIndicator);