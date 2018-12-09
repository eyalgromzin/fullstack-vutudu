import React, { Component } from 'react'
import { deleteIdea } from 'actions/ideaActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './editIdeaCard.css'

class EditIdeaButton extends Component {
  render() {
    return (
      <React.Fragment>
        { this.props.currentPreviewedIdeaType == "Created" && this.props.currentPreviewedIdea != null 
            && !this.props.isIdeaEdited ? 
          <img src={require("images/deleteWithOutline.png")} className="userPageIdeaButton" id="deleteIdeaButton" 
          onClick={() => {
              this.props.deleteIdea(this.props.currentPreviewedIdea._id)
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
      currentPreviewedIdea: state.userPageReducer.currentPreviewedIdea,
      isIdeaEdited: state.userPageReducer.isIdeaEdited,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      deleteIdea: bindActionCreators (deleteIdea, dispatch),
      dispatch,
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(EditIdeaButton)    //mapDispatchToProps