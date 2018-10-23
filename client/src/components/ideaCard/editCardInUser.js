import React, { Component } from 'react'
import EditIdeaCard from 'components/ideaCard/editIdeaCard'
import SaveIdeaButton from 'components/ideaCard/saveIdeaButton';

export default class editCardInUser extends Component {
  render() {
    return (
      <div>
        <EditIdeaCard existingTitle="" existingContent="" existingID="" /> 
        <SaveIdeaButton />
      </div>
    )
  }
}
