import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './ideaCard.css'
import {
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  CHANGE_UPDATE_TOGGLE,
  EDITED_IDEA_SET_ID ,
  EDITED_IDEA_SET_TITLE,
  EDITED_IDEA_SET_CONTENT
} from 'reducers/types'
import { updateIdea } from 'actions/userActions'
import store from 'store';

class UserSaveIdeaButton extends Component {
  
constructor(props){
  super();

  const { dispatch } = props
  bindActionCreators(updateIdea, dispatch)
}

  saveIdea = () => {
    //to update the list

    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});
    this.props.dispatch({type: EDITED_IDEA_SET_ID, payload: this.props.currentPreviewedIdea._id});
    this.props.dispatch({type: EDITED_IDEA_SET_TITLE, payload: this.props.currentPreviewedIdea.title});
    this.props.dispatch({type: EDITED_IDEA_SET_CONTENT, payload: this.props.currentPreviewedIdea.content});

    store.dispatch({type: CHANGE_UPDATE_TOGGLE});

    this.props.updateIdea1(
      this.props.currentPreviewedIdea._id,
      this.props.newTitle,
      this.props.newContent,
      this.props.newTags);
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

function mapDispatchToProps(dispatch) {
  return({
    updateIdea1: bindActionCreators (updateIdea, dispatch),
    dispatch
  })
}

function mapStateToProps(state) {
  return {
    // currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
    newTitle: state.editedIdeaReducer.title,
    newContent: state.editedIdeaReducer.content,
    newTags: state.editedIdeaReducer.tags,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdeas
                          .filter (idea => {return state.editedIdeaReducer.id == idea._id})[0],
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
    userID: state.userPageReducer.loggedInUserID,
    updateToggle: state.userPageReducer.updateToggle,

  };
}

export default connect(mapStateToProps,mapDispatchToProps )(UserSaveIdeaButton) //updateUserIdeas