import React, { Component } from 'react'
import { addIdeaToDB, updateTags, isIdeaTitleExists } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'commonCss.css'
import './editIdeaCard.css'
import {notify} from 'react-notify-toast';
// import { addHashTagsToDB } from 'actions/subjectsActions'
import { addPlaceToDBIfNotExists } from 'actions/autoSuggestActions'
import { 
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE
} from 'reducers/types'
import { showLogInScreen } from 'actions/commonActions'
import { getTagsFromContent } from 'commonUtils'
import Dialog from 'react-bootstrap-dialog'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {toastr} from 'react-redux-toastr'
import 'bootstrap/dist/css/bootstrap.min.css';
import { uploadBase64ImageToStorage } from 'commonUtils'

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

    this.props.placesRef.validate() 
    this.props.timeRef.validate()
    this.props.numOfPeopleRef.validate() 
    this.props.subjectsRef.validate() 
    this.props.imagePickerRef.validate() 
    this.props.titleRef.validate()

    if(this.props.placesRef.validate() &&
        this.props.timeRef.validate() &&
        this.props.numOfPeopleRef.validate() &&
        this.props.subjectsRef.validate() &&
        this.props.imagePickerRef.validate() && 
        this.props.titleRef.validate()){

      this.props.isIdeaTitleExists(this.props.title, this.isTitleExistsCallback);

      this.error = ""
      this.props.dispatch({ type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE, payload: true });

    }
  }
  
  clearFields = () => {
    this.props.timeRef.clear() 
    this.props.numOfPeopleRef.clear() 
    this.props.subjectsRef.clear() 
    this.props.placesRef.clear() 
    this.props.imagePickerRef.clear() 
    this.props.titleRef.clear()
  }
  uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  createIdea = () => {
    //upload image to firebase 
    

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
      subjects: [],
    };

    let cloudImagePath = "images/" + this.uuidv4() + this.props.imageName
    uploadBase64ImageToStorage(this.props.imagePickerRef.state.imageBase64, cloudImagePath, 
      () => {
        // Add item via createItem action
        this.props.addIdeaToDB(newItem, this.props.userID)
        // if(subjects.length > 0){
        //   this.props.addHashTagsToDB(subjects)
        // }
        this.props.addPlaceToDBIfNotExists(this.props.place)

        this.clearFields()
        this.closeAlert()
      }
    )
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
      // addHashTagsToDB: bindActionCreators (addHashTagsToDB, dispatch),
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
      subjects: state.editableIdeaReducer.subjects,
      base64Image: state.editableIdeaReducer.base64Image,
      isCreateButtonEnabled: state.editableIdeaReducer.isButtonEnabled,      
      loggedIn: state.commonReducer.loggedIn,
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
