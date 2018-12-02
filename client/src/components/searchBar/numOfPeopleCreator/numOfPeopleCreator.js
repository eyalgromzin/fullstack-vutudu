import React, { Component } from 'react'
import '../searchBarCommonStyles.css'
import 'commonCss.css'
import './numOfPeopleCreator.css'
import { connect } from 'react-redux';
import { EDITED_IDEA_SET_MIN_PEOPLE, EDITED_IDEA_SET_MAX_PEOPLE } from 'reducers/types'

class NumOfPeopleCreator extends Component {
  minNumOfPeopleChange = (event) => {
    this.props.dispatch({ type: EDITED_IDEA_SET_MIN_PEOPLE, payload: Number(event.target.value) }); //Number()
  }

  maxNumOfPeopleChange = (event) => {
    this.props.dispatch({ type: EDITED_IDEA_SET_MAX_PEOPLE, payload: Number(event.target.value) });
  }

  render() {
    return (
      <div className="searchBarChooserContainer middleSearchBarBox" > 
        <div id="createBarNumOfPeopleCreator">
            <select id="minNumOfPeopleChooser" className="numOfPeopleCreatorDropDown" onChange={this.minNumOfPeopleChange}>
              <option value="9999999" className="timeChooserOption" >Min # of ppl</option>
              <option value="0" className="timeChooserOption" >0</option>
              <option value="1" className="timeChooserOption" >1</option>
              <option value="2" className="timeChooserOption" >2</option>
              <option value="20000" className="timeChooserOption">couple</option>
              <option value="3" className="timeChooserOption" >3</option>
              <option value="4" className="timeChooserOption" >4</option>
              <option value="5" className="timeChooserOption" >5</option>
              <option value="6" className="timeChooserOption" >6</option>
              <option value="7" className="timeChooserOption" >7</option>
              <option value="8000" className="timeChooserOption" >7+</option>
            </select>
            <span className="createBarMiddlePlaceHolder"> - </span>
            <select id="maxNumOfPeopleChooser" className="numOfPeopleCreatorDropDown" onChange={this.maxNumOfPeopleChange}>
              <option value="9999999" className="timeChooserOption">Max # of ppl</option>
              <option value="0" className="timeChooserOption">0</option>
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
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    minNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,
  };
}

export default connect()(NumOfPeopleCreator); //mapStateToProps