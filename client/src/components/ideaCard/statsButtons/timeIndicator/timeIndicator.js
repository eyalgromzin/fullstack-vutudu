import React, { Component } from 'react'
import './timeIndicator.css'
import { connect } from 'react-redux';
import {ADD_TIME, REDUCE_TIME} from 'reducers/types'
import {ADD_USER_TO_IDEA_ADDED_LONG, ADD_USER_TO_IDEA_ADDED_SHORT} from 'reducers/types'
import {updateIdeaIndicator} from 'actions/ideaActions'

class TimeIndicator extends Component {
constructor(props){
  super(props)

  this.handleAddAddTimeClick = this.handleAddAddTimeClick.bind(this);
  this.handleReduceTimeClick = this.handleReduceTimeClick.bind(this);
}

  handleAddAddTimeClick(){
    this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
      null,null,    //dont add difficult ideas to user
      'api/items/addedLongToIdea/',ADD_USER_TO_IDEA_ADDED_LONG);
  }

  handleReduceTimeClick(){
    this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
      null,null,    //dont add difficult ideas to user
      'api/items/addedShortToIdea/',ADD_USER_TO_IDEA_ADDED_SHORT);
  }

  render() {
    return (
      <div class="bottomIndicator">
        <img src={require("images/time.png")} id="timeImage" class="bottomButton" alt="time image"/>
        <img src={require("images/downArrow.png")} id="decreaseTime" class="bottomButton hoverClickHand" onClick={this.handleReduceTimeClick} alt="decrease time"/>
        <span>{this.props.initialMinTime - this.props.addedShort.length} - {this.props.initialMaxTime + this.props.addedLong.length}</span>
        <img src={require("images/upArrow.png")} id="incrementTime" class="bottomButton hoverClickHand" onClick={this.handleAddAddTimeClick} alt="increase time"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    addedShort: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].addedShort,
    addedLong: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].addedLong,
    initialMinTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minTime,
    initialMaxTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxTime,
    userID: state.userReducer.loggedInUserID,
    ideaID: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex]._id
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(TimeIndicator);
