import React, { Component } from 'react'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import UserSaveIdeaButton from 'components/ideaCard/saveIdeaButton';
import { connect } from 'react-redux';
import CreateIdeaBar from 'components/searchBar/createIdeaBar'

class EditCardInUser extends Component {
  render() {
    return (
      <div>
        <CreateIdeaBar place={this.props.currentIdea.place} 
          time={this.props.currentIdea.time}
          minNumOfPeople={this.props.currentIdea.minNumOfPeople}
          maxNumOfPeople={this.props.currentIdea.maxNumOfPeople} 
        />
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
    currentIdea: state.userPageReducer.currentPreviewedIdea,
  };
}

export default connect(mapStateToProps)(EditCardInUser)
