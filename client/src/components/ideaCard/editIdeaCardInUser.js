import React, { Component } from 'react'
import EditableIdeaCard from 'components/ideaCard/editableIdeaCardOld'
import UserSaveIdeaButton from './save_idea_button';
import { connect } from 'react-redux';
import VerticalEditIdeaBar from 'components/searchBar/verticalEditIdeaBar'
import { stat } from 'fs';

class EditIdeaCardInUser extends Component {
  render() {
    return (
      <React.Fragment>
        <VerticalEditIdeaBar place={this.props.place} 
          time={this.props.time}
          minNumOfPeople={this.props.minNumOfPeople}
          maxNumOfPeople={this.props.maxNumOfPeople} 
        />
        <EditableIdeaCard  existingTitle={this.props.title} content={this.props.content} /> 
        <UserSaveIdeaButton />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.editableIdeaReducer.title,
    content: state.editableIdeaReducer.content,
    time: state.editableIdeaReducer.time,
    place: state.editableIdeaReducer.place,
    minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
  };
}

export default connect(mapStateToProps)(EditIdeaCardInUser)
