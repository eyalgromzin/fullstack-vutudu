import React, { Component } from 'react'
import { addIdeaToDB, updateTags, isIdeaTitleExists } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'commonCss.css'
import './editIdeaCard.css'
import {notify} from 'react-notify-toast';
import { addHashTagsToDB } from 'actions/tagsActions'
import { addPlaceToDBIfNotExists } from 'actions/autoSuggestActions'
import { 
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE
} from 'reducers/types'
import {showLogInScreen} from 'actions/commonActions'
import { getTagsFromContent } from 'commonUtils'
import Dialog from 'react-bootstrap-dialog'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class createIdeaButton extends Component {
  constructor(props){
    super(props)

    this.state = {
      show: false
    }
  }

  handleCreateIdeaClick = (event) => {
    if(!this.props.loggedIn){
      showLogInScreen();
      return
    }

    this.props.isIdeaTitleExists(this.props.title, this.isTitleExistsCallback);

    this.error = ""
    this.props.dispatch({ type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE, payload: true });
    
    
    //add validation for empty fields / wrong
    if(this.props.isCreateButtonEnabled){
      
    }
  }

  createIdea = () => {
    var tags = getTagsFromContent(this.props.content);

    const newItem = {
      title: this.props.title,
      content: this.props.content,
      createdBy: this.props.userID,
      createdIn: "web",
      place: this.props.place,
      minTime: this.props.minTime,
      maxTime: this.props.maxTime,
      minNumOfPeople: this.props.minNumOfPeople,
      maxNumOfPeople: this.props.maxNumOfPeople,
      tags: tags,
    };

    // Add item via createItem action
    this.props.addIdeaToDB(newItem, this.props.userID);
    if(tags.length > 0){
      this.props.addHashTagsToDB(tags)
    }
    this.props.addPlaceToDBIfNotExists(this.props.place)

    this.closeAlert()
  }

  isTitleExistsCallback = (isTitleExists) => {
    if(!isTitleExists){
      this.createIdea()
    }else{
      this.showAlert()
      
    }
  }

  closeAlert = () => {
    this.setState({show: false})
  }

  showAlert = () => {
    this.setState({show: true})
  }

    

  render() {
    return (
        <React.Fragment>
          <div id="createIdeaButtonContainer" className="inlineBlock">
            <div id="createIdeaButton" className="inlineBlock" onClick={this.handleCreateIdeaClick}> create </div>
              <Modal show={this.state.show} onHide={this.closeAlert}>
                <Modal.Header closeButton>
                  <Modal.Title>Title exists</Modal.Title>
                </Modal.Header>
                <Modal.Body>Create?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closeAlert}>
                    Close
                  </Button>
                  <Button variant="secondary" onClick={this.createIdea}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>
            <div className="invisible"> error </div>
          </div>
        </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
      addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch),
      updateTags: bindActionCreators (updateTags, dispatch),
      addHashTagsToDB: bindActionCreators (addHashTagsToDB, dispatch),
      addPlaceToDBIfNotExists: bindActionCreators (addPlaceToDBIfNotExists, dispatch),
      isIdeaTitleExists: bindActionCreators (isIdeaTitleExists, dispatch),
      dispatch,
    }
  }

  function mapStateToProps(state) {
    return {
      title: state.editableIdeaReducer.title,
      content: state.editableIdeaReducer.content,
      place: state.editableIdeaReducer.place,
      minTime: state.editableIdeaReducer.minTime,
      maxTime: state.editableIdeaReducer.maxTime,
      minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
      maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
      userID: state.userPageReducer.loggedInUserID,
      tags: state.editableIdeaReducer.tags,
      isCreateButtonEnabled: state.editableIdeaReducer.isButtonEnabled,
      loggedIn: state.commonReducer.loggedIn,

    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
