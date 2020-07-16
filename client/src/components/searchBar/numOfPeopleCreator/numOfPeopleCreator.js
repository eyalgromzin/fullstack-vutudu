import React, { Component, createRef } from 'react'
import '../searchBarCommonStyles.css'
import 'commonCss.css'
import './numOfPeopleCreator.css'
import { connect } from 'react-redux';
import { 
  EDITABLE_IDEA_SET_MIN_PEOPLE, 
  EDITABLE_IDEA_SET_MAX_PEOPLE 
} from 'reducers/types'
import store from 'store';

export default class NumOfPeopleCreator extends Component {
  constructor(props){
    super(props)

    this.validate = this.validate.bind(this)
    this.setMinNumOfPeople = this.setMinNumOfPeople.bind(this)

    this.state = {
      minNumOfPeople: 10,
      maxNumOfPeople: 10,
      isValid: true,      
    }
  }

  validate = () => {
		if(this.state.minNumOfPeople > this.state.maxNumOfPeople){
      this.setState({isValid: false})
      return false
    }

    this.setState({isValid: true})
    return true
  }

  clearSelection = () => {
    this.setState({
      minNumOfPeople: 10,
      maxNumOfPeople: 10
    })
  }

  minNumOfPeopleChange = (e) => {
    let value = parseInt(e.target.value)
    store.dispatch({ type: EDITABLE_IDEA_SET_MIN_PEOPLE, payload: value }); 
    this.setState({minNumOfPeople: value})

    if(this.props.onMinNumOfPeopleChange !== undefined)
      this.props.onMinNumOfPeopleChange();
  }

  maxNumOfPeopleChange = (e) => {
    let value = parseInt(e.target.value)
    store.dispatch({ type: EDITABLE_IDEA_SET_MAX_PEOPLE, payload: value });
    this.setState({maxNumOfPeople: value})  
    
    if(value < this.state.minNumOfPeople){
      this.setState({isValid: false})  
    }
    
    if(this.props.onMaxNumOfPeopleChange !== undefined)
      this.props.onMaxNumOfPeopleChange();
  }
  
  setMinNumOfPeople = (numOfPeople) => {
    this.setState({minNumOfPeople: numOfPeople})
    store.dispatch({ type: EDITABLE_IDEA_SET_MIN_PEOPLE, payload: numOfPeople });
  }

  setMaxNumOfPeople = (numOfPeople) => {
    this.setState({maxNumOfPeople: numOfPeople})
    store.dispatch({ type: EDITABLE_IDEA_SET_MAX_PEOPLE, payload: numOfPeople });
  }

  
  
  clear = () => {
		this.setState({minNumOfPeople: 10,
            maxNumOfPeople: 10,
					}) 
    }

  render() {
    return (
      <React.Fragment>
        <div id="numOfPeopleCreator" className={this.props.fieldClass}> 
          <div id="createBarNumOfPeopleCreator">
            <select id="minNumOfPeopleCreator"
              value={this.state.minNumOfPeople} 
              className={this.state.isValid? "numOfPeopleCreatorDropDown" :
                "numOfPeopleCreatorDropDown errorBackground"}
              onChange={this.minNumOfPeopleChange}>
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

            <span className="createBarMiddlePlaceHolder">- </span>
            
            <select 
              id="maxNumOfPeopleCreator" 
              value={this.state.maxNumOfPeople} 
              className={this.state.isValid? "numOfPeopleCreatorDropDown" :
                "numOfPeopleCreatorDropDown errorBackground"}
              onChange={this.maxNumOfPeopleChange}>
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
        </div>
        
      </React.Fragment>
    )
  }
}

// export default connect(null, null, null, { withRef: true })(NumOfPeopleCreator); //mapStateToProps
// export default connect()(NumOfPeopleCreator);