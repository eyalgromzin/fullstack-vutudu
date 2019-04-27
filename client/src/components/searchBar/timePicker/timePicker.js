import React, { Component } from 'react'
import './timePicker.css'
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
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
        <div className="inlineBlock">
          <select id="timeChooser" value={selectedValue} onChange={this.props.onChangeEvent} onKeyDown={this.placeSelectorKeyUp} className={this.props.cssClass}>
            {/* <option value="0" className="timeChooserOption">Time</option> */}
            <option value="5" className="timeChooserOption">5 minutes</option>
            <option value="10" className="timeChooserOption">10 minutes</option>
            <option value="15" className="timeChooserOption">15 minutes</option>
            <option value="30" className="timeChooserOption">30 minutes</option>
            <option value="60" className="timeChooserOption"> 1 hour</option>
            <option value="6000" className="timeChooserOption">1 hour+</option>
          </select>
          <div className="invisible">error</div>
        </div>
      </React.Fragment>
    )
  }
}
