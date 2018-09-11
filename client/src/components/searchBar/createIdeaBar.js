import React, { Component } from 'react'

import PlaceSelector from './placeSelector/placeSelector'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import { NEW_IDEA_SET_PLACE } from 'redux/types'
import { NEW_IDEA_SET_TIME } from 'redux/types'
import { connect } from 'react-redux';

class CreateIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (e) => {
    this.props.dispatch({type: NEW_IDEA_SET_PLACE, payload: e.target.value});
  }

  timeOnChangeEvent = (e) => {
    var x;
    x++;
    this.props.dispatch({type: NEW_IDEA_SET_TIME, payload: e.target.value});
  }

  render() {
    return (
      <div id="searchBar">
        <PlaceSelector onChangeEvent={this.placeOnChangeEvent} />
        <TimePicker onChangeEvent={this.timeOnChangeEvent}/>
        <NumOfPeopleCreator />        
      </div>
    )
  }
}

export default connect()(CreateIdeaBar);
