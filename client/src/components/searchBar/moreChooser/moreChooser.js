import React, { Component } from 'react'
import './moreChooser.css'
import 'commonCss.css'
import { search } from '../searchBarCommon'
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



  placeFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }


  
  render() {
    //in case the more field is less than 2 letters
    var isShowError = this.props.isClickedButton && !this.props.isMoreValid

    return (
      <React.Fragment>
        <div id="moreSelector" className="inlineBlock">
          <div className="inlineBlock">
            <input type="text" id="moreChooser" className="searchBarTextSquare" 
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
    isMoreValid: state.searchBarReducer.isMoreValid,
  };
}

export default connect(mapStateToProps)(MoreChooser);
