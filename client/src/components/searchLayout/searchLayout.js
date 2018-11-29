import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import IdeaCard from '../ideaCard/ideaCard'
import TopTable from 'components/topTable/topTable'
import 'commonCss.css'
import { connect } from 'react-redux';

class searchLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="mainContent">
          <SearchBar />
        {/* <div class="mainContent">
          
        </div> */}
        
          {/* <IdeaCard /> */}

          {
            this.props.searched ? <IdeaCard /> : <TopTable />
          }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    searched: state.commonReducer.searched,
  };
}

export default connect(mapStateToProps)(searchLayout);
