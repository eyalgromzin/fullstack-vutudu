import React, { Component } from 'react'
import CreateIdeaBar from '../searchBar/createIdeaBar'
import CreateIdeaCard from '../ideaCard/createIdeaCard'
import 'commonCss.css'

export default class createLayout extends Component {
  render() {
    return (
      <div class="mainContent">
        <CreateIdeaBar />
        <CreateIdeaCard />
        <CreateIdeaButton />
      </div>
    )
  }
}
