import React, { Component } from 'react'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import UserSaveIdeaButton from 'components/ideaCard/saveIdeaButton';
import { connect } from 'react-redux';

class EditCardInUser extends Component {
  render() {
    return (
      <div>
        <EditIdeaCard existingTitle={this.props.title} existingContent={this.props.content} /> 
        <UserSaveIdeaButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.userPageReducer.currentPreviewedIdea.title,
    content: state.userPageReducer.currentPreviewedIdea.content,
    currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea._id,
  };
}

export default connect(mapStateToProps)(EditCardInUser)
