import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { 
  USER_SET_SELECTED_DROPDOWN_TYPE,
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  SET_USER_CURRENT_PREVIEWED_IDEAS,
  } from "reducers/types";
import { copyUserIdeas } from 'actions/userActions'
import store from 'store'

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

  defaultOption = this.options[0]

  componentDidMount() {
    //for initial state to show 
    this.onChange({value: "USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS", label: "Liked"});
  }

  onChange = (e) => {

    var reduxActionName = e.value;

    //change current previewed ideas to null first.
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEAS, payload: {}});

    this.props.copyUserIdeas(reduxActionName);
    
    store.dispatch({type: USER_SET_SELECTED_DROPDOWN_TYPE, payload: e.label })
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
    userID: state.userPageReducer.loggedInUserID,
  };
}


export default connect(mapStateToProps, {copyUserIdeas})(UserIdeasTypeDropDown)