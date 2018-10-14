import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { USER_PAGE_IDEAS_TYPE } from "reducers/types";

export const LIKED_IDEAS = "LIKED_IDEAS";
export const DONE_IDEAS = "DONE_IDEAS";
export const CREATED_IDEAS = "CREATED_IDEAS";


class UserIdeasDropDown extends Component {
  
  options = [
    { value: LIKED_IDEAS, label: 'Liked' },
    { value: CREATED_IDEAS, label: 'Created' },
    { value: DONE_IDEAS, label: 'Done' }
  ]

  defaultOption = this.options[0]

  onChange = (e) => {
    this.props.dispatch({type: USER_PAGE_IDEAS_TYPE, payload: e.value });
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown className='userIdeasDropDown' options={this.options} onChange={this.onChange} value={this.defaultOption} placeholder="Select an option" />
      </React.Fragment>
    )
  }
}


export default connect()(UserIdeasDropDown)