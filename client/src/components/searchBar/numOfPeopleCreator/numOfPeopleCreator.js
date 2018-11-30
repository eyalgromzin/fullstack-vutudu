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
      <div class="searchBarChooserContainer middleSearchBarBox" > 
        <div id="createBarNumOfPeopleCreator">
            <select id="minNumOfPeopleChooser" class="numOfPeopleCreatorDropDown" onChange={this.minNumOfPeopleChange}>
              <option value="9999999" class="timeChooserOption" >Min # of ppl</option>
              <option value="0" class="timeChooserOption" >0</option>
              <option value="1" class="timeChooserOption" >1</option>
              <option value="2" class="timeChooserOption" >2</option>
              <option value="20000" class="timeChooserOption">couple</option>
              <option value="3" class="timeChooserOption" >3</option>
              <option value="4" class="timeChooserOption" >4</option>
              <option value="5" class="timeChooserOption" >5</option>
              <option value="6" class="timeChooserOption" >6</option>
              <option value="7" class="timeChooserOption" >7</option>
              <option value="8000" class="timeChooserOption" >7+</option>
            </select>
            <span class="createBarMiddlePlaceHolder"> - </span>
            <select id="maxNumOfPeopleChooser" class="numOfPeopleCreatorDropDown" onChange={this.maxNumOfPeopleChange}>
              <option value="9999999" class="timeChooserOption">Max # of ppl</option>
              <option value="0" class="timeChooserOption">0</option>
              <option value="1" class="timeChooserOption">1</option>
              <option value="2" class="timeChooserOption">2</option>
              <option value="20000" class="timeChooserOption">couple</option>
              <option value="3" class="timeChooserOption">3</option>
              <option value="4" class="timeChooserOption">4</option>
              <option value="5" class="timeChooserOption">5</option>
              <option value="6" class="timeChooserOption">6</option>
              <option value="7" class="timeChooserOption">7</option>
              <option value="8000" class="timeChooserOption">7+</option>
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