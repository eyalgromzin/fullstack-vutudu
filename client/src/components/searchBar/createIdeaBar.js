import React, { Component } from 'react'

import PlaceSelector from './placeSelector/placeSelector'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import { EDITED_IDEA_SET_PLACE } from 'reducers/types'
import { EDITED_IDEA_SET_TIME } from 'reducers/types'
import { connect } from 'react-redux';

class CreateIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (e) => {
    var x;
    x++;
    this.props.dispatch({type: EDITED_IDEA_SET_PLACE, payload: e.target.value});
  }

  timeOnChangeEvent = (e) => {
    var x;
    x++;
    this.props.dispatch({type: EDITED_IDEA_SET_TIME, payload: Number(e.target.value)});
    
  }

  render() {
    return (
      <div id="searchBar">
        <span class="topBarName" > CREATE: </span>
        <PlaceSelector tagID="createBarPlaceSelector" cssClass="createBarTextBox" onChangeEvent={this.placeOnChangeEvent} />
        <TimePicker onChangeEvent={this.timeOnChangeEvent} cssClass="createBarDropDown" />
        <NumOfPeopleCreator cssClass="createBarDropDown" />        
      </div>
    )
  }
}

export default connect()(CreateIdeaBar);
