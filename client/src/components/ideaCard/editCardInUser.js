import React, { Component } from 'react'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import SaveIdeaButton from 'components/ideaCard/saveIdeaButton';
import { connect } from 'react-redux';

class EditCardInUser extends Component {
  render() {
    return (
      <div>
        <EditIdeaCard existingTitle={this.props.title} existingContent={this.props.content} /> 
        <SaveIdeaButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.userReducer.currentPreviewedIdea.title,
    content: state.userReducer.currentPreviewedIdea.content,
    currentPreviewedIdea: state.userReducer.currentPreviewedIdea._id,
  };
}

export default connect(mapStateToProps)(EditCardInUser)
