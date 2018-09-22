import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import IdeaCard from '../ideaCard/ideaCard'


export default class searchLayout extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <IdeaCard />
      </div>
    )
  }
}
