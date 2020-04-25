import React, { Component } from 'react'
import './ideasList.css'
import ReactList from 'react-list';
// import { connect } from 'react-redux';
import store from 'store'
import {SET_USER_CURRENT_PREVIEWED_IDEA, SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT} from 'reducers/types'
import { connect } from 'react-redux';

class IdeasList extends Component {
  renderItem = (index, key) => {  //key is running number
    var random = Math.random();
    return <div key={random} onClick={ () => 
      { 
        this.userIdeaClicked(this.props.ideas[index]._id) 
      } 
    } 
    className="listRow">   
      {this.props.ideas == null || this.props.ideas[index] == null 
      || this.props.ideas[index].title == null || this.props.ideas[index].title == "" ? 
      "empty title"  : this.props.ideas[index].title}
    </div>;
  }

  userIdeaClicked = (id) => {  //doesnt work
    console.log("clicked id: " + id);
    var clickedIdea = this.props.ideas.filter(obj => {
      return obj._id === id
    })
    
    this.props.onIdeaSelected(clickedIdea[0])
  }

  render() {
    return (
      <React.Fragment>
        
          <div style={{overflow: 'auto', height: 460}}>
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props == null || this.props.ideas == null? 0 : this.props.ideas.length}
              type='uniform'
            />
          </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(IdeasList); 
