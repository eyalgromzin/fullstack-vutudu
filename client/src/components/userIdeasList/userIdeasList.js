import React, { Component } from 'react'
import './userIdeasList.css'
import ReactList from 'react-list';
import { connect } from 'react-redux';
import {SET_USER_CURRENT_PREVIEWED_IDEA, SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT} from 'reducers/types'

class UserIdeasList extends Component {
  
  renderItem = (index, key) => {  //key is running number
    return <div key={key} onClick={ () => 
      { 
        this.userIdeaClicked(this.props.currentPreviewedIdeas2[index]._id) 
      } 
    } 
    className="listRow">{this.props.currentPreviewedIdeas2[index].title == null || 
      this.props.currentPreviewedIdeas2[index].title == "" ? "empty title" 
    : this.props.currentPreviewedIdeas2[index].title}
    </div>;
  }

  userIdeaClicked = (id) => {  //doesnt work
    console.log("clicked id: " + id);
    var clickedIdea = this.props.currentPreviewedIdeas2.filter(obj => {
      return obj._id === id
    })
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: clickedIdea[0]});
    this.props.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false})
  }

  render() {
    return (
      <React.Fragment>
        <div style={{overflow: 'auto', height: 525}}>
          <div class="listOutline">
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props.currentPreviewedIdeas2 == null? 0 : this.props.currentPreviewedIdeas2.length}
              type='uniform'
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPreviewedIdeas2: state.userReducer.currentPreviewedIdeas
  };
}

export default connect(mapStateToProps)(UserIdeasList)