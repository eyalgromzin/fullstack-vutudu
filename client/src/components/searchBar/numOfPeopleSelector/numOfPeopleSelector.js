import React, { Component } from 'react'
import './numOfPeopleSelector.css'
import '../searchBarCommonStyles.css'
import {SEARCH_SET_NUM_OF_PEOPLE} from 'reducers/types'
import { connect } from 'react-redux';

class NumOfPeopleSelector extends Component {
  constructor(){
    super();
  }

  handleChange = (event) => {
    this.props.dispatch({ type: SEARCH_SET_NUM_OF_PEOPLE, payload: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
            <select id="numOfPeopleChooser" className={this.props.cssClass} onChange={this.handleChange}>
              <option value="1" class="timeChooserOption">1</option>
              <option value="2" class="timeChooserOption">2</option>
              <option value="2000" class="timeChooserOption">couple</option>
              <option value="3" class="timeChooserOption">3</option>
              <option value="4" class="timeChooserOption">4</option>
              <option value="5" class="timeChooserOption">5</option>
              <option value="6" class="timeChooserOption">6</option>
              <option value="7" class="timeChooserOption">7</option>
              <option value="8000" class="timeChooserOption">7+</option>
            </select>
      </React.Fragment>
    )
  }
}

export default connect()(NumOfPeopleSelector);
