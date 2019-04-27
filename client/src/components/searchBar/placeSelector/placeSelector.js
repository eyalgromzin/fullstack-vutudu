import React, { Component } from 'react'
import './placeSelector.css';
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
import { connect } from 'react-redux';
import 'commonCss.css'
import {
  SEARCH_SET_PLACE, 
  SET_IS_PLACE_VALID, 
  SET_IS_CLICKED_SEARCH,
} from 'reducers/types'
import { SET_IS_PLACE_DIRTY } from '../../../reducers/types';


class PlaceSelector extends Component {
constructor(props){
  super(props)

  this.state = {
    text: ''
  }
}

  placeSelectorKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  isPlaceValid = () => {
    return this.state.text.length >= 1
  }

  placeOnChangeEvent = (e) => {
    this.state.text = e.target.value
    var isPlaceValid = this.isPlaceValid()

    this.props.dispatch({type: SEARCH_SET_PLACE, payload: e.target.value});
    this.props.dispatch({type: SET_IS_PLACE_VALID, payload: isPlaceValid});
    this.props.dispatch({type: SET_IS_CLICKED_SEARCH, payload: false});
  }

  render() {
    var isShowError = this.props.isClickedSearch && !this.props.isPlaceValid

    return (
      <React.Fragment >
        <div id="placeSelector" className="inlineBlock">
          <input id={this.props.tagID} value={this.props.place} 
            className={this.props.cssClass} placeholder="Place" type="text" onChange={this.placeOnChangeEvent}  />
          { isShowError ? <div className="errorText">plz fill place (3+ letters)</div> : <div className="invisible"> error </div> }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedSearch: state.searchBarReducer.isClickedSearch,
    isPlaceValid: state.searchBarReducer.isPlaceValid,
  };
}

export default connect(mapStateToProps)(PlaceSelector);