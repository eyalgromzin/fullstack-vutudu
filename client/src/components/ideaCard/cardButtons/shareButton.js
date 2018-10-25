import React, { Component } from 'react'
import './cardButtons.css'

export default class ShareButton extends Component {
  render() {
    return (
      <React.Fragment>
          <img src={require("images/share.png")} id="shareButton" />
      </React.Fragment>
    )
  }
}
