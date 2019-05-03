import React, { Component } from 'react'
import ReactList from 'react-list';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import {
  SET_TOP_TABLE_IS_IDEA_CLICKED,
  SET_TOP_TABLE_IDEA,
} from 'reducers/types'

//on click, open the idea in the middle like in search
//remove table on search
class topTable extends Component {
  showLikedIdea = (likedIdea) => {
    //the ideas list should move to the right side and
    store.dispatch({type: SET_TOP_TABLE_IS_IDEA_CLICKED, payload: true});  //to update ideas list 

    //the idea should show in the middle.
    store.dispatch({type: SET_TOP_TABLE_IDEA, payload: likedIdea})
  }

  showHardIdea = (hardIdea) => {
    //the ideas list should move to the right side and
    store.dispatch({type: SET_TOP_TABLE_IS_IDEA_CLICKED, payload: true});  //to update ideas list 
    
    //the idea should show in the middle.
    store.dispatch({type: SET_TOP_TABLE_IDEA, payload: hardIdea})
  }

  renderLikedItem = (index, key) => {  //key is running number
    return <div onClick={ () => 
      { 
        this.showLikedIdea(this.props.topLikedIdeas[index]) 
      } 
    } 
    key={Math.random()}
    className="listRow">   
      {this.props.topLikedIdeas[index].title}
    </div>;
  }

  renderHardItem = (index, key) => {  //key is running number
    return <div onClick={ () => 
      { 
        this.showHardIdea(this.props.topHardIdeas[index]) 
      } 
    } 
    key={Math.random()}
    className="listRow">   
      {this.props.topHardIdeas[index].title}
    </div>

  }

  render() {
    var clickedIdeaElement = 
      <React.Fragment>
        <div id="topTableLists">
          <div id="topTableClicked">
            <div id="topTableHeader">
              Top Ideas
            </div>
            <div id="topLikedTableClicked">
              <div className="inlineBlock topTableHeader">Liked</div>
                <ReactList
                        itemRenderer={this.renderLikedItem}
                        length={this.props == null || this.props.topLikedIdeas == null? 0 : this.props.topLikedIdeas.length}
                        type='uniform'
                      />
            </div>
            <div id="topHardTableClicked">
              <span className="topTableHeader">Hard</span>
              <ReactList
                      itemRenderer={this.renderHardItem}
                      length={this.props == null || this.props.topHardIdeas == null? 0 : this.props.topHardIdeas.length}
                      type='uniform'
                    />
            </div>
          </div>
        </div>
        <div id="topTableIdea">
          <IdeaCard idea={this.props.idea} disabled={true} showNextPreviousButtons={false} />
        </div>
      </React.Fragment>

    var topTable = 
      <React.Fragment>
        <div id="topTable">
          <div id="topTableHeader"> 
            Top Ideas
          </div>
          <div id="topLikedTable">
          <span className="topTableHeader">Liked</span>
            <ReactList
                    itemRenderer={this.renderLikedItem}
                    length={this.props == null || this.props.topLikedIdeas == null? 0 : this.props.topLikedIdeas.length}
                    type='uniform'
                  />
          </div>
          <div id="topHardTable">
          <span className="topTableHeader">Hard</span>
            <ReactList
                    itemRenderer={this.renderHardItem}
                    length={this.props == null || this.props.topHardIdeas == null? 0 : this.props.topHardIdeas.length}
                    type='uniform'
                  />
          </div>
        </div>
      </React.Fragment>

    if(this.props.isClickedTopIdea){
      return clickedIdeaElement
    }else{
      return topTable 
    }
  }
}

function mapStateToProps(state) {
  return {
    topLikedIdeas: state.topTableReducer.topLikedIdeas,
    topHardIdeas: state.topTableReducer.topHardIdeas,
    isClickedTopIdea:  state.topTableReducer.isClickedTopIdea,
    idea: state.topTableReducer.idea
  };
}

export default connect(mapStateToProps)(topTable); 
