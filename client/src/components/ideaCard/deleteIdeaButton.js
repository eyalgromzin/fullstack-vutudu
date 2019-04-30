import React, { Component } from 'react'
import { deleteIdea } from 'actions/ideaActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './editIdeaCard.css'


class DeleteIdeaButton extends Component {
  deleteIdea = () => {
    this.props.deleteIdea(this.props.loggedInUserID, this.props.idea._id)
  }

  render() {
    return (
      <React.Fragment>
        { this.props.currentPreviewedIdeaType == "Created" && this.props.idea != null 
            && !this.props.isIdeaEdited ? 
          <img src={require("images/deleteWithOutline.png")} className="userPageIdeaButton" id="deleteIdeaButton" 
          onClick={() => {
              this.deleteIdea()
            }}  />  
          : 
          <React.Fragment />
        }
      </ React.Fragment>
    )
  }
}

function mapStateToProps(state) {
    return {
      currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
      isIdeaEdited: state.userPageReducer.isIdeaEdited,
      loggedInUserID: state.userPageReducer.loggedInUserID,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      deleteIdea: bindActionCreators (deleteIdea, dispatch),
      dispatch,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeleteIdeaButton)    //mapDispatchToProps