import React, { Component } from 'react'
import { 
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  UPDATE_EDITABLE_IDEA,
  CHANGE_USER_UPDATE_TOGGLE,
  SET_USER_EDITED_IDEA
} from 'reducers/types'
import 'cssAnimations.css'
import { connect } from 'react-redux';

class EditIdeaButton extends Component {
    editIdea = () => {
      console.log('edit idea clicked');
      //make the fields to text boxes to edit the fields
      this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: true});
      this.props.dispatch({type: UPDATE_EDITABLE_IDEA, payload: this.props.currentPreviewedIdea});
      this.props.dispatch({type: SET_USER_EDITED_IDEA, payload: this.props.currentPreviewedIdea});
      this.props.dispatch({type: CHANGE_USER_UPDATE_TOGGLE});
    }

  render() {
    return (
      <React.Fragment>
        { this.props.currentPreviewedIdeaType == "Created" && this.props.currentPreviewedIdea != null 
            && !this.props.isIdeaEdited ? 
          <img src={require("images/writeBlackWithoutBorder.png")} alt="" className="userPageIdeaButton tilt" 
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