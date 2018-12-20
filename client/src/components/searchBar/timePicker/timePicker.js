import React, { Component } from 'react'
import './timePicker.css'
import '../searchBarCommonStyles.css'
import { search } from 'components/searchBar/searchBarCommon'
import store from 'store'

export default class TimePicker extends Component {
  constructor(props){
    super();

    this.handleOnChange = props.onChangeEvent;  
  }

  placeSelectorKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      search(store);
    }
  }

  render() {
    let selectedValue = 0
    if(!this.props.time === undefined){
      selectedValue = this.props.time
    }

    return (
      <React.Fragment>
        <select id="timeChooser" onChange={this.handleOnChange} onKeyDown={this.placeSelectorKeyUp} className={this.props.cssClass}>
          <option value="999999" className="timeChooserOption"  selected={selectedValue == 0}>Time</option>
          <option value="5" className="timeChooserOption" selected={selectedValue == 5}>5m</option>
          <option value="10" className="timeChooserOption" selected={selectedValue == 10}>10m</option>
          <option value="15" className="timeChooserOption" selected={selectedValue == 15}>15m</option>
          <option value="30" className="timeChooserOption" selected={selectedValue == 30}>30m</option>
          <option value="60" className="timeChooserOption"> selected={selectedValue == 60}1h</option>
          <option value="6000" className="timeChooserOption" selected={selectedValue == 70}>1h+</option>
        </select>
      </React.Fragment>
    )
  }
}
