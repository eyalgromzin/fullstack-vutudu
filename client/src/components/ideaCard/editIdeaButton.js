import React, { Component } from 'react'
import { SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT } from 'reducers/types'
import { connect } from 'react-redux';

class EditIdeaButton extends Component {
    editIdea = () => {
      //make the fields to text boxes to edit the fields
      this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: true});
    }

  render() {
    return (
      <React.Fragment>
        { this.props.currentPreviewedIdeaType == "Created" && this.props.currentPreviewedIdea != null 
            && !this.props.isIdeaEdited ? 
          <img src={require("images/edit.png")} id="editIdeaButton" 
          onClick={() => {
              this.editIdea()
            }}  />  
          : 
          <React.Fragment />
        }
      </ React.Fragment>
    )
  }
}

function mapStateToProps(state) {
    return {
      currentPreviewedIdeaType: state.userReducer.selectedDropDownType,
      currentPreviewedIdea: state.userReducer.currentPreviewedIdea,
      isIdeaEdited: state.userReducer.isIdeaEdited,
    };
  }
  
export default connect(mapStateToProps)(EditIdeaButton)