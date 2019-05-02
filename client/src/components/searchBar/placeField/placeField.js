import React, { Component } from 'react'
import './placeField.css';
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
import { getPlacesStartingWith } from 'actions/autoSuggestActions'
import { connect } from 'react-redux';
import 'commonCss.css'
import './placesAutoCompleteTheme.css'
import Autosuggest from 'react-autosuggest';
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
      placeSuggestions: props.placeSuggestions
    }

    // if (this.props.placeSuggestions !== undefined){
    //   this.setState({placeSuggestions: this.props.placeSuggestions})
    // }
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

  handlePlaceChange = (e, { newValue }) => {
    //gets undefined on new name click
    // if (e.target.value !== undefined){
      this.setState({text: newValue})
      this.setState({isPlaceValid: true})
      this.props.placeOnChangeEvent(newValue)
    // }
  }

  onBlur = (e) => {
    if (this.state.text.length == 0 || this.isPlaceValid()){
      this.setState({isPlaceValid: true})
    }else{
      this.setState({isPlaceValid: false})
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.props.getPlacesStartingWith(value)
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
      placeholder: '(home / kitchen / beach / bar / lawn / bus Station / ...)',
      value: this.state.text,
      onChange: this.handlePlaceChange,
    };

    // this.setState({placeSuggestions: this.props.placeSuggestions})

    return (
      <React.Fragment >
        <div id="placeField" className="inlineBlock">
          <Autosuggest
            id="placeSelector"
            suggestions={this.props.placeSuggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            // theme={} // - optional
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
  var s=4;

  return {
    placeSuggestions: state.suggestionsReducer.placeSuggestions,
  };
}

export default connect(mapStateToProps, {getPlacesStartingWith})(PlaceSelector);




//  {/* <input id={this.props.tagID} 
//             value={this.state.text} 
//             onChange={this.handlePlaceChange} 
//             className={isShowError? "searchBarTextSquare errorCss" : "searchBarTextSquare"}
//             placeholder="Place" 
//             type="text" 
//             onBlur={this.onBlur}  />
//           { isShowError ? <div className="errorText">plz fill place (3+ letters)</div> : <div className="invisible"> error </div> } */
//         }