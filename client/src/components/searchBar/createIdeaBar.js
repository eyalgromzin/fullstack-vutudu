import React, { Component } from 'react'
import PlaceField from './placeField/placeField'
import NumOfPeopleCreator from 'components/searchBar/numOfPeopleCreator/numOfPeopleCreator'
import TimeCreator from './timeCreator/timeCreator'
import {
  EDITABLE_IDEA_SET_MIN_TIME,
  EDITABLE_IDEA_SET_PLACES,
  EDITABLE_IDEA_SET_IS_PLACE_VALID,
  EDITABLE_IDEA_SET_MAX_TIME
} from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'
import 'commonCss.css'

class CreateIdeaBar extends Component {
  onMinTimeChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: value});
  }

  onMaxTimeChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MAX_TIME, payload: value});
  }

  isPlaceValid = (placeText) => {
    return placeText.length >= 2
  }

  placeOnChangeEvent = (placeText) => {
    var isPlaceValid = this.isPlaceValid(placeText)

    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACES, payload: placeText});
    this.props.dispatch({type: EDITABLE_IDEA_SET_IS_PLACE_VALID, payload: isPlaceValid});
  }

  isNotEmpty = (e) => {
    return this.target.value.length > 3
  }

  render() {
    return (
      <React.Fragment>
        <div id="createBar" className="inlineBlock">
            <div id="createBarPlaceFieldContainer">
              <PlaceField 
                subjectID="createBarPlaceSelector" 
                isClickedButton={this.props.isClickedButton}
                placeOnChangeEvent={this.placeOnChangeEvent} place={this.props.place} 
                validationMethod={this.isNotEmpty} placeSuggestions={[]}
                placeFieldLocation="create" cssClass="inlineBlock createBarTextField" headerCssClass="fieldHeader" />
            </div>
            <TimeCreator 
              fieldClass="inlineBlock createComboBox createBarTimeField"
              headerCssClass="fieldHeader"
              selctorClass="timeCreatorCommon"
              onMinTimeChangeEvent={this.onMinTimeChangeEvent} 
              onMaxTimeChangeEvent={this.onMaxTimeChangeEvent} 
              minTime={this.props.minTime} maxTime={this.props.maxTime}  /> 
            <NumOfPeopleCreator cssClass="createBarDropDown" headerCssClass="fieldHeader"
              minNumOfPeople={this.props.minNumOfPeople} maxNumOfPeople={this.props.maxNumOfPeople} />        
        </div> 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton,
    minTime: state.editableIdeaReducer.minTime,
    maxTime: state.editableIdeaReducer.maxTime,
    place: state.editableIdeaReducer.place,
    minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);