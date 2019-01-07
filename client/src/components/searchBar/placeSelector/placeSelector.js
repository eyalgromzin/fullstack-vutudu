import React, { Component } from 'react'
import './placeSelector.css';
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
import store from 'store'

export default class PlaceSelector extends Component {
  placeSelectorKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      search(store);
    }
  }

  render() {
    return (
      <React.Fragment >
        <input id={this.props.tagID} value={this.props.place} 
          className={this.props.cssClass} onKeyUp={this.placeSelectorKeyUp} placeholder="Place" 
          type="text" onChange={this.props.onChangeEvent}  />
      </React.Fragment >
    )
  }
}
