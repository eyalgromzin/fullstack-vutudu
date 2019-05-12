import { connect } from 'react-redux';
import React, { Component } from 'react'
import CreateIdeaBar from '../searchBar/createIdeaBar'
import EditableIdeaCard from '../ideaCard/editableIdeaCard'
import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'
import 'components/layout.css'

class createIdeaLayout extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div className="pageName">Create</div> */}
        <div className="createMainContent">
          <div id="createIdeaBar">
            <div id="createIdeaBarButtons">
              <CreateIdeaBar isClickedButton={this.props.isClickedButton} />
              <CreateIdeaButton />
            </div>
          </div>
          <EditableIdeaCard existingTitle="" existingContent="" existingID="" isClickedButton={this.props.isClickedButton} />
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton
  };
}


export default connect(mapStateToProps)(createIdeaLayout);


