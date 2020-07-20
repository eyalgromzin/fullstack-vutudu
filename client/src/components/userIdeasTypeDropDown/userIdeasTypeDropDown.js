import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { 
  USER_SET_SELECTED_DROPDOWN_TYPE,
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  } from "reducers/types";
import { copyUserIdeas } from 'actions/userActions'
import store from 'store'
import './userIdeasTypeDropDown.css'

export const LIKED_IDEAS = "LIKED_IDEAS";
export const DONE_IDEAS = "DONE_IDEAS";
export const CREATED_IDEAS = "CREATED_IDEAS";

export const ideasTypeDictionary = {}; // create an empty array
ideasTypeDictionary["Liked"] = "liked";
ideasTypeDictionary["Created"] = "createdBy";

class UserIdeasTypeDropDown extends Component {
 
  options = [
    { value: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS, type: 'liked', label: 'Liked'},
    { value: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS, type: 'created', label: 'Created'},
  ]

  componentDidMount() {
    //for initial state to show 
    this.onChange({value: "USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS", label: "Liked"});
  }

  onChange = (e) => {
    if(e.label == "Created"){
      store.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS })
    }else if(e.label == "Liked"){
      store.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS })
    }

    store.dispatch({type: USER_SET_SELECTED_DROPDOWN_TYPE, payload: e.label })
  }

  render() {
    return (
      <div className="uderIdeasTypeDropDownContainer">
        <Dropdown className='UserIdeasTypeDropDown' options={this.options} onChange={this.onChange} value={this.options[0]} placeholder="Select an option" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
  };
}


export default connect(mapStateToProps, {copyUserIdeas})(UserIdeasTypeDropDown)