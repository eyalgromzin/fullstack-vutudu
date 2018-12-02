import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import { searchItems } from 'actions/ideaActions'
import { connect } from 'react-redux'
// import { CHANGE_SEARCHED_STATE, } from 'reducers/types'
// import store from 'store'
import { search } from 'components/searchBar/searchBarCommon'

class SearchButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: 'bus station',
      time: 5,
      numOfPeople: 1,
      more: '#productive',      
    }
  }

  handleSearchClick = () => {
    // store.dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
    // this.props.searchItems(this.props.place,this.props.time,this.props.numOfPeople);
    search();
  }

  render() {
    return (
        <img src={require("images/search.png")} id="searchButton" onClick={this.handleSearchClick} />
    )
  }
}

function mapStateToProps(state) {
    return {
      place: state.searchBarReducer.place,
      time: state.searchBarReducer.time,
      numOfPeople: state.searchBarReducer.numOfPeople,
      more: state.searchBarReducer.more,
    };
  }

  export default connect(mapStateToProps, {searchItems})(SearchButton);
