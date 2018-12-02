import React, { Component } from 'react'
import './ideaAttachmentButton.css'
import '../cardButtons.css'

export default class IdeaAttachmentButton extends Component {
  handleAttachmentsClick(){

  }

  render() {
    return (
      <React.Fragment>
        <img src={require("images/attachmentIcon.png")} id="attachmentsButton" className="cardBottomButton hoverClickHand" onClick={this.handleAttachmentsClick}/>
      </React.Fragment>
    )
  }
}
