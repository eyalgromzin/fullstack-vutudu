import React, { Component } from 'react'
import CreateIdeaBar from '../searchBar/createIdeaBar'
import CreateIdeaCard from '../ideaCard/createIdeaCard'

export default class createLayout extends Component {
  render() {
    return (
      <div>
        <CreateIdeaBar />
        <CreateIdeaCard />
      </div>
    )
  }
}
