import React, { Component } from 'react'
import './placeButton.css'
import '../cardButtons.css'

//supposed to be used to add location on map and such
export default class PlaceButton extends Component {
  handlePlaceClick(){  }

  render() {
    return (
      <React.Fragment>
        <img src={require("images/placeIcon.png")} id="placeButton" className="cardBottomButton hoverClickHand" onClick={this.handlePlaceClick}/>
      </React.Fragment>
    )
  }
}
