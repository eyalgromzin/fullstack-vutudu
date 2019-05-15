import React, { Component } from 'react';
import PlaceField from './placeField/placeField';
import NumOfPeopleSelector from './numOfPeopleSelector/numOfPeopleSelector';
import TimePicker from './timePicker/timePicker';
import MoreChooser from './moreChooser/moreChooser';
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

	placeOnChangeEvent = (placeValue) => {
		var isPlaceValid = this.isPlaceValid(placeValue);

		this.props.dispatch({ type: SEARCH_SET_PLACE, payload: placeValue });
		this.props.dispatch({ type: SEARCH_SET_IS_PLACE_VALID, payload: isPlaceValid });
		this.props.dispatch({ type: SEARCH_SET_IS_CLICKED_SEARCH, payload: false });
	};

	render() {
		// console.log('testing redux: in render')

		return (
			<div id="searchBar">
				<div id="searchBarButtons">
					<PlaceField
						tagID="searchBarPlaceSelector"
						isClickedButton={this.props.isClickedSearch}
						placeOnChangeEvent={this.placeOnChangeEvent}
						place={this.props.place}
						validationMethod={this.isNotEmpty}
						placeSuggestions={[]}
					/>
					<TimePicker
						onChangeEvent={this.timeOnChangeEvent}
						time={this.props.time}
						cssClass="searchBarDropDownSquare"
					/>
					<NumOfPeopleSelector cssClass="searchBarDropDownSquare" numOfPeople={this.props.numOfPeople} />
					<MoreChooser
						isClickedButton={this.props.isClickedSearch}
						onChangeEvent={this.moreOnChangeEvent}
						more={this.props.more}
						validationMethod={this.isNotEmpty}
					/>
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
