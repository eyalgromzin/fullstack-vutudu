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
    this.props.dispatch({ type: ADD_DIFFICULTY });
  }

  handleReduceDifficultyClick(){
    this.props.dispatch({ type: REDUCE_DIFFICULTY });
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/difficulty.png")} id="difficultyImage" class="bottomButton"/>
        <img src={require("images/upArrow.png")} id="increaseDifficulty" class="bottomButton hoverClickHand" onClick={this.handleAddDifficultyClick}/>
        {this.props.hardCount}
        <img src={require("images/downArrow.png")} id="decreaseDifficulty" class="bottomButton hoverClickHand" onClick={this.handleReduceDifficultyClick}/>        
        {this.props.easyCount}
        <span> ({Math.round((this.props.hardCount/(this.props.easyCount + this.props.hardCount == 0 ? 1 : this.props.easyCount + this.props.hardCount)) * 100) }%)  </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hardCount: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].hardCount,
    easyCount: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].easyCount,
  };
}

export default connect(mapStateToProps)(DiffictultyIndicator);