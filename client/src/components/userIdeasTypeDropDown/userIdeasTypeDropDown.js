import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { USER_PAGE_IDEAS_TYPE,
  USER_SET_LIKED_IDEAS_DATA,
  SET_USER_CREATED_IDEAS,
  USER_SET_SELECTED_DROPDOWN_TYPE,
  } from "reducers/types";
import { updateUserIdeas } from 'actions/userActions'
import store from 'store'

export const LIKED_IDEAS = "LIKED_IDEAS";
export const DONE_IDEAS = "DONE_IDEAS";
export const CREATED_IDEAS = "CREATED_IDEAS";

export const ideasTypeDictionary = {}; // create an empty array
ideasTypeDictionary["Liked"] = "liked";
ideasTypeDictionary["Created"] = "createdBy";

class UserIdeasTypeDropDown extends Component {
  options = [
    { value: USER_SET_LIKED_IDEAS_DATA, label: 'Liked'},
    { value: SET_USER_CREATED_IDEAS, label: 'Created'},
  ]

  defaultOption = this.options[0]

  onChange = (e) => {
    // store.dispatch({type: USER_PAGE_IDEAS_TYPE, payload: e.value });

    //works - puts the ideas into needed place
    var userID = this.props.userID;
    var userIdeasType = ideasTypeDictionary[e.label];
    var reduxActionName = e.value;
    this.props.updateUserIdeas(userID, userIdeasType, reduxActionName);
    store.dispatch({type: USER_SET_SELECTED_DROPDOWN_TYPE, payload: e.label })
    //add ideas to 
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown className='UserIdeasTypeDropDown' options={this.options} onChange={this.onChange} value={this.defaultOption} placeholder="Select an option" />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userReducer.loggedInUserID,
  };
}


export default connect(mapStateToProps, {updateUserIdeas})(UserIdeasTypeDropDown)