import React, { Component } from 'react'
import { connect } from 'react-redux';
import './ideaCard.css'
import {SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT} from 'reducers/types'
import { updateIdea } from 'actions/userActions'
import store from 'store';
import { updateUserIdeas } from 'actions/userActions'


class SaveIdeaButton extends Component {
  saveIdea = () => {
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});
    this.props.updateIdea(this.props.currentPreviewedIdea._id,
      this.props.newTitle,
      this.props.newContent);
    // store.dispatch({type: UPDATE_CREATED_IDEAS_IDEA, payload: false});
    
    // this.props.updateUserIdeas(this.props.userID,);
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.isIdeaEdited ?
          <img src={require("images/save.png")} id="saveIdeaButton" 
          onClick={() => {
              this.saveIdea()
            }} />  
            : 
            <React.Fragment />
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    // currentPreviewedIdeaType: state.userReducer.selectedDropDownType,
    newTitle: state.editedIdeaReducer.title,
    newContent: state.editedIdeaReducer.content,
    currentPreviewedIdea: state.userReducer.currentPreviewedIdea,
    isIdeaEdited: state.userReducer.isIdeaEdited,
    userID: state.userReducer.loggedInUserID,
  };
}

export default connect(mapStateToProps, {updateIdea,updateUserIdeas} )(SaveIdeaButton)