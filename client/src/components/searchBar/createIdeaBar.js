import React, { Component } from 'react'

import PlaceSelector from './placeSelector/placeSelector'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import { EDITED_IDEA_SET_PLACE } from 'reducers/types'
import { EDITED_IDEA_SET_TIME } from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'

class CreateIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (e) => {
    this.props.dispatch({type: EDITED_IDEA_SET_PLACE, payload: e.target.value});
  }

  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: EDITED_IDEA_SET_TIME, payload: Number(e.target.value)});
    
  }

  render() {
    return (
      <div id="createBar">
        <div id="createBarButtons">
          {this.props.showTitle == true || this.props.showTitle === undefined? <span className="topBarName" > CREATE: </span> : "" }
          <PlaceSelector tagID="createBarPlaceSelector" cssClass="createBarTextBox" onChangeEvent={this.placeOnChangeEvent} 
            place={this.props.place} />
          <TimePicker onChangeEvent={this.timeOnChangeEvent} cssClass="createBarDropDown" time={this.props.time} />
          <NumOfPeopleCreator cssClass="createBarDropDown" 
            minNumOfPeople={this.props.minNumOfPeople} maxNumOfPeople={this.props.maxNumOfPeople} />        
        </div>
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return {
    time: state.editedIdeaReducer.time,
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);
