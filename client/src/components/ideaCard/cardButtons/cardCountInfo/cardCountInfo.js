import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cardCountInfo.css'

class CardCountInfo extends Component {
  render() {
    return (
      <div id="cardCountInfo">
        {this.props.currentIdeaIndex + 1}/{this.props.ideas.length}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      currentIdeaIndex: state.searchPageReducer.currentIdeaIndex,
      ideas: state.searchPageReducer.ideas,
    };
  }

export default connect(mapStateToProps)(CardCountInfo);