import React, { Component } from 'react'
// import './timeIndicator.css'
import { connect } from 'react-redux';
import {
  ADD_USER_TO_IDEA_ADDED_LONG, 
  ADD_USER_TO_IDEA_ADDED_SHORT,
  REMOVE_USER_FROM_IDEA_ADDED_SHORT,
  REMOVE_USER_FROM_IDEA_ADDED_LONG,
} from 'reducers/types'
import {updateIdeaIndicator} from 'actions/ideaActions'
import {showLogInScreen} from 'actions/commonActions'
import Popup from 'reactjs-popup'

class TimeIndicator extends Component {
  constructor(props){
    super(props)
  }

  addTimePlus = () => {
    this.setState({addedTimePlus: true});

    this.props.updateIdeaIndicator(this.props.userID, this.props.idea,
      '/api/user/addTimePlusToIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/addLongToIdea/',ADD_USER_TO_IDEA_ADDED_LONG);
  }

  removeTimePlus = () => {
    this.setState({addedTimePlus: false});

    this.props.updateIdeaIndicator(this.props.userID, this.props.idea,
      '/api/user/removeTimePlusFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeLongFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_LONG);
  }

  addTimeMinus = () => {
    this.setState({addedTimeMinus: true});

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/addTimeMinusToIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/addShortToIdea/',ADD_USER_TO_IDEA_ADDED_SHORT);
  }

  removeTimeMinus = () => {
    this.setState({addedTimeMinus: false});

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeTimeMinusFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeShortFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_SHORT);
  }

  handleAddAddTimeClick = () => {
    if(this.props.enabled){
      if(!this.props.loggedIn){
        showLogInScreen();
      }else{    
        if(this.props.enabled) {
          if(this.isClickedTimeMinus()){
            this.removeTimeMinus();
            this.addTimePlus();
          }else if(this.isClickedTimePlus()){
            this.removeTimePlus();
          }else{
            this.addTimePlus();
          }
        }
      }
    } 
  }

  //this doesnt work
  addTimeMinusClick = () => {
    if(this.props.enabled){
      if(!this.props.loggedIn){
        showLogInScreen();
      }else{  
        if(this.props.enabled) {
          if(this.isClickedTimePlus()){
            this.removeTimePlus();
            this.addTimeMinus();
          }else if (this.isClickedTimeMinus()){
              this.removeTimeMinus();
          }else{
              this.addTimeMinus();
          }
        }
      }
    }
  }

  isClickedTimePlus = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.addedLong === undefined)){
      return this.props.idea.addedLong.includes(this.props.userID);
    }

    return false;
  }

  isClickedTimeMinus = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.addedShort === undefined)){
      return this.props.idea.addedShort.includes(this.props.userID);
    }
    return false;
  }

  render() {
    let addedTimePlus = this.isClickedTimePlus();
    let addedTimeMinus = this.isClickedTimeMinus();

    return (
      <div className="bottomIndicator">
        
        <Popup
          trigger={<img src={require("images/time.png")} id="timeImage" className="bottomButton" alt="time image" />}
          position="top center"
          on="hover">
          <div id="infoButton">
            <div id="infoContent">
              <div>Took longer? or less time than stated?</div>
            </div>
          </div>
        </Popup>
        <img src={addedTimeMinus? require("images/downArrowHighlighted.png") : require("images/downArrow.png")} 
          id="decreaseTime" className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} 
          onClick={this.addTimeMinusClick} alt="decrease time"/>
        <span>{this.props.idea  === undefined || this.props.idea.addedShort  === undefined ? 
          0 : this.props.idea.time - this.props.idea.addedShort.length} - 
          {this.props.idea  === undefined || this.props.idea.addedLong  === undefined? 
          0 : this.props.idea.time + this.props.idea.addedLong.length}</span>
        <img src={addedTimePlus ? require("images/upArrowHighlighted.png") : require("images/upArrow.png")} 
          id="incrementTime" className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} 
          onClick={this.handleAddAddTimeClick} alt="Time it took"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // addedShort: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].addedShort,
    // addedLong: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].addedLong,
    // initialTime: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].time,
    // ideaID: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex]._id,
    userID: state.userPageReducer.loggedInUserID,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator})(TimeIndicator);
