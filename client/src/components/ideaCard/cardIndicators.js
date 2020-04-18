import React, { Component } from 'react'
import LikeDislike from './statsButtons/likesIndicator/likeDislike'
import DifficultyIndicator from './statsButtons/difficultyIndicator/difficultyIndicator'
import TimeIndicator from './statsButtons/timeIndicator/timeIndicator'

export default class CardIndicators extends Component {
  render() {
    return ( 
      <React.Fragment>
        <div id="cardIndicationButtons">
          <div id="cardIndicators"> 
            <LikeDislike idea={this.props.idea} enabled={this.props.enabled} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}