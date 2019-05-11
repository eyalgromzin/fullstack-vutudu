import React, { Component } from 'react'
import './cardButtons.css'

export default class ShareButton extends Component {
  shareButtonClick = (e) => {
    //open a dialog with all share options:
    // google, facebook, whatsapp, mail
    
  }

  render() {
    return (
      <React.Fragment>
          <img src={require("images/share.png")} onClick={this.shareButtonClick} alt="share" id="shareButton" />
      </React.Fragment>
    )
  }
}
