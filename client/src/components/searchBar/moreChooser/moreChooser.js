import React, { Component } from 'react'
import './moreChooser.css'
import 'commonCss.css'
import { search } from 'components/searchBar/searchBarCommon'
import {
  SEARCH_SET_MORE, 
  SET_IS_MORE_VALID, 
  SET_IS_CLICKED_SEARCH,
} from 'reducers/types'
import '../searchBarCommonStyles.css'
import { connect } from 'react-redux';

class MoreChooser extends Component {
  constructor(props){
    super(props)

    this.state = {
      isValid: true,
      text: ''
    }
  }

  isMoreValid = () => {
    return this.state.text.length >= 1
  }

  placeSelectorKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }


  
  render() {
    var isShowError = this.props.isClickedSearch && !this.props.isMoreValid

    return (
      <React.Fragment>
        <div id="moreSelector" className="inlineBlock">
          <div className="inlineBlock">
            <input type="text" id="moreChooser" className={this.props.cssClass} 
            placeholder="#MoreInfo" onChange={this.moreOnChangeEvent} value={this.props.more} />
            { isShowError ? <div className="errorText">plz fill More (3+ letters)</div> : <div className="invisible"> error </div> }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedSearch: state.searchBarReducer.isClickedSearch,
    isMoreValid: state.searchBarReducer.isMoreValid,
  };
}

export default connect(mapStateToProps)(MoreChooser);
