import React, { Component } from 'react'
import './userLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import ShowIdeaCardInUser from 'components/ideaCard/showIdeaCardInUser'
import {getLikedIdeas} from 'actions/userActions'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import EditCardInUser from 'components/ideaCard/editCardInUser';

class userLayout extends Component {
  constructor(){
      super();
  }

  componentDidMount(){
    var userID = this.props.userID;
    this.props.getLikedIdeas({userID});
  }

  render() {
    return (
      <React.Fragment>
        {/* <span class="layoutTitle"> {this.props.firstName + " " + this.props.lastName} </span> */}

        <div id="userLayoutIdeasSelectSideBar" class="userLayoutMainContent">
          <div id="UserIdeasTypeDropDown">
            <UserIdeasTypeDropDown />    
          </div>
          <div id="userIdeasList">
            <UserIdeasList />
          </div>
        </div>
        <div id="userLayoutIdeaPreview">
          { this.props.isIdeaEdited? 
            <EditCardInUser />
            :
            <ShowIdeaCardInUser />
            
          }
          
        </div>
      </React.Fragment>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.userReducer.loggedInUserFirstName,
    lastName: state.userReducer.loggedInUserLastName,
    userID: state.userReducer.loggedInUserID,
    isIdeaEdited: state.userReducer.isIdeaEdited,
  };
}

export default connect(mapStateToProps, {getLikedIdeas})(userLayout)
