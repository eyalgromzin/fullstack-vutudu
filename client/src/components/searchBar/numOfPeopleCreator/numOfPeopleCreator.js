import React, { Component } from 'react'
import '../searchBarCommonStyles.css'
import 'commonCss.css'
import './numOfPeopleCreator.css'
import { connect } from 'react-redux';
import { NEW_IDEA_SET_MIN_PEOPLE, NEW_IDEA_SET_MAX_PEOPLE } from 'reducers/types'

class NumOfPeopleCreator extends Component {

  constructor(props){
    super(props);

    this.minNumOfPeopleChange = this.minNumOfPeopleChange.bind(this);
    this.maxNumOfPeopleChange = this.maxNumOfPeopleChange.bind(this);
  }

  minNumOfPeopleChange(event){
    this.props.dispatch({ type: NEW_IDEA_SET_MIN_PEOPLE, payload: event.target.value });
  }

  maxNumOfPeopleChange(event){
    this.props.dispatch({ type: NEW_IDEA_SET_MAX_PEOPLE, payload: event.target.value });
  }

  render() {
    return (
      <div class="searchBarChooserContainer" > 
        <div class="searchBarChooserData">
          <img src={require("images/people.png")} class="searchBarIcon " />
            <select id="numOfPeopleChooser" class="" onChange={this.minNumOfPeopleChange}>
              <option value="1" class="timeChooserOption">1</option>
              <option value="2" class="timeChooserOption" selected="selected">2</option>
              <option value="3" class="timeChooserOption">3</option>
              <option value="4" class="timeChooserOption">4</option>
              <option value="5" class="timeChooserOption">5</option>
              <option value="6" class="timeChooserOption">6</option>
              <option value="7" class="timeChooserOption">7</option>
              <option value="7+" class="timeChooserOption">7+</option>
            </select>
            <span> - </span>
            <select id="numOfPeopleChooser" class="" onChange={this.maxNumOfPeopleChange}>
              <option value="1" class="timeChooserOption">1</option>
              <option value="2" class="timeChooserOption">2</option>
              <option value="3" class="timeChooserOption">3</option>
              <option value="4" class="timeChooserOption" selected="selected">4</option>
              <option value="5" class="timeChooserOption">5</option>
              <option value="6" class="timeChooserOption">6</option>
              <option value="7" class="timeChooserOption">7</option>
              <option value="7+" class="timeChooserOption">7+</option>
            </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newIdea: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].likes,
  };
}

export default connect(mapStateToProps)(NumOfPeopleCreator);