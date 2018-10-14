import React, { Component } from 'react'
import './userIdeasList.css'
import ReactList from 'react-list';
import { connect } from 'react-redux';
import {SET_USER_PREVIEW_IDEA} from 'reducers/types'

class UserIdeasList extends Component {
  
  renderItem = (index, key) => {  //key is running number
    return <div key={key} onClick={ () => 
      { 
        this.userIdeaClicked(this.props.currentPreviewedIdeas[index]._id) 
      } 
    } 
    className="listRow">{this.props.currentPreviewedIdeas[index].title}
    
      
      </div>;
  }

  userIdeaClicked = (id) => {  //doesnt work
    console.log("clicked id: " + id);
    var clickedIdea = this.props.currentPreviewedIdeas.filter(obj => {
      return obj._id === id
    })
    this.props.dispatch({type: SET_USER_PREVIEW_IDEA, payload: clickedIdea[0]})
  }

  render() {
    return (
      <React.Fragment>
        <div style={{overflow: 'auto', height: 525}}>
          <div class="listOutline">
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props.currentPreviewedIdeas == null? 0 : this.props.currentPreviewedIdeas.length}
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
    currentPreviewedIdeas: state.userReducer.currentPreviewedIdeas
  };
}

export default connect(mapStateToProps)(UserIdeasList)