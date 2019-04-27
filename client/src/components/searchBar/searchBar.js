import React, { Component } from 'react'
import PlaceSelector from './placeSelector/placeSelector'
import NumOfPeopleSelector from './numOfPeopleSelector/numOfPeopleSelector'
import TimePicker from './timePicker/timePicker'
import MoreChooser from './moreChooser/moreChooser'
import SearchButton from './searchButton/searchButton'
import { connect } from 'react-redux';
import {
  SET_TIME, 
  SEARCH_SET_TIME, 
  SEARCH_SET_PLACE, 
  SEARCH_SET_MORE,
} from 'reducers/types'
import './searchBarCommonStyles.css'
import 'commonCss.css'

// const searchBarSearch = "SEARCH_BAR_SEARCH";
// const searchBarCreate = "SEARCH_BAR_CREATE";

class SearchBar extends Component {
  constructor(props){
    super(props);
  }

  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: SEARCH_SET_TIME, payload: e.target.value});
  }

  isNotEmpty = (e) => {
    return this.target.value.length > 3
  }

  // pass fields + validation method + error text

  moreOnChangeEvent = (e) => {
    this.state.text = e.target.value
    var isMoreValid = this.isMoreValid()

    this.props.dispatch({type: SEARCH_SET_MORE, payload: e.target.value});
    this.props.dispatch({type: SET_IS_MORE_VALID, payload: isMoreValid});
    this.props.dispatch({type: SET_IS_CLICKED_SEARCH, payload: false});
  }

  render() {
    return (
      <div id="searchBar" className="mainContent">
        <div id="searchBarButtons">
          <PlaceSelector tagID="searchBarPlaceSelector" cssClass="searchBarTextSquare" validationMethod={this.isNotEmpty} />
          <div className="middlePlaceHolder" />
          <TimePicker onChangeEvent={this.timeOnChangeEvent} time={this.props.time} cssClass="searchBarDropDownSquare" />          
          <div className="middlePlaceHolder" />
          <NumOfPeopleSelector  cssClass="searchBarDropDownSquare" />
          <div className="middlePlaceHolder" />
          <MoreChooser cssClass="searchBarTextSquare" onChangeEvent={this.moreOnChangeEvent} validationMethod={this.isNotEmpty} />
          {/* {this.props.isMoreValid? '' : <div>Fill More (at least 2 letters)</div>} */}
          <SearchButton cssClass="searchBarTextSquare" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    time: state.searchBarReducer.time,
    isMoreValid: state.searchBarReducer.isMoreValid,
    isPlaceValid: state.searchBarReducer.isPlaceValid
  };
}

export default connect(mapStateToProps)(SearchBar);