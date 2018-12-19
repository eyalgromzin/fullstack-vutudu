import React, { Component } from 'react'
import CreateIdeaBar from '../searchBar/createIdeaBar'
import EditIdeaCard from '../ideaCard/editIdeaCard'
import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'

export default class createLayout extends Component {
  render() {
    return (
      <div className="createMainContent">
        <CreateIdeaBar />
        <EditIdeaCard existingTitle="" existingContent="" existingID="" />
        <CreateIdeaButton />
      </div>
    )
  }
}
