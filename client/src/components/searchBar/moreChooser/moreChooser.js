import React, { Component } from 'react'
import './moreChooser.css'
import 'commonCss.css'
import { search } from '../searchBarCommon'
import {
  SET_TAG_SUGGESTIONS,
} from 'reducers/types'
import '../searchBarCommonStyles.css'
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { getTagsStartingWith } from 'actions/autoSuggestActions'
import store from 'store'


class MoreChooser extends Component {
  constructor(props){
    super(props)

    var moreText = this.props.more === undefined? '' : this.props.more

    this.state = {
      isValid: true,
      text: moreText
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.more != this.state.text){
      this.setState({text: this.props.more})
      return true
    }
    return false
  }  

  placeFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );

  onSuggestionsFetchRequested = ({value}) => {
    if (value == ""){
      const moreFieldExamples = [ 'fun','productive', 'easy', 'fast', 'challenging', '...']

      store.dispatch({type: SET_TAG_SUGGESTIONS, payload: moreFieldExamples})
    }else{
      this.props.getTagsStartingWith(value)
    }
  } 

  onSuggestionsClearRequested = () => {
    this.setState({tagSuggestions:[]})
  }

  getSuggestionValue = (suggestion) => {
    return suggestion 
  }

  handleChange = (e, { newValue }) => {
    this.setState({text: newValue})
    this.setState({isPlaceValid: true})
    this.props.onChangeEvent(newValue)
  }

  shouldRenderSuggestions = () => {
    return true;
  }
  
  render() {
    const inputProps = {
      placeholder: '#easy / #fun / #productive ...',
      value: this.state.text,
      onChange: this.handleChange,
    };

    return (
      <React.Fragment>
        <div id="placeField" className="inlineBlock">
          <div className="fieldHeader">More</div>
            <Autosuggest
              id="tagSelector"
              suggestions={this.props.tagSuggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              shouldRenderSuggestions={this.shouldRenderSuggestions}
              inputProps={inputProps}
              onChange={this.handleChange} 
            />
          <div className="invisible"> error </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isMoreValid: state.searchBarReducer.isMoreValid,
    tagSuggestions: state.suggestionsReducer.tagSuggestions,
  };
}

export default connect(mapStateToProps,{getTagsStartingWith})(MoreChooser);