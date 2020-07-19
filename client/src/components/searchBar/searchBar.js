import React, { Component } from 'react';
import NumOfPeopleSelector from './numOfPeopleSelector/numOfPeopleSelector';
import TimePicker from './timePicker/timePicker';
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
import CreateTextField from 'components/createTextField'


class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			textRef: undefined
		}
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

	onPlaceKeyDown = (e) => {		
		if (e.key === 'Enter') {
			this.state.searchButtonRef.search();
		}
	}

	onPlaceChange = (e) => {
		this.setState({placeText: e.target.value})
	}

	render() {
		// console.log('testing redux: in render')

		return (
			<div id="searchBar">
				<div id="searchBarButtons">
					{/* <CreateTextField 
						id="searchBarPlaceField"
						
						placeholder="plae / subject / anything"
						className=""
					/> */}
					<input id="searchBarPlaceField" 
						type="text" 
						placeholder="place / subject / text..."
						onChange={this.placeOnChangeEvent} 
						ref={ref6 => {
							if(this.state.textRef === undefined) {
								this.setState({textRef: ref6})                            
								this.textRef = ref6
							}
						}}	
						value={this.state.placeText}
						onChange={this.onPlaceChange}					
						onKeyDown={this.onPlaceKeyDown}
						/>
					<TimePicker
						cssClass="inlineBlock searchBarComboBox"
						headerCssClass="fieldHeader"
						onChangeEvent={this.timeOnChangeEvent}
						ref={ref1 => {
							if(this.state.timeRef === undefined) {
								this.setState({timeRef: ref1})                            
								this.timeRef = ref1
                            }
						}}
						/>
						{/* time={this.props.time}	 */}		{/* for loading last search */}

					<NumOfPeopleSelector 
						cssClass="searchBarDropDownSquare" 
						headerCssClass="fieldHeader" 
						ref={ref => {
							if(this.state.numOfPeopleRef === undefined) {
								this.setState({numOfPeopleRef: ref})                            
								this.numOfPeopleRef = ref
                            }
						}}
						/>					
						{/* numOfPeople={this.props.numOfPeople}  */}
					<SearchButton 
						textRef={this.state.textRef} 	
						timeRef={this.state.timeRef}  
						numOfPeopleRef={this.state.numOfPeopleRef}
						ref={ref7 => {
							if(this.state.textRef === undefined) {
								this.setState({searchButtonRef: ref7})                            
								this.textRef = ref7
							}
						}}
						/>
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
