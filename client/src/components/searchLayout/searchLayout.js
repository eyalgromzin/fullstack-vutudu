import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import IdeaCard from '../ideaCard/ideaCard'
import 'commonCss.css'
import DoneButton from 'components/ideaCard/doneButton'


export default class searchLayout extends Component {
  render() {
    return (
      <div class="mainContent">
        <SearchBar />
        <IdeaCard />
        
      </div>
    )
  }
}
