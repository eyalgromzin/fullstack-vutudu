import React, { Component } from 'react'
import PlaceField from './placeField/placeField'
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
  SEARCH_SET_IS_MORE_VALID,
  SEARCH_SET_IS_CLICKED_SEARCH,
  SEARCH_SET_IS_PLACE_VALID,
} from 'reducers/types'
import './searchBarCommonStyles.css'
import 'commonCss.css'

class SearchBar extends Component {
  timeOnChangeEvent = (e) => {
    this.props.dispatch({type: SEARCH_SET_TIME, payload: e.target.value});
  }

  isNotEmpty = (e) => {
    return this.target.value.length > 3
  }

  isMoreValid = () => {
    return this.state.text.length == 0 || this.state.text.length >= 1
  }

  moreOnChangeEvent = (e) => {
    this.state.text = e.target.value
    
    this.props.dispatch({type: SEARCH_SET_MORE, payload: e.target.value});
    this.props.dispatch({type: SEARCH_SET_IS_MORE_VALID, payload: isMoreValid});
    this.props.dispatch({type: SEARCH_SET_IS_CLICKED_SEARCH, payload: false});
    
    var isMoreValid = this.isMoreValid()
  }

  isPlaceValid = (place) => {
    return place.length >= 1
  }

  placeOnChangeEvent = (e) => {
    var isPlaceValid = this.isPlaceValid(e.target.value)
    
    this.props.dispatch({type: SEARCH_SET_PLACE, payload: e.target.value});
    this.props.dispatch({type: SEARCH_SET_IS_PLACE_VALID, payload: isPlaceValid});
    this.props.dispatch({type: SEARCH_SET_IS_CLICKED_SEARCH, payload: false});
  }

  render(){
    return (
      <div id="searchBar" className="mainContent">
        <div id="searchBarButtons">
          <PlaceField tagID="searchBarPlaceSelector" isClickedButton={this.props.isClickedSearch}
          placeOnChangeEvent={this.placeOnChangeEvent} validationMethod={this.isNotEmpty} />
          <div className="middlePlaceHolder" />
          <TimePicker onChangeEvent={this.timeOnChangeEvent} time={10} cssClass="searchBarDropDownSquare" />          
          <div className="middlePlaceHolder" />
          <NumOfPeopleSelector  cssClass="searchBarDropDownSquare" />
          <div className="middlePlaceHolder" />
          <MoreChooser isClickedButton={this.props.isClickedSearch} onChangeEvent={this.moreOnChangeEvent} validationMethod={this.isNotEmpty} />
          <SearchButton />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    time: state.searchBarReducer.time,
    isMoreValid: state.searchBarReducer.isMoreValid,
    isPlaceValid: state.searchBarReducer.isPlaceValid,
    isClickedSearch: state.searchBarReducer.isClickedSearch
  };
}

export default connect(mapStateToProps)(SearchBar);