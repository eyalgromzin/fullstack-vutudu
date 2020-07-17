import React, { Component } from 'react';
import NumOfPeopleSelector from './numOfPeopleSelector/numOfPeopleSelector';
import TimePicker from './timePicker/timePicker';
// import MoreChooser from './moreChooser/moreChooser';
import SearchButton from './searchButton/searchButton';
import { connect } from 'react-redux';
import {
	SEARCH_SET_TIME,
	SEARCH_SET_PLACE,
	SEARCH_SET_MORE,
	SEARCH_SET_IS_CLICKED_SEARCH,
	SEARCH_SET_IS_PLACE_VALID
} from 'reducers/types';
import './searchBarCommonStyles.css';
import 'commonCss.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		// console.log('testing redux: in constructor')
	}

	timeOnChangeEvent = (value) => {
		this.props.dispatch({ type: SEARCH_SET_TIME, payload: value });
	};

	isNotEmpty = (e) => {
		return this.target.value.length > 3;
	};

	moreOnChangeEvent = (moreText) => {
		this.props.dispatch({ type: SEARCH_SET_MORE, payload: moreText });
		this.props.dispatch({ type: SEARCH_SET_IS_CLICKED_SEARCH, payload: false });
	};

	isPlaceValid = (place) => {
		if (place === undefined) {
			return false;
		}
		return place.length >= 2;
	};

	placeOnChangeEvent = (e) => {
		var isPlaceValid = true
		if(e.target.value.length > 0)
			isPlaceValid = true // this.isPlaceValid(placeValue);

		this.props.dispatch({ type: SEARCH_SET_PLACE, payload: e.target.value });
		this.props.dispatch({ type: SEARCH_SET_IS_PLACE_VALID, payload: isPlaceValid });
		this.props.dispatch({ type: SEARCH_SET_IS_CLICKED_SEARCH, payload: false });
	};

	render() {
		// console.log('testing redux: in render')

		return (
			<div id="searchBar">
				<div id="searchBarButtons">
					<input id="searchBarPlaceField" type="text" placeholder="place / subject / text..."
						onChange={this.placeOnChangeEvent} />
					<TimePicker
						cssClass="inlineBlock searchBarComboBox"
						headerCssClass="fieldHeader"
						onChangeEvent={this.timeOnChangeEvent}
						time={this.props.time}
					/>
					<NumOfPeopleSelector cssClass="searchBarDropDownSquare" headerCssClass="fieldHeader" numOfPeople={this.props.numOfPeople} />					
					<SearchButton />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log('testing redux: in mapStateToProps')

	return {
		isMoreValid: state.searchBarReducer.isMoreValid,
		isPlaceValid: state.searchBarReducer.isPlaceValid,
		isClickedSearch: state.searchBarReducer.isClickedSearch
	};
}

export default connect(mapStateToProps)(SearchBar);
