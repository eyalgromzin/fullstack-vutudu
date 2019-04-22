import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import 'cssAnimations.css'
import { searchItems } from 'actions/ideaActions'
import { connect } from 'react-redux'
// import { CHANGE_SEARCHED_STATE, } from 'reducers/types'
// import store from 'store'
import { search } from 'components/searchBar/searchBarCommon'

class SearchButton extends Component {
  handleSearchClick = () => {
    search();
  }

  render() {
    return (
        <img src={require("images/search.png")} className="tilt clickAnimation" id="searchButton" onClick={this.handleSearchClick} />
    )
  }
}

export default connect()(SearchButton);
