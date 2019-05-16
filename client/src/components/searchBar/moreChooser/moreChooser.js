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
      text: moreText,
      tagSuggestions: []
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.tagSuggestions != this.state.tagSuggestions){
      this.setState({tagSuggestions: this.props.tagSuggestions})
      return true
    }

    if(nextState.text != this.state.text){
      return true
    }

    return false
  }  

  shouldRenderSuggestions = () => {
    return true;
  }

  isMoreValid = () => {
    return this.state.placeText.length >= 2
  }
  
  moreFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  handleChange = (e, { newValue }) => {
    this.setState({text: newValue})
    this.setState({isValid: true})
    this.props.onChangeEvent(newValue)
  }

  onBlur = (e) => {
    if (this.state.text.length == 0 || this.isMoreValid()){
      this.setState({isValid: true})
    }else{
      this.setState({isValid: false})
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

      this.setState({tagSuggestions: moreFieldExamples})
      store.dispatch({type: SET_TAG_SUGGESTIONS, payload: moreFieldExamples})
    }else{
      this.props.getTagsStartingWith(value)
    }
  } 

  onSuggestionsClearRequested = () => {
    this.setState({tagSuggestions: []})
  }

  getSuggestionValue = (suggestion) => {
    return suggestion 
  }


  
  
  render() {
    const inputProps = {
      placeholder: '#easy / #fun / #productive ...',
      value: this.state.text,
      onChange: this.handleChange,
    };

    return (
      <React.Fragment>
        <div id="moreField" className="inlineBlock searchBarTextField">
          <div className="fieldHeader">More</div>
            <Autosuggest
              id="tagSelector"
              suggestions={this.state.tagSuggestions}
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