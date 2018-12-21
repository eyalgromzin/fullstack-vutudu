import React, { Component } from 'react'
import { 
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  UPDATE_EDITED_IDEA,
  CHANGE_UPDATE_TOGGLE
} from 'reducers/types'
import { connect } from 'react-redux';

class EditIdeaButton extends Component {
  

    editIdea = () => {
      console.log('edit idea clicked');
      //make the fields to text boxes to edit the fields
      this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: true});
      this.props.dispatch({type: UPDATE_EDITED_IDEA, payload: this.props.currentPreviewedIdea});
      this.props.dispatch({type: CHANGE_UPDATE_TOGGLE});
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
      currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
      currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
      isIdeaEdited: state.userPageReducer.isIdeaEdited,
    };
  }
  
export default connect(mapStateToProps)(EditIdeaButton)