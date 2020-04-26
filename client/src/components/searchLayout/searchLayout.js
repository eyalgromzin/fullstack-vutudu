import React, { Component } from 'react';
import SearchBar from '../searchBar/searchBar';
import IdeaCard from '../ideaCard/ideaCard';
import TopTable from 'components/topTable/topTable';
import 'commonCss.css';
import 'components/layout.css';
import { connect } from 'react-redux';
import NoResultsFound from './noResultsFound';
import { searchItems } from 'actions/ideaActions';
import { getIdeaByID } from 'actions/ideaActions';
import store from 'store';
import { moveUnlikedIdeasToBack } from 'commonUtils'
import {
	SEARCH_SET_TIME,
	SEARCH_SET_PLACE,
  SEARCH_SET_NUM_OF_PEOPLE,
  SEARCH_SET_MORE,
  SET_CURRENT_IDEA,
} from 'reducers/types';
import IdeasList from '../ideasList/ideasList';

class searchLayout extends Component {
	fillSearchBar = (idea) => {
		var x = 4;
	};

	constructor(props) {
		super(props);

		this.state = {
			refresh: false,
			place: this.props.place,
			more: this.props.more,
			index: 0,
		};

		if(this.props.match.params.ideaID !== undefined &&
            this.props.match.params.place === undefined &&
            this.props.match.params.time === undefined &&
            this.props.match.params.numOfPeople === undefined){

			var ideaID = this.props.match.params.ideaID
			store.dispatch(getIdeaByID(ideaID));
   	 	}else if (this.props.match.params.ideaID !== undefined) {
			var ideaID = this.props.match.params.ideaID;
					store.dispatch(getIdeaByID(ideaID));
			
			this.props.dispatch({ type: SEARCH_SET_TIME, payload: this.props.match.params.time });
					this.props.dispatch({ type: SEARCH_SET_PLACE, payload: this.props.match.params.place });
					//there is no num of people in idea, there is min # ppl, and max # ppl
					this.props.dispatch({ type: SEARCH_SET_NUM_OF_PEOPLE, payload: this.props.match.params.numOfPeople });
					// same things, there are multiple tag for each idea
					if (this.props.match.params.more !== undefined) {
						this.props.dispatch({ type: SEARCH_SET_MORE, payload: this.props.match.params.more });
			}
		}

		if (this.props.match.params.ideaID === undefined &&
			this.props.match.params.place !== undefined &&
			this.props.match.params.time !== undefined &&
			this.props.match.params.numOfPeople !== undefined
		) {
			var place = this.props.match.params.place;
			var time = parseInt(this.props.match.params.time);
			var numOfPeople = parseInt(this.props.match.params.numOfPeople);
			var more = this.props.match.params.more;

			store.dispatch(searchItems(place, time, numOfPeople, more));
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		var newPlaceText = this.props.place === undefined ? '' : this.props.place;
		if (this.state.place != newPlaceText) {
			this.setState({ place: newPlaceText });
    	}
    
    	return null
	}

	onSelectedIndexChange = (newIndex) => {
		this.setState({index: newIndex})
	}

	ideaSelected = (idea, newIndex) => {
		this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea });
		
	}

 	render() {
		this.state.refresh = !this.state.refresh;

		return (
			<React.Fragment>
				<div className="searchMainContent">
					<div className="mainContent">
						<SearchBar
							place={this.props.place}
							numOfPeople={this.props.numOfPeople}
							time={this.props.time}
							more={this.props.more}
						/>						
						{this.props.ideas.length == 0 && this.props.searched ? (
							<NoResultsFound />
						) : this.props.searched ? 
							<React.Fragment>
								<div id="searchCardAndList">
									<div className="searchIdeasList">
										<IdeasList ideas={this.props.ideas} height={510} selectedIndex={this.state.index} 
										onIdeaSelected={this.ideaSelected} onSelectedIndexChange={this.onSelectedIndexChange} />
									</div>
									<div id="searchIdeaCard"> 
										<IdeaCard idea={this.props.idea} ideas={this.props.ideas} 
											onSelectedIndexChange={this.onSelectedIndexChange}
											enabled={true} showNextPreviousButtons={true} />
									</div>
								</div>
							</React.Fragment>
						 	: 
							""
						}
					</div>					 
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	let unlikedIdeasLast = moveUnlikedIdeasToBack(state.searchPageReducer.ideas, state.userPageReducer.loggedInUserID)

	return {
		userID: state.userPageReducer.loggedInUserID,
		searched: state.commonReducer.searched,
		idea: state.searchPageReducer.currentIdea,
		ideas: unlikedIdeasLast,
		place: state.searchBarReducer.place,
		time: state.searchBarReducer.time,
		numOfPeople: state.searchBarReducer.numOfPeople,
		more: state.searchBarReducer.more
	};
}

export default connect(mapStateToProps)(searchLayout);
