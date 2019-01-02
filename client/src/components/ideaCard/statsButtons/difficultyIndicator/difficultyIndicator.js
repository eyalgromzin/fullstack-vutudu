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
  }

  addHard = () => {
    // this.setState({addedHard: true});
    // this.props.addedHard = true;

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/addHardToIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/addHardToIdea/',ADD_USER_TO_IDEA_ADDED_HARD);
  }

  removeHard = () => {
    // this.setState({addedHard: false});
    // this.props.addedHard = false

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeHardFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeHardFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_HARD);
  }

  removeEasy = () => {
    // this.setState({addedEasy: false});
    // this.props.addedEasy = false

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/removeEasyFromIdeaCreator/',null,    //dont add difficult ideas to user
      'api/items/removeEasyFromIdea/',REMOVE_USER_FROM_IDEA_ADDED_EASY);
  }

  addEasy = () => {
    // this.setState({addedEasy: true});
    // this.props.addEasy = true

    this.props.updateIdeaIndicator(this.props.userID,this.props.idea,
      '/api/user/addEasyToIdeaCreator/',null,    //dont add easy ideas to user
      'api/items/addedEasyToIdea/',ADD_USER_TO_IDEA_ADDED_EASY);
  } 

  handleAddHardClick = () => { 
    if(this.props.enabled){
      if(!this.props.loggedIn){
        showLogInScreen();
      }else{  
        if(this.props.enabled) {
          if(this.isAddedEasy()){
            this.removeEasy();
            this.addHard();
          }else if(this.isAddedHard()){
            this.removeHard();
          }else{
            this.addHard();
          }
        }
      }
    }
  }

  handleAddEasyClick = () => {
    if(this.props.enabled){
      if(!this.props.loggedIn){
        showLogInScreen();
      }else{
        if(this.props.enabled) {
          if(this.isAddedHard()){
            this.removeHard();
            this.addEasy();
          }else if (this.isAddedEasy()){
              this.removeEasy();
          }else{
              this.addEasy();
          }
        }
      }
    }
  }

  isAddedHard = () => {
    //needed for user page where idea is not defined at the begining
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.addedHard === undefined)){
      return this.props.idea.addedHard.includes(this.props.userID) ;  //|| this.state.addedHard
    }

    return false;
  }

  isAddedEasy = () => {
    if(!(this.props.idea === undefined || this.props.idea == null || this.props.idea.addedEasy === undefined)){
      return this.props.idea.addedEasy.includes(this.props.userID) ;  //|| this.state.addedEasy
    }
    return false;
  }

  render() {
    let addedHard = this.isAddedHard();
    let addedEasy = this.isAddedEasy();

    return (
      <div className="bottomIndicator">
        <img src={require("images/difficulty.png")} id="difficultyImage" className="bottomButton"/>
        <img src={addedHard ? require("images/upArrowHighlighted.png"): require("images/upArrow.png")} 
          id="increaseDifficulty" className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} onClick={this.handleAddHardClick}/>

        {this.props.idea === undefined || this.props.idea.addedHard === undefined ? 0 : this.props.idea.addedHard.length}

        <img src={addedEasy ? require("images/downArrowHighlighted.png") : require("images/downArrow.png")} 
          id="decreaseDifficulty" className={this.props.enabled? "bottomButton hoverClickHand": "bottomButton"} onClick={this.handleAddEasyClick}/>        

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