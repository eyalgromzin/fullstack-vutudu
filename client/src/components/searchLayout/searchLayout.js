import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import IdeaCard from '../ideaCard/ideaCard'
import TopTable from 'components/topTable/topTable'
import 'commonCss.css'
import 'components/layout.css'
import { connect } from 'react-redux';
import NoResultsFound from './noResultsFound'

class searchLayout extends Component {
  constructor(props){
    super();

    this.state={refresh: false}
  }

  render() {
    this.state.refresh = !this.state.refresh
    
    return (
      <React.Fragment>
        {/* <div class="pageName">search</div> */}
        <div className="searchMainContent">
          <SearchBar />
            
              <div className="mainContent">
                {
                this.props.ideas.length == 0 && this.props.searched ?
                  <NoResultsFound />
                  :
                    this.props.searched ? 
                      <IdeaCard idea={this.props.idea} enabled={true} showNextPreviousButtons={true}/> 
                      : 
                      <TopTable /> 
                }
              </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    searched: state.commonReducer.searched,
    idea: state.searchPageReducer.currentIdea,
    ideas: state.searchPageReducer.ideas,
  };
}

export default connect(mapStateToProps)(searchLayout);
