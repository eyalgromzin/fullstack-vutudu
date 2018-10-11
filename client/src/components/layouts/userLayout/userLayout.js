import React, { Component } from 'react'
import './userLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import userIdeasDropDown from 'components'

class userLayout extends Component {
    constructor(){
        super();
    }

  render() {
    return (
      <React.Fragment>
        <span class="layoutTitle"> {this.props.firstName + " " + this.props.lastName} </span>
        
        <div id="userLikedIdeas">
          <userIdeasDropDown />    
        </div>
      </React.Fragment>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.userReducer.loggedInUserFirstName,
    lastName: state.userReducer.loggedInUserLastName,
  };
}

export default connect(mapStateToProps)(userLayout)
