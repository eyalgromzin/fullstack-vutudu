import React, { Component } from 'react'
import { connect } from 'react-redux';
import './ideaCard.css'
import {SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT} from 'reducers/types'
import { updateIdea } from 'actions/userActions'
import store from 'store';


class SaveIdeaButton extends Component {
  saveIdea = () => {
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});
    this.props.updateIdea(this.props.currentPreviewedIdea._id,
      this.props.newTitle,
      this.props.newContent);
    // store.dispatch({type: UPDATE_CREATED_IDEAS_IDEA, payload: false});
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
  };
}

export default connect(mapStateToProps, {updateIdea} )(SaveIdeaButton)