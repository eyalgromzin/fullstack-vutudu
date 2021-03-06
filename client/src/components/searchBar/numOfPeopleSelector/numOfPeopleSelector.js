import React, { Component } from 'react'
import './numOfPeopleSelector.css'
import '../searchBarCommonStyles.css'
import {SEARCH_SET_NUM_OF_PEOPLE} from 'reducers/types'
import { connect } from 'react-redux';
import { search } from '../searchBarCommon'
import store from 'store'
import 'commonCss.css'

export default class NumOfPeopleSelector extends Component {
  constructor(props){
    super(props);

    var numOfPeople = this.props.numOfPeople === undefined? 0 : this.props.numOfPeople
    
    this.state = {
      numOfPeople: Number(numOfPeople)
    }
  }

  handleChange = (e) => {
    this.setState({numOfPeople: Number(e.target.value)})
    store.dispatch({ type: SEARCH_SET_NUM_OF_PEOPLE, payload: e.target.value });
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      // search(store);
    }
  }

  // getSnapshotBeforeUpdate(){
	// 	var numOfPeople = this.props.numOfPeople === undefined ? 2 : this.props.numOfPeople;
	// 	if(this.state.numOfPeople != numOfPeople){
	// 		this.setState({ numOfPeople: Number(numOfPeople) });
  //   }
    
  //   return null
  // }
  
  componentDidUpdate(){

  }

  clear = () => {
		this.setState({numOfPeople: 0})
	}

  //<img src={require("images/heads_black.png")}  alt="" className="searchBarIcon" />
  render() {
    return (
      <React.Fragment>
        <div id="numOfPeopleSelector" className="inlineBlock searchBarComboBox">
          <select id="numOfPeopleChooser" 
            className={this.props.cssClass} 
            value={this.state.numOfPeople}
            onKeyUp={this.onKeyUp} onChange={this.handleChange}>
            <option value="10" className="timeChooserOption">People</option>
            <option value="10" className="timeChooserOption">1</option>
            <option value="20" className="timeChooserOption">2</option>
            <option value="2" className="timeChooserOption">Couple</option>
            <option value="30" className="timeChooserOption">3</option>
            <option value="40" className="timeChooserOption">4</option>
            <option value="50" className="timeChooserOption">5</option>
            <option value="60" className="timeChooserOption">6</option>
            <option value="70" className="timeChooserOption">7</option>
            <option value="8000" className="timeChooserOption">7+</option>
            <option value="9000" className="timeChooserOption" >Any</option>
          </select>
          <div className="invisible">error</div>
        </div>
      </React.Fragment>
    )
  }
}

