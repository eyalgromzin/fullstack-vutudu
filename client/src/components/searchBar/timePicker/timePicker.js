import React, { Component } from 'react'
import './timePicker.css'
import '../searchBarCommonStyles.css'
// import {EDITED_IDEA_SET_TIME} from 'reducers/types'
// import { SEARCH_SET_TIME } from 'reducers/types';

export default class TimePicker extends Component {
  constructor(props){
    super();

    this.handleOnChange = props.onChangeEvent;  
  }

  render() {
    return (
      <React.Fragment>
        <select id="timeChooser" onChange={this.handleOnChange} className={this.props.cssClass}>
          <option value="5" class="timeChooserOption">5m</option>
          <option value="10" class="timeChooserOption">10m</option>
          <option value="15" class="timeChooserOption">15m</option>
          <option value="30" class="timeChooserOption">30m</option>
          <option value="60" class="timeChooserOption">1h</option>
          <option value="6000" class="timeChooserOption">1h+</option>
        </select>
      </React.Fragment>
    )
  }
}
