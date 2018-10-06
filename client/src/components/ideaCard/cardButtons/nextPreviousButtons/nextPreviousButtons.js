import React, { Component } from 'react'
import './nextPreviousButtons.css'
import '../../ideaCard.css'
import {CHANGE_CURRENT_IDEA_INDEX} from 'reducers/types'
import { connect } from 'react-redux';
import CardCountInfo from '../cardCountInfo/cardCountInfo'


 class IdeaNextPreviousButtons extends Component {
  constructor(props){
    super(props);

    this.rightArrowClick = this.rightArrowClick.bind(this);
    this.leftArrowClick = this.leftArrowClick.bind(this);
  }

  rightArrowClick(){
    var ideasCount = this.props.ideas.length;
    var currentIdeaIndex = this.props.currentIdeaIndex;
    currentIdeaIndex++;
    if(currentIdeaIndex == ideasCount){
      currentIdeaIndex = 0;
    }

    var currentIdea = this.props.ideas[currentIdea];
    
    this.props.dispatch({ type: CHANGE_CURRENT_IDEA_INDEX, payload: currentIdeaIndex });
  }

  leftArrowClick(){
    var ideasCount = this.props.ideas.length;
    var currentIdeaIndex = this.props.currentIdeaIndex;
    currentIdeaIndex--;
    if(currentIdeaIndex == -1){
      currentIdeaIndex = this.props.ideas.length - 1;
    }

    var currentIdea = this.props.ideas[currentIdea - 1];
    
    this.props.dispatch({ type: CHANGE_CURRENT_IDEA_INDEX, payload: currentIdeaIndex });
  }

  render() {
    return (
      <React.Fragment>
        <div id="ideaNextPreviousButtons">
        <i id="ideaLeftArrow" class="leftArrowI ideaTopButton hoverClickHand" onClick={this.leftArrowClick}/> {/*img src={require("images/leftArrow.png")} */}
        <CardCountInfo />
        <i id="ideaRightArrow" class="rightArrowI ideaTopButton hoverClickHand" onClick={this.rightArrowClick}/>   {/*src={require("images/rightArrow.png")} */}
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
    return {
      currentIdeaIndex: state.ideasReducer.currentIdeaIndex,
      ideas: state.ideasReducer.ideas
    };
  }

  export default connect(mapStateToProps)(IdeaNextPreviousButtons);
