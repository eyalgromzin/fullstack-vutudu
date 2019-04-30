import React, { Component } from 'react'
import EditableIdeaCard from 'components/ideaCard/editableIdeaCard'
import UserSaveIdeaButton from 'components/ideaCard/saveIdeaButton';
import { connect } from 'react-redux';
import EditIdeaBar from 'components/searchBar/editIdeaBar'
import { stat } from 'fs';

class EditCardInUser extends Component {
  render() {
    return (
      <div>
        <EditIdeaBar place={this.props.place} 
          time={this.props.time}
          minNumOfPeople={this.props.minNumOfPeople}
          maxNumOfPeople={this.props.maxNumOfPeople} 
        />
        <EditableIdeaCard  existingTitle={this.props.title} existingContent={this.props.content} /> 
        <UserSaveIdeaButton />
      </div>
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

export default connect(mapStateToProps)(EditCardInUser)
