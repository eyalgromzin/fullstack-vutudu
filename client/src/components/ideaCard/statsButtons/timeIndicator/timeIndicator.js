import React, { Component } from 'react'
import './timeIndicator.css'
import { connect } from 'react-redux';
import {ADD_TIME, REDUCE_TIME} from 'reducers/types'


class TimeIndicator extends Component {
constructor(props){
  super(props)

  this.handleAddAddTimeClick = this.handleAddAddTimeClick.bind(this);
  this.handleReduceTimeClick = this.handleReduceTimeClick.bind(this);
}

  handleAddAddTimeClick(){
    this.props.dispatch({ type: ADD_TIME });
  }

  handleReduceTimeClick(){
    this.props.dispatch({ type: REDUCE_TIME });
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/time.png")} id="timeImage" class="bottomButton" alt="time image"/>
        <img src={require("images/downArrow.png")} id="decreaseTime" class="bottomButton hoverClickHand" onClick={this.handleReduceTimeClick} alt="decrease time"/>
        <span>{this.props.minTime} - {this.props.maxTime}</span>
        <img src={require("images/upArrow.png")} id="incrementTime" class="bottomButton hoverClickHand" onClick={this.handleAddAddTimeClick} alt="increase time"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    minTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minTime,
    maxTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxTime,
  };
}

export default connect(mapStateToProps)(TimeIndicator);
