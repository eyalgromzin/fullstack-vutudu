import React, { Component } from 'react'
import './placeButton.css'
import '../cardButtons.css'

export default class PlaceButton extends Component {
  handlePlaceClick(){

  }

  render() {
    return (
      <React.Fragment>
        <img src={require("images/placeIcon.png")} id="placeButton" class="cardBottomButton hoverClickHand" onClick={this.handlePlaceClick}/>
      </React.Fragment>
    )
  }
}
