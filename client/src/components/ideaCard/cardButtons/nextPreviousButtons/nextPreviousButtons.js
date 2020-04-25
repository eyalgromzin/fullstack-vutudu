import React, { Component } from 'react'
import './nextPreviousButtons.css'
import '../../ideaCard.css'
import { SET_CURRENT_IDEA } from 'reducers/types'
import { connect } from 'react-redux';

class IdeaNextPreviousButtons extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentIdeaIndex: 0
    }
  }
  
  rightArrowClick = () => {
    var ideasCount = this.props.ideas.length;

    if(ideasCount <= 1){
      return 
    }
    
    let currentIndex = this.state.currentIdeaIndex

    currentIndex += 1
    if(currentIndex == ideasCount){
      this.setState({currentIdeaIndex: 0})
      currentIndex = 0
    }else{
      this.setState({currentIdeaIndex: this.state.currentIdeaIndex +1})
    }

    var currentIdea = this.props.ideas[currentIndex];
    
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: currentIdea });
  }

  leftArrowClick = () => {
    var ideasCount = this.props.ideas.length;

    if(ideasCount <= 1){
      return 
    }

    let currentIdeaIndex = this.state.currentIdeaIndex

    currentIdeaIndex--;
    if(currentIdeaIndex == -1){
      currentIdeaIndex = this.props.ideas.length - 1;
      this.setState({currentIdeaIndex: this.props.ideas.length - 1})
    }else{
      this.setState({currentIdeaIndex: currentIdeaIndex })
    }

    var currentIdea = this.props.ideas[currentIdeaIndex];
    
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: currentIdea});
  }

  render() {
    return (
      <React.Fragment>
        <div id="ideaNextPreviousButtons">
        <i id="ideaLeftArrow" className="leftArrowI ideaTopButton hoverClickHand" onClick={this.leftArrowClick}/> {/*img src={require("images/leftArrow.png")} */}
        <div id="cardCountInfo">
          {this.props.currentIdeaIndex + 1}/{this.props.ideas.length}
        </div>
        <i id="ideaRightArrow" className="rightArrowI ideaTopButton hoverClickHand" onClick={this.rightArrowClick}/>   {/*src={require("images/rightArrow.png")} */}
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  // ideas: state.searchPageReducer.ideas
  // currentIdeaIndex: state.searchPageReducer.currentIdeaIndex,
    return {
    };
  }

  export default connect(mapStateToProps)(IdeaNextPreviousButtons);
