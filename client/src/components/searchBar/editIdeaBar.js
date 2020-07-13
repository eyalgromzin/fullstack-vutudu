import React, { Component } from 'react'
import PlaceField from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import { EDITABLE_IDEA_SET_PLACES } from 'reducers/types'
import { EDITABLE_IDEA_SET_MIN_TIME } from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'

class EditIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACES, payload: value});
  }

  timeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: value});
    
  }

  render() {
    return (
      <div id="editIdeaBar">
        <div id="editBarButtons">
          <PlaceField subjectID="ideaBarPlaceSelector" fieldClass="createBarTextBox" headerCssClass="fieldHeader"
            placeOnChangeEvent={this.placeOnChangeEvent} 
            place={this.props.place} cssClass="inlineBlock searchBarTextField" />
          <TimePicker 
            cssClass="inlineBlock searchBarComboBox" 
            minTime={this.props.minTime} 
            onChangeEvent={this.timeOnChangeEvent} 
            maxTime={this.props.maxTime} headerCssClass="fieldHeader" />
          <NumOfPeopleCreator cssClass="createBarDropDown" headerCssClass="fieldHeader"
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
