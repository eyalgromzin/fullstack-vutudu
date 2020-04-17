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
import {
	SEARCH_SET_TIME,
	SEARCH_SET_PLACE,
  SEARCH_SET_NUM_OF_PEOPLE,
  SEARCH_SET_MORE,
} from 'reducers/types';

class searchLayout extends Component {
	fillSearchBar = (idea) => {
		var x = 4;
	};

	constructor(props) {
		super(props);

		this.state = {
			refresh: false,
			place: this.props.place,
			idea: {},
			more: this.props.more
		};

    //for getting idea ID
    //can be also an idea from top table - which will lack the 
		
		if(this.props.match.params.ideaID !== undefined &&
            this.props.match.params.place === undefined &&
            this.props.match.params.time === undefined &&
            this.props.match.params.numOfPeople === undefined){
      var ideaID = this.props.match.params.ideaID
      store.dispatch(getIdeaByID(ideaID));

    }
    else if (this.props.match.params.ideaID !== undefined) {
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

    //for getting search
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

  componentDidUpdate(){

  }

	render() {
		this.state.refresh = !this.state.refresh;

		if (this.props.match.params.numOfPeople === undefined) {
		}

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
						) : this.props.searched ? (
							<IdeaCard idea={this.props.idea} enabled={true} showNextPreviousButtons={true} />
						) : (
							<TopTable />
						)}
					</div>					 
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		searched: state.commonReducer.searched,
		idea: state.searchPageReducer.currentIdea,
		ideas: state.searchPageReducer.ideas,
		place: state.searchBarReducer.place,
		time: state.searchBarReducer.time,
		numOfPeople: state.searchBarReducer.numOfPeople,
		more: state.searchBarReducer.more
	};
}

export default connect(mapStateToProps)(searchLayout);
