import React, { Component } from 'react'
import PlaceField from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimeCreator from './timeCreator/timeCreator'
import {
  EDITABLE_IDEA_SET_TIME,
  EDITABLE_IDEA_SET_PLACE,
  EDITABLE_IDEA_SET_IS_PLACE_VALID
} from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'
import 'commonCss.css'

class CreateIdeaBar extends Component {
  timeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_TIME, payload: value});
  }

  isPlaceValid = (placeText) => {
    return placeText.length >= 2
  }

  placeOnChangeEvent = (placeText) => {
    var isPlaceValid = this.isPlaceValid(placeText)

    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACE, payload: placeText});
    this.props.dispatch({type: EDITABLE_IDEA_SET_IS_PLACE_VALID, payload: isPlaceValid});
  }

  isNotEmpty = (e) => {
    return this.target.value.length > 3
  }

  render() {
    return (
      <React.Fragment>
        <div id="createBar" className="inlineBlock">
            <PlaceField tagID="createBarPlaceSelector" isClickedButton={this.props.isClickedButton}
              placeOnChangeEvent={this.placeOnChangeEvent} place={this.props.place} 
              validationMethod={this.isNotEmpty} placeSuggestions={[]}
              placeFieldLocation="create" />
            <TimeCreator onChangeEvent={this.timeOnChangeEvent} cssClass="createBarDropDown" time={this.props.time} /> 
            <NumOfPeopleCreator cssClass="createBarDropDown" 
              minNumOfPeople={this.props.minNumOfPeople} maxNumOfPeople={this.props.maxNumOfPeople} />        
        </div> 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton,
    time: state.editableIdeaReducer.time,
    place: state.editableIdeaReducer.place,
    minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);