import React, { Component } from 'react'
import './userIdeasList.css'
import ReactList from 'react-list';
// import { connect } from 'react-redux';
import store from 'store'
import {SET_USER_CURRENT_PREVIEWED_IDEA, SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT} from 'reducers/types'
import { connect } from 'react-redux';

class UserIdeasList extends Component {
  //this.props.ideas

  constructor(props){
    super();

    this.state = { 
      updateViewToggle: props.updateViewToggle,
    }
  }

  

  renderItem = (index, key) => {  //key is running number
    return <div key={key} onClick={ () => 
      { 
        this.userIdeaClicked(this.props.ideas[index]._id) 
      } 
    } 
    className="listRow">   
      {this.props.ideas[index].title == null || 
      this.props.ideas[index].title == "" ? "empty title" 
      : this.props.ideas[index].title}
    </div>;
  }

  userIdeaClicked = (id) => {  //doesnt work
    console.log("clicked id: " + id);
    var clickedIdea = this.props.ideas.filter(obj => {
      return obj._id === id
    })
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: clickedIdea[0]});
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});  //to update ideas list 
  }

  render() {
    return (
      <React.Fragment>
        
          <div style={{overflow: 'auto', height: 525}}>
            <div className="listOutline">
              <ReactList
                itemRenderer={this.renderItem}
                length={this.props.ideas == null? 0 : this.props.ideas.length}
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
    currentPreviewedIdeas: state.userPageReducer.currentPreviewedIdeas,
  };
}

export default connect(mapStateToProps)(UserIdeasList); 
