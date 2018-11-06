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
  ideasList = () => 
    this.setState({refreshShoeList: !this.state.refreshShoeList})

  render() {
    return (
      <React.Fragment>
        {/* <span class="layoutTitle"> {this.props.firstName + " " + this.props.lastName} </span> */}
        <div id="userLayout" >
          <div id="userLayoutIdeasSelectSideBar" class="userLayoutMainContent">
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
                <ShowIdeaCardInUser />
                
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

export default connect(mapStateToProps, {getLikedIdeas})(userLayout)
