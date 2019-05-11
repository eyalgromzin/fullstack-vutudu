import React, { Component } from 'react'
import PlaceSelector from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import {
  EDITABLE_IDEA_SET_TIME,
  EDITABLE_IDEA_SET_PLACE,
  EDITABLE_IDEA_SET_IS_PLACE_VALID
} from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'
import 'commonCss.css'
import PlaceField from './placeField/placeField'

class CreateIdeaBar extends Component {
  timeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_TIME, payload: value});
  }

  isPlaceValid = (placeText) => {
    return placeText.length >= 1
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
          <div id="createBarButtons">
            {/* <PlaceField type="text" 
              tagID="createBarPlaceSelector" 
              cssClass="createBarTextBox" 
              placeSuggestions={[]}
              placeOnChangeEvent={this.placeOnChangeEvent} 
              isClickedButton={this.props.isClickedButton} 
              place={this.props.place} /> */}
            <PlaceField tagID="createBarPlaceSelector" isClickedButton={this.props.isClickedButton}
              placeOnChangeEvent={this.placeOnChangeEvent} place={this.props.place} 
              validationMethod={this.isNotEmpty} placeSuggestions={[]}/>
            <TimePicker onChangeEvent={this.timeOnChangeEvent} cssClass="createBarDropDown" time={this.props.time} /> 
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
    isClickedButton: state.editableIdeaReducer.isClickedButton,
    time: state.editableIdeaReducer.time,
    place: state.editableIdeaReducer.place,
  };
}


export default connect(mapStateToProps)(CreateIdeaBar);