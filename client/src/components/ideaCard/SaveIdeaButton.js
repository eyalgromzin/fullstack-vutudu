import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './ideaCard.css'
import {
  SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
  CHANGE_UPDATE_TOGGLE,
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

    store.dispatch({type: CHANGE_UPDATE_TOGGLE});

    this.props.updateIdea(
      this.props.userID, 
      this.props.currentPreviewedIdea._id,
      this.props.newTitle,
      this.props.newContent,
      this.props.newPlace,
      this.props.newTime,
      this.props.newMinNumOfPeople,
      this.props.newMaxNumOfPeople);
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
    updateIdea: bindActionCreators (updateIdea, dispatch),
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
    newTime: state.editedIdeaReducer.time,
    newPlace: state.editedIdeaReducer.place,
    newMinNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
    newMaxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,

  };
}

export default connect(mapStateToProps,mapDispatchToProps )(UserSaveIdeaButton) //updateUserIdeas