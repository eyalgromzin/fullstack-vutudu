import React, { Component } from 'react'
import './userPageLayout.css'
import { connect } from 'react-redux';
import 'commonCss.css'
import UserIdeasTypeDropDown from 'components/userIdeasTypeDropDown/userIdeasTypeDropDown'
import UserIdeasList from 'components/userIdeasList/userIdeasList'
import IdeaCardInUser from 'components/ideaCard/ideaCardInUser'
import EditCardInUser from 'components/ideaCard/editIdeaInUser';
import { 
  USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
  USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
  } from "reducers/types";

class userPageLayout extends Component {
  constructor(props){
    super(props);

    this.props.dispatch({type: USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS});
    this.props.dispatch({type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS});
  }

  render() {
    return (
      <React.Fragment>
        <div id="userLayout" >
          <div class="pageName">User Data</div>
          <div id="userLayoutIdeasSelectSideBar" className="userLayoutMainContent">
            <div id="UserIdeasTypeDropDown">
              <UserIdeasTypeDropDown />    
            </div>
            {this.props.currentPreviewedIdeas.length > 0 ? 
              <div id="userIdeasList">
                <UserIdeasList ideas={this.props.currentPreviewedIdeas} updateViewToggle={this.props.updateToggle} />
              </div>
              :
              "Empty Ideas List"
            }
          </div>
          <div id="userIdeaPreviewSide" >
            <div id="userLayoutIdeaPreview">
              { this.props.isIdeaEdited? 
                <EditCardInUser />
                :
                <IdeaCardInUser enabled={false} showNextPreviousButtons={true}/>
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

export default connect(mapStateToProps)(userPageLayout) //getLikedIdeas
