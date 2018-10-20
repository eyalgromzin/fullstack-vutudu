import React, { Component } from 'react'
import IdeaAttachmentsButton from './cardButtons/addAttachmentButton/addAttachmentButton'
import IdeaPlace from './cardButtons/placeButton/placeButton'
import './editIdeaCard.css'
import { connect } from 'react-redux';
import { EDITED_IDEA_SET_TITLE,
  EDITED_IDEA_SET_CONTENT,
  PREVIEWED_IDEA_SET_TITLE,
  PREVIEWED_IDEA_SET_CONTENT,
} from 'reducers/types'
import 'commonCss.css'
import { addIdeaToDB } from 'actions/ideaActions';
import PropTypes from 'prop-types';
import {  Creators } from 'redux';
import store from 'store'
import { bindActionCreators } from 'redux';

class EditIdeaCard extends Component {
  constructor(props){
    super(props);
  
    this.state={
      error:"",
      isHasError: false
    }
  }

  isHasError = false;

  handleOnTitleChange = (e) => {
      store.dispatch({type: EDITED_IDEA_SET_TITLE, payload: e.target.value});  
  }

  handleOnContentChange = (e) => {
      store.dispatch({type: EDITED_IDEA_SET_CONTENT, payload: e.target.value});
  }

  render() {
    return (
      <React.Fragment>
        <div id="createIdeaContainer">
          <div id="ideaCard"> 
            <div id="ideaCardContent">
              <input type="text" id="newIdeaTitle" value={this.props.title} placeholder="<title>" onChange={this.handleOnTitleChange}/>
              <textarea type="text" id="newIdeaContent" value={this.props.content} placeholder="<content>" onChange={this.handleOnContentChange}/>
            </div>
          </div>
          <div id="newIdeaError"> {this.state.error} </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.editedIdeaReducer.title,
    content: state.editedIdeaReducer.content,
    place: state.editedIdeaReducer.place,
    minTime: state.editedIdeaReducer.minTime,
    maxTime: state.editedIdeaReducer.maxTime,
    minNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,
    userID: state.userReducer.loggedInUserID,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditIdeaCard);  // ,mergeProps    //,mapDispatchToProps