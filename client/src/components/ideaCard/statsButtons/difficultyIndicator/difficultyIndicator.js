import React, { Component } from 'react'
import './difficultyIndicator.css'
import '../../ideaCard.css'
import { connect } from 'react-redux';
import {
  ADD_USER_TO_IDEA_ADDED_EASY, 
  ADD_USER_TO_IDEA_ADDED_HARD,
  REMOVE_USER_FROM_IDEA_ADDED_HARD,
  REMOVE_USER_FROM_IDEA_ADDED_EASY,
} from 'reducers/types'
import {updateIdeaIndicator} from 'actions/ideaActions'
import {showLogInScreen} from 'actions/commonActions'

class DifficultyIndicator extends Component {
  constructor(props){
    super(props)

    this.state = {
      addedHard: false,
      addedEasy: false
    }
  }

  addHard = () => {
    this.setState({addedHard: true});
    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/addHardToIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/addHardToIdea/',ADD_USER_TO_IDEA_ADDED_HARD);
  }

  removeHard = () => {
    this.setState({addedHard: false});

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeHardFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeHardFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_HARD);
  }

  removeEasy = () => {
    this.setState({addedEasy: false});

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeEasyFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeEasyFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_EASY);
  }

  addEasy = () => {
    this.setState({addedEasy: true});

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/addEasyToIdeaCreator/',null,    //dont add easy ideas to user
      'api/items/addedEasyToIdea/',ADD_USER_TO_IDEA_ADDED_EASY);
  } 

  handleAddHardClick = () => { 
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{  
      if(this.props.enabled) {
        if(this.state.addedEasy){
          this.removeEasy();
          this.addHard();
        }else if(this.state.addedHard){
          this.removeHard();
        }else{
          this.addHard();
        }
      }
    }
  }

  handleAddEasyClick = () => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }else{
      if(this.props.enabled) {
        if(this.state.addedHard){
          this.removeHard();
          this.addEasy();
        }else if (this.state.addedEasy){
            this.removeEasy();
        }else{
            this.addEasy();
        }
      }
    }
  }

  render() {
    return (
      <div className="bottomIndicator">
        <img src={require("images/difficulty.png")} id="difficultyImage" className="bottomButton"/>
        <img src={this.state.addedHard ? require("images/upArrowHighlighted.png"): require("images/upArrow.png")} id="increaseDifficulty" className="bottomButton hoverClickHand" 
          onClick={this.handleAddHardClick}/>

        {this.props.idea === undefined || this.props.idea.addedHard === undefined ? 0 : this.props.idea.addedHard.length}

        <img src={this.state.addedEasy ? require("images/downArrowHighlighted.png") : require("images/downArrow.png")} id="decreaseDifficulty" className="bottomButton hoverClickHand" 
          onClick={this.handleAddEasyClick}/>        

        {this.props.idea === undefined || this.props.idea.addedEasy === undefined ? 0 : this.props.idea.addedEasy.length}

        <span> ({this.props.idea === undefined || this.props.idea.addedHard === undefined || this.props.idea.addedEasy === undefined ?  
          0 : Math.round((this.props.idea.addedHard.length/(this.props.idea.addedEasy.length + this.props.idea.addedHard.length == 0 ? 1 : this.props.idea.addedEasy.length + this.props.idea.addedHard.length)) * 100) }%)  </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userPageReducer.loggedInUserID,
    loggedIn: state.commonReducer.loggedIn,
  };
}

export default connect(mapStateToProps, {updateIdeaIndicator} )(DifficultyIndicator);