import React, { Component } from 'react'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
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
        <EditIdeaCard existingTitle={this.props.title} existingContent={this.props.content} /> 
        <UserSaveIdeaButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.editedIdeaReducer.title,
    content: state.editedIdeaReducer.content,
    time: state.editedIdeaReducer.time,
    place: state.editedIdeaReducer.place,
    minNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,
  };
}

export default connect(mapStateToProps)(EditCardInUser)
