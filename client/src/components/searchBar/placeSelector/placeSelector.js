import React, { Component } from 'react'
import './placeSelector.css';
import '../searchBarCommonStyles.css'

export default class PlaceSelector extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: ''
    }

    this.handleOnChange = props.onChangeEvent;  
  }

  render() {
    return (
      <React.Fragment >
        <input id={this.props.tagID} className={this.props.cssClass} placeholder="Place" type="text" onChange={this.handleOnChange}  />
      </React.Fragment >
    )
  }
}
