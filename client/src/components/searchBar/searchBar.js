import React, { Component } from 'react'
import PlaceSelector from './placeSelector/placeSelector'
import NumOfPeopleSelector from './numOfPeopleSelector/numOfPeopleSelector'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import SearchButton from './searchButton/searchButton'
import { connect } from 'react-redux';
import {SET_TIME, SEARCH_SET_TIME, SEARCH_SET_PLACE, SET_PLACE} from 'reducers/types'
import './searchBarCommonStyles.css'
import 'commonCss.css'

// const searchBarSearch = "SEARCH_BAR_SEARCH";
// const searchBarCreate = "SEARCH_BAR_CREATE";

class SearchBar extends Component {
  constructor(props){
    super(props);
  }

  placeOnChangeEvent = (e) => {
    this.props.dispatch({type: SEARCH_SET_PLACE, payload: e.target.value});
  }

  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: SEARCH_SET_TIME, payload: e.target.value});
  }

  render() {
    return (
      <div id="searchBar" className="mainContent">
        <div id="searchBarButtons">
          {/* <span className="topBarName" > SEARCH: </span> */}
          <PlaceSelector tagID="searchBarPlaceSelector" onChangeEvent={this.placeOnChangeEvent} cssClass="searchBarTextSquare" />
          <div className="middlePlaceHolder" />
          <TimePicker onChangeEvent={this.timeOnChangeEvent} time={this.props.time} cssClass="searchBarDropDownSquare" />
          <div className="middlePlaceHolder" />
          <NumOfPeopleSelector  cssClass="searchBarDropDownSquare" />
          <div className="middlePlaceHolder" />
          <MoreChooser  cssClass="searchBarTextSquare" />
          <SearchButton  cssClass="searchBarTextSquare" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    time: state.searchBarReducer.time
  };
}

export default connect(mapStateToProps)(SearchBar);