import React, { Component } from 'react'
import PlaceSelector from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import { EDITABLE_IDEA_SET_PLACE } from 'reducers/types'
import { EDITABLE_IDEA_SET_TIME } from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'

class EditIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (e) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACE, payload: e.target.value});
  }

  timeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_TIME, payload: value});
    
  }

  render() {
    return (
      <div id="createBar">
        <div id="editBarButtons">
          <PlaceSelector tagID="ideaBarPlaceSelector" cssClass="createBarTextBox" 
            onChangeEvent={this.placeOnChangeEvent} 
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
      time: state.editableIdeaReducer.time,
    };
  }

export default connect(mapStateToProps)(EditIdeaBar);
