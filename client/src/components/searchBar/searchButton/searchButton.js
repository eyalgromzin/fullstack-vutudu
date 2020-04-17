import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import 'cssAnimations.css'
import { searchItems } from 'actions/ideaActions'
import { connect } from 'react-redux'
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
    if (this.props.isSearchEnabled){
      search();
      
    }else{
      //make search button red animation!!!
    }

    this.props.dispatch({type: SEARCH_SET_IS_PLACE_DIRTY, payload: false});
    this.props.dispatch({type: SEARCH_SET_IS_MORE_DIRTY, payload: false});
    this.props.dispatch({type: SEARCH_SET_IS_CLICKED_SEARCH, payload: true});
  }

  render() {
    return (
      <React.Fragment>
        <div id="searchButtonContainer">
          {this.props.isSearching? 
            <span>
              {/* <img src={require("images/search.png")} className="tilt clickAnimation" id="searchButton"  alt="" onClick={this.handleSearchClick} />  */}
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
