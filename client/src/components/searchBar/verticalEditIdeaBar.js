import React, { Component } from 'react'
import PlaceField from './placeField/placeField'
import NumOfPeopleCreator from './numOfPeopleCreator/numOfPeopleCreator'
import TimePicker from './timePicker/timePicker'
import { EDITABLE_IDEA_SET_PLACE } from 'reducers/types'
import { EDITABLE_IDEA_SET_MIN_TIME } from 'reducers/types'
import { connect } from 'react-redux';
import './searchBarCommonStyles.css'
import TimeCreator from './timeCreator/timeCreator'

class VerticalEditIdeaBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACE, payload: value});
  }

  timeOnChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: value});
    
  }

  render() {
    return (
      <div id="verticalCreateBar">
        <div id="editBarButtons">
          <PlaceField 
            fieldClass="verticalSearchBarTextField"
            headerCssClass="verticalFieldHeader"
            tagID="ideaBarPlaceSelector" 
            placeOnChangeEvent={this.placeOnChangeEvent} 
            place={this.props.place} />
          <TimeCreator 
            fieldClass="inlineBlock verticalBarTimeCreatorClass"
            headerCssClass="verticalFieldHeader" 
            selctorClass="timeCreatorCommon"
            onChangeEvent={this.timeOnChangeEvent} 
            minTime={this.props.minTime} 
            maxTime={this.props.maxTime} 
          />
          <NumOfPeopleCreator 
            fieldClass="inlineBlock verticalBarTimeCreatorClass"
            cssClass="createBarDropDown searchBarDropDownSquare" 
            headerCssClass="verticalFieldHeader"
            selctorClass="numOfPeopleCreatorDropDown createBarCommon"
            minNumOfPeople={this.props.minNumOfPeople} 
            maxNumOfPeople={this.props.maxNumOfPeople} />        
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

export default connect(mapStateToProps)(VerticalEditIdeaBar);
