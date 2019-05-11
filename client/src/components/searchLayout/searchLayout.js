import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import IdeaCard from '../ideaCard/ideaCard'
import TopTable from 'components/topTable/topTable'
import 'commonCss.css'
import 'components/layout.css'
import { connect } from 'react-redux';
import NoResultsFound from './noResultsFound'
import { searchItems } from 'actions/ideaActions'
import { getIdeaByID } from 'actions/ideaActions'
import store from 'store'

class searchLayout extends Component {
  constructor(props){
    super(props);

    this.state={
      refresh: false,
      place: this.props.place,
      idea: {},
      more: this.props.more,
    }

    if(this.props.match.params.ideaID !== undefined){
      var ideaID = this.props.match.params.ideaID
      store.dispatch(getIdeaByID(ideaID))
    } 

    if(this.props.match.params.place !== undefined && 
      this.props.match.params.time !== undefined && 
      this.props.match.params.numOfPeople !== undefined){
        var place = this.props.match.params.place
        var time = parseInt(this.props.match.params.time)
        var numOfPeople = parseInt(this.props.match.params.numOfPeople)
        var more = this.props.match.params.more

        store.dispatch(searchItems(place, time, numOfPeople, more));
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
		var newPlaceText = this.props.place === undefined ? "" : this.props.place;
		if(this.state.place != newPlaceText){
			this.setState({ place: newPlaceText });
		}
  }

  render() {
    this.state.refresh = !this.state.refresh

    if(this.props.match.params.numOfPeople === undefined){

    }

    return (
      <React.Fragment>
        <div className="searchMainContent">
          <SearchBar place={this.props.place} 
            numOfPeople={this.props.numOfPeople}
            time={this.props.time} 
            more={this.props.more} />
            
            <div className="mainContent">
              {
              this.props.ideas.length == 0 && this.props.searched ?
                <NoResultsFound />
                :
                  this.props.searched ? 
                    <IdeaCard idea={this.props.idea} enabled={true} showNextPreviousButtons={true}/> 
                    : 
                    <TopTable /> 
              }
            </div>
          }
        </div>
      </React.Fragment>
    )
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
    more: state.searchBarReducer.more,
  };
}

export default connect(mapStateToProps)(searchLayout);
