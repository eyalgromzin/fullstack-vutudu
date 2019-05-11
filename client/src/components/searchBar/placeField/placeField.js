import React, { Component } from 'react'
import './placeField.css';
import '../searchBarCommonStyles.css'
import { getPlacesStartingWith } from 'actions/autoSuggestActions'
import { connect } from 'react-redux';
import 'commonCss.css'
import '../autoCompleteTheme.css'
import Autosuggest from 'react-autosuggest';
import {
  SET_PLACE_SUGGESTIONS
} from 'reducers/types'
import store from 'store'


class PlaceSelector extends Component {
  constructor(props){
    super(props)

    var placeText = this.props.place === undefined? '' : this.props.place

    this.state = {
      placeText: placeText,
      isPlaceValid: true,
      placeSuggestions: props.placeSuggestions
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.place != this.state.placeText){
      this.setState({placeText: this.props.place})
      return true
    }
  }  
  
  
  shouldRenderSuggestions = () => {
    return true;
  }
  
  isPlaceValid = () => {
    return this.state.placeText.length > 1
  }
  
  placeFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  handlePlaceChange = (e, { newValue }) => {
    this.setState({placeText: newValue})
    this.setState({isPlaceValid: true})
    this.props.placeOnChangeEvent(newValue)
  }
  
  onBlur = (e) => {
    if (this.state.placeText.length == 0 || this.isPlaceValid()){
      this.setState({isPlaceValid: true})
    }else{
      this.setState({isPlaceValid: false})
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    if (value == ""){
      const places = [ 'home','kitchen', 'bus station', 'park', 'beach', '...']
      
      store.dispatch({type: SET_PLACE_SUGGESTIONS, payload: places})
    }else{
      this.props.getPlacesStartingWith(value)
    }
  } 
 
  getSuggestionValue = (suggestion) => {
    return suggestion 
  }
 
  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );
 
  onSuggestionsClearRequested = () => {
    this.setState({placeSuggestions:[]})
  }

  render() {
    var isShowError = (this.props.isClickedButton && !this.isPlaceValid()) || !this.state.isPlaceValid

    const inputProps = {
      placeholder: 'home / kitchen / beach / bar / lawn / bus Station / ...',
      value: this.state.placeText,
      onChange: this.handlePlaceChange,
    };

    return (
      <React.Fragment >
        <div id="placeField" className="inlineBlock">
          <div className="fieldHeader">Place</div>
          <Autosuggest
            id="placeSelector"
            suggestions={this.props.placeSuggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            inputProps={inputProps}
            onChange={this.handlePlaceChange} 
            onBlur={this.onBlur}
          />
          { isShowError ? <div className="errorText"> *3+ letters </div> : <div className="invisible"> error </div> }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    placeSuggestions: state.suggestionsReducer.placeSuggestions,
  };
}

export default connect(mapStateToProps, {getPlacesStartingWith})(PlaceSelector);