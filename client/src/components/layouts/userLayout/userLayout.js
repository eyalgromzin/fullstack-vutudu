import React, { Component } from 'react'
import './userLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import ShowIdeaCardInUser from 'components/ideaCard/showIdeaCardInUser'
// import {getLikedIdeas} from 'actions/userActions'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import EditCardInUser from 'components/ideaCard/editCardInUser';
import { 
  USER_SET_SELECTED_DROPDOWN_TYPE,
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  SET_USER_CURRENT_PREVIEWED_IDEAS,
  } from "reducers/types";

class userLayout extends Component {
  constructor(props){
    super(props);

    this.props.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS});
  }

  render() {
    return (
      <React.Fragment>
        <div id="userLayout" >
          <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
            <div id="UserIdeasTypeDropDown">
              <UserIdeasTypeDropDown />    
            </div>
            {this.props.currentPreviewedIdeas.length > 0 ? 
              <div id="userIdeasList">
                <UserIdeasList ideas={this.props.currentPreviewedIdeas} updateViewToggle={this.props.updateToggle} />
              </div>
              :
              "Empty"
            }
          </div>
          <div id="userIdeaPreviewSide" >
            <div id="userLayoutIdeaPreview">
              { this.props.isIdeaEdited? 
                <EditCardInUser />
                :
                <ShowIdeaCardInUser enabled={false}/>
                
              }
              
            </div>
          </div>
        </div>
      </React.Fragment>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.userPageReducer.loggedInUserFirstName,
    lastName: state.userPageReducer.loggedInUserLastName,
    userID: state.userPageReducer.loggedInUserID,
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
    updateToggle: state.userPageReducer.updateToggle,
  };
}

export default connect(mapStateToProps)(userLayout) //getLikedIdeas
