import React, { Component } from 'react'
import './numOfPeopleSelector.css'
import '../searchBarCommonStyles.css'
import {SEARCH_SET_NUM_OF_PEOPLE} from 'reducers/types'
import { connect } from 'react-redux';
import { search } from '../searchBarCommon'
import store from 'store'
import 'commonCss.css'
import '../searchBarCommonStyles.css'

class NumOfPeopleSelector extends Component {
  constructor(props){
    super(props);

    var numOfPeople = this.props.numOfPeople === undefined? 2 : this.props.numOfPeople
    
    this.state = {
      numOfPeople: Number(numOfPeople)
    }
  }

  handleChange = (e) => {
    this.setState({numOfPeople: e.target.value})
    this.props.dispatch({ type: SEARCH_SET_NUM_OF_PEOPLE, payload: e.target.value });
  }

  placeFieldKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      console.log("enter clicked on place input")
      search(store);
    }
  }

  getSnapshotBeforeUpdate(){
		var numOfPeople = this.props.numOfPeople === undefined ? 2 : this.props.numOfPeople;
		if(this.state.numOfPeople != numOfPeople){
			this.setState({ numOfPeople: Number(numOfPeople) });
    }
    
    return null
  }
  
  componentDidUpdate(){

  }

  render() {
    return (
      <React.Fragment>
        <div id="numOfPeopleSelector" className="inlineBlock">
          <div className="fieldHeader"># People</div>
          <select id="numOfPeopleChooser" className={this.props.cssClass} value={this.state.numOfPeople}
            onKeyUp={this.placeFieldKeyUp} onChange={this.handleChange}>
            <option value="1" className="timeChooserOption">1</option>
            <option value="2" className="timeChooserOption">2</option>
            <option value="20000" className="timeChooserOption">couple</option>
            <option value="3" className="timeChooserOption">3</option>
            <option value="4" className="timeChooserOption">4</option>
            <option value="5" className="timeChooserOption">5</option>
            <option value="6" className="timeChooserOption">6</option>
            <option value="7" className="timeChooserOption">7</option>
            <option value="8000" className="timeChooserOption">7+</option>
          </select>
          <div className="invisible">error</div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect()(NumOfPeopleSelector);
