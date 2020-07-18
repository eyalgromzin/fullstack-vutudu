import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import 'cssAnimations.css'
import { searchItems } from 'actions/ideaActions'
import { connect } from 'react-redux'
import {
  SET_SEARCH_IDEAS,
  SET_CURRENT_IDEA,
  SET_IS_SEARCHING
} from 'reducers/types'
import store from 'store'

// import { CHANGE_SEARCHED_STATE, } from 'reducers/types'
// import store from 'store'
import { search } from '../searchBarCommon'
import {
  SEARCH_SET_IS_PLACE_DIRTY,
  SEARCH_SET_IS_MORE_DIRTY,
  SEARCH_SET_IS_CLICKED_SEARCH,
  CHANGE_SEARCHED_STATE
} from 'reducers/types'

class SearchButton extends Component {
  constructor(props){
    super(props);
  
    //run those validation methods on click
    this.state={
      searchControlsValidationMethods:props.searchControlsValidationMethods,      
    }
  }

  handleSearchClick = () => {
    this.props.dispatch({type: SEARCH_SET_IS_CLICKED_SEARCH, payload: true});

    this.search();
  }

  search = () => {
    console.log('searching ideas...');
    var text = this.props.textRef.value
    var time = this.props.timeRef.state.time
    var numOfPeople = this.props.numOfPeopleRef.state.numOfPeople

    store.dispatch({ type: SET_IS_SEARCHING, payload: true });
	  

    store.dispatch(searchItems(text, time, numOfPeople, (ideas) => {
      console.log('found ' + ideas.length + ' ideas!!')
      store.dispatch({ type: SET_SEARCH_IDEAS, payload: ideas });
      store.dispatch({ type: SET_IS_SEARCHING, payload: false });
      store.dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });	//throws cross origin error
      if (ideas.length > 0) {
        console.log('got ' + ideas.length + ' ideas from db');
        store.dispatch({ type: SET_CURRENT_IDEA, payload: ideas[0] });
        
      } else {
        console.log('got 0 items from db');
        store.dispatch({ type: SET_SEARCH_IDEAS, payload: [] });
      }
    },
    (error) => {
      console.log('failed to search ideas: ' + error)
    }
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div id="searchButtonContainer">
          {this.props.isSearching? 
            <span>              
              <img src={require("images/loading2.gif")} id="loadingSearchButton" alt="" />
            </span>
            : 
            <img src={require("images/search.png")}  alt="" className="tilt clickAnimation" id="searchButton" onClick={this.handleSearchClick} /> 
          }
          <div className="invisible"> error </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSearchEnabled: state.searchBarReducer.isSearchEnabled,
    isSearching: state.searchPageReducer.isSearching,
  };
}

export default connect(mapStateToProps)(SearchButton);
