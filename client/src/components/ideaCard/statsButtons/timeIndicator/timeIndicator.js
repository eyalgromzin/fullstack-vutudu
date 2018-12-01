import React, { Component } from 'react'
import './timeIndicator.css'
import { connect } from 'react-redux';
import {ADD_TIME, REDUCE_TIME} from 'reducers/types'
import {ADD_USER_TO_IDEA_ADDED_LONG, ADD_USER_TO_IDEA_ADDED_SHORT} from 'reducers/types'
import {updateIdeaIndicator} from 'actions/ideaActions'
import {showLogInScreen} from 'actions/commonActions'

class TimeIndicator extends Component {
constructor(props){
  super(props)

  this.handleAddAddTimeClick = this.handleAddAddTimeClick.bind(this);
  this.handleReduceTimeClick = this.handleReduceTimeClick.bind(this);
}

  handleAddAddTimeClick(){
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{    
      this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
        null,null,    //dont add difficult ideas to user
        'api/items/addedLongToIdea/',ADD_USER_TO_IDEA_ADDED_LONG);
    }
  }

  handleReduceTimeClick(){
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{  
      this.props.updateIdeaIndicator(this.props.userID,this.props.ideaID,
        null,null,    //dont add difficult ideas to user
        'api/items/addedShortToIdea/',ADD_USER_TO_IDEA_ADDED_SHORT);
    }
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
    addedShort: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].addedShort,
    addedLong: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].addedLong,
    initialMinTime: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].minTime,
    initialMaxTime: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].maxTime,
    userID: state.userPageReducer.loggedInUserID,
    ideaID: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex]._id
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(TimeIndicator);
