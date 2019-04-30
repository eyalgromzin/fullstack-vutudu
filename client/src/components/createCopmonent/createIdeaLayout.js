import { connect } from 'react-redux';
import React, { Component } from 'react'
import CreateIdeaBar from '../searchBar/createIdeaBar'
import EditableIdeaCard from '../ideaCard/editableIdeaCard'
import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'

class createIdeaLayout extends Component {
  render() {
    return (
      <div className="createMainContent">
        <CreateIdeaBar isClickedButton={this.props.isClickedButton} />
        <EditableIdeaCard existingTitle="" existingContent="" existingID="" isClickedButton={this.props.isClickedButton} />
        <CreateIdeaButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton
  };
}


export default connect(mapStateToProps)(createIdeaLayout);


