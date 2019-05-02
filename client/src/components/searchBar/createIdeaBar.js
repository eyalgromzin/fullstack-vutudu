import React, { Component } from 'react'

import PlaceSelector from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import {
  CREATE_IDEA_SET_TIME,
  EDITABLE_IDEA_SET_PLACE,
  EDITABLE_IDEA_SET_IS_PLACE_VALID
} from 'reducers/types'
import { EDITABLE_IDEA_SET_TIME } from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'

class CreateIdeaBar extends Component {
  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: CREATE_IDEA_SET_TIME, payload: Number(e.target.value)});
  }

  isPlaceValid = (placeText) => {
    return placeText.length >= 1
  }

  placeOnChangeEvent = (e) => {
    var isPlaceValid = this.isPlaceValid(e.target.value)

    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACE, payload: e.target.value});
    this.props.dispatch({type: EDITABLE_IDEA_SET_IS_PLACE_VALID, payload: isPlaceValid});
  }

  render() {
    return (
      <div id="createBar">
        <div id="createBarButtons">
          {this.props.showTitle == true || this.props.showTitle === undefined ? 
            <span className="topBarName"> 
              CREATE: 
              <div></div>
            </span> : "" }
          <PlaceSelector tagID="createBarPlaceSelector" 
            cssClass="createBarTextBox" 
            placeSuggestions={[]}
            placeOnChangeEvent={this.placeOnChangeEvent} 
            isClickedButton={this.props.isClickedButton} 
            place={this.props.place} />
          <TimePicker onChangeEvent={this.timeOnChangeEvent} cssClass="createBarDropDown" time={0} />
          <NumOfPeopleCreator cssClass="createBarDropDown" 
            minNumOfPeople={this.props.minNumOfPeople} maxNumOfPeople={this.props.maxNumOfPeople} />        
        </div>
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);