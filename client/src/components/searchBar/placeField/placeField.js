import React, { Component } from 'react'
import './placeField.css';
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
import { connect } from 'react-redux';
import 'commonCss.css'
import {
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE
} from 'reducers/types'
import { SET_IS_PLACE_DIRTY } from '../../../reducers/types';


class PlaceSelector extends Component {
  constructor(props){
    super(props)

    this.state = {
      text: '',
      isPlaceValid: true,
    }
  }

  isPlaceValid = () => {
    return this.state.text.length > 1
  }

  placeFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  handlePlaceChange = (e) => {
    this.setState({text: e.target.value})
    this.setState({isPlaceValid: true})
    this.props.placeOnChangeEvent(e)
  }

  onblur = (e) => {
    if (this.state.text.length == 0 || this.isPlaceValid()){
      this.setState({isPlaceValid: true})
    }else{
      this.setState({isPlaceValid: false})
    }
  }

  render() {
    var isShowError = (this.props.isClickedButton && !this.isPlaceValid()) || !this.state.isPlaceValid

    return (
      <React.Fragment >
        <div id="placeField" className="inlineBlock">
          <input id={this.props.tagID} 
            value={this.state.text} 
            onChange={this.handlePlaceChange} 
            className={isShowError? "searchBarTextSquare errorCss" : "searchBarTextSquare"}
            placeholder="Place" 
            type="text" 
            onChange={this.handlePlaceChange} 
            onBlur={this.onBlue}  />
          { isShowError ? <div className="errorText">plz fill place (3+ letters)</div> : <div className="invisible"> error </div> }
        </div>
      </React.Fragment>
    )
  }
}



export default connect()(PlaceSelector);