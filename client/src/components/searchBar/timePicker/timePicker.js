import React, { Component } from 'react'
import './timePicker.css'
import '../searchBarCommonStyles.css'
import { search } from '../searchBarCommon'
import store from 'store'
import 'commonCss.css'

export default class TimePicker extends Component {
  render() {
    let selectedValue = 0
    if(!(this.props.time === undefined)){
      selectedValue = this.props.time
    }

    return (
      <React.Fragment>
        <div id="timePickerField" className="inlineBlock">
          <div class="fieldHeader">Time</div>
          <select id="timeChooser" value={selectedValue} onChange={this.props.onChangeEvent} onKeyDown={this.placeFieldKeyUp} className={this.props.cssClass}>
            <option value="5" className="timeChooserOption">5 min</option>
            <option value="10" className="timeChooserOption">10 min</option>
            <option value="15" className="timeChooserOption">15 min</option>
            <option value="30" className="timeChooserOption">30 min</option>
            <option value="60" className="timeChooserOption"> 1 hour</option>
            <option value="6000" className="timeChooserOption">1 hour+</option>
          </select>
          <div className="invisible">error</div>
        </div>
      </React.Fragment>
    )
  }
}
