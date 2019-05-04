import React, { Component } from 'react'
import PlaceSelector from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import {
  CREATE_IDEA_SET_TIME,
  EDITABLE_IDEA_SET_PLACE,
  EDITABLE_IDEA_SET_IS_PLACE_VALID
} from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'
import 'commonCss.css'

class CreateIdeaBar extends Component {
  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: CREATE_IDEA_SET_TIME, payload: Number(e.target.value)});
  }

  isPlaceValid = (placeText) => {
    return placeText.length >= 1
  }

  placeOnChangeEvent = (placeText) => {
    var isPlaceValid = this.isPlaceValid(placeText)

    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACE, payload: placeText});
    this.props.dispatch({type: EDITABLE_IDEA_SET_IS_PLACE_VALID, payload: isPlaceValid});
  }

  render() {
    return (
      <React.Fragment>
        <div id="createBar" class="inlineBlock">
          <div id="createBarButtons">
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
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);