import React, { Component } from 'react'
import '../searchBarCommonStyles.css'
import 'commonCss.css'
import './numOfPeopleCreator.css'
import { connect } from 'react-redux';
import { 
  CREATE_IDEA_SET_MIN_PEOPLE, 
  CREATE_IDEA_SET_MAX_PEOPLE 
} from 'reducers/types'

class NumOfPeopleCreator extends Component {
  minNumOfPeopleChange = (event) => {
    this.props.dispatch({ type: CREATE_IDEA_SET_MIN_PEOPLE, payload: Number(event.target.value) }); 
  }

  maxNumOfPeopleChange = (event) => {
    this.props.dispatch({ type: CREATE_IDEA_SET_MAX_PEOPLE, payload: Number(event.target.value) });
  }

  render() {
    return (
      <React.Fragment>
        <div id="numOfPeopleCreator"> 
          <div className="fieldHeader">People</div>
          <div id="createBarNumOfPeopleCreator">
            <select id="minNumOfPeopleCreator" value={this.props.minNumOfPeople} 
              className="numOfPeopleCreatorDropDown createBarCommon" onChange={this.minNumOfPeopleChange}>
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

            <span className="createBarMiddlePlaceHolder">-</span>
            
            <select id="maxNumOfPeopleCreator" value={this.props.maxNumOfPeople} 
              className="numOfPeopleCreatorDropDown" onChange={this.maxNumOfPeopleChange}>
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
          </div>  
          <div className="invisible"> dummy error </div>
        </div>
        
      </React.Fragment>
    )
  }
}

export default connect()(NumOfPeopleCreator); //mapStateToProps