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
      <div class="searchBarChooserContainer" > 
        <div class="searchBarChooserData">
          <img src={require("images/people.png")} class="searchBarIcon" />
            <select id="minNumOfPeopleChooser" class="" onChange={this.minNumOfPeopleChange}>
              <option value="0" class="timeChooserOption" >0</option>
              <option value="1" class="timeChooserOption" >1</option>
              <option value="2" class="timeChooserOption" >2</option>
              <option value="2000" class="timeChooserOption">couple</option>
              <option value="3" class="timeChooserOption" >3</option>
              <option value="4" class="timeChooserOption" >4</option>
              <option value="5" class="timeChooserOption" >5</option>
              <option value="6" class="timeChooserOption" >6</option>
              <option value="7" class="timeChooserOption" >7</option>
              <option value="8000" class="timeChooserOption" >7+</option>
            </select>
            <span> - </span>
            <select id="maxNumOfPeopleChooser" class="" onChange={this.maxNumOfPeopleChange}>
              <option value="0" class="timeChooserOption">0</option>
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