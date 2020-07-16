import React, { Component } from 'react'
import { addIdeaToDB, updateTags, isIdeaTitleExists, addIdeaToUserCreatedIdeas } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'commonCss.css'
import './editIdeaCard.css'
import {notify} from 'react-notify-toast';
// import { addHashTagsToDB } from 'actions/subjectsActions'
import { addPlaceToDBIfNotExists } from 'actions/autoSuggestActions'
import { 
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
  ADD_CREATED_IDEA_TO_USER
} from 'reducers/types'
import { showLogInScreen } from 'actions/commonActions'
import { getTagsFromContent } from 'commonUtils'
import Dialog from 'react-bootstrap-dialog'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {toastr} from 'react-redux-toastr'
import 'bootstrap/dist/css/bootstrap.min.css';
import { uploadBase64ImageToStorage } from 'commonUtils'
var ls = require('local-storage');


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

  

  createIdea = () => {
    var uniqueIdentifier = this.props.imagePickerRef.state.uniqueIdentifier

    let cloudImagePath = ""

    if(ls.get(uniqueIdentifier) != null){
      cloudImagePath = ls.get(uniqueIdentifier)
    }else{
      cloudImagePath = "images/" + this.uuidv4() + this.props.imagePickerRef.state.imageName
    }
    
    let content = '[{"first":"TEXT","fourth":"","second":0,"third":"' + this.props.contentRef.state.text + '"}, ' + 
                    '{"first":"IMAGE","fourth":"","second":1,"third":"' + cloudImagePath + '"}]'
    let places = this.props.placesRef.state.text.split(",")
    let subjects = this.props.subjectsRef.state.text.split(",")

    
    const newItem = {
      title: this.props.titleRef.state.text,
      content: content,
      createdBy: this.props.userID,
      createdIn: "web",
      places: places,
      createdOn: Date.now(),
      minTime: this.props.timeRef.state.minTime,
      maxTime: this.props.timeRef.state.maxTime,
      minNumOfPeople: this.props.numOfPeopleRef.state.minNumOfPeople,
      maxNumOfPeople: this.props.numOfPeopleRef.state.maxNumOfPeople,
      subjects: subjects,
    };

    var imageFileBase64 = this.props.imagePickerRef.state.imageBase64

    if(ls.get(uniqueIdentifier) != null){
      this.props.addIdeaToDB(newItem, this.props.userID,
      (createdIdea) => {        
        //dont know what is this for
        newItem._id = createdIdea._id

        this.props.dispatch({
        	type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
        	payload: false
        });

        this.props.addIdeaToUserCreatedIdeas(this.props.userID, newItem, 
          () => {
            this.props.dispatch({type: ADD_CREATED_IDEA_TO_USER, payload: newItem})
          }, 
          (error) => {
            console.log("failed addIdeaToUserCreatedIdeas " + error)
          })
        
        
      }, (error) => {
        console.log(error);
      })

      this.props.addPlaceToDBIfNotExists(this.props.place)
      
      this.closeAlert()
    }else{
      uploadBase64ImageToStorage(imageFileBase64, cloudImagePath, 
        () => {
          this.props.addIdeaToDB(newItem, this.props.userID)

          this.props.addPlaceToDBIfNotExists(this.props.place)

          this.closeAlert()

          ls.set(uniqueIdentifier, cloudImagePath) 
          ls.set(cloudImagePath, cloudImagePath) 
        }
      )
    }
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
      addIdeaToUserCreatedIdeas: bindActionCreators (addIdeaToUserCreatedIdeas, dispatch),
      dispatch,
    }
  }

  function mapStateToProps(state) {
    return {
      title: state.editableIdeaReducer.title,
      content: state.editableIdeaReducer.content,
      places: state.editableIdeaReducer.places,
      minTime: state.editableIdeaReducer.minTime,
      maxTime: state.editableIdeaReducer.maxTime,
      minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
      maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
      userID: state.userPageReducer.loggedInUserID,
      subjects: state.editableIdeaReducer.subjects,
      base64Image: state.editableIdeaReducer.base64Image,
      imageName: state.editableIdeaReducer.imageName,
      isCreateButtonEnabled: state.editableIdeaReducer.isButtonEnabled,      
      loggedIn: state.commonReducer.loggedIn,
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
