import React, { Component, useState, createRef  } from 'react'
import IdeaAttachmentsButton from './cardButtons/addAttachmentButton/addAttachmentButton'
import './editIdeaCard.css'
import { connect } from 'react-redux';
import { EDITABLE_IDEA_SET_TITLE,
  EDITABLE_IDEA_SET_CONTENT,
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
  PREVIEWED_IDEA_SET_TITLE,
  PREVIEWED_IDEA_SET_CONTENT,
  EDITABLE_IDEA_SET_TAGS,
} from 'reducers/types'
import 'commonCss.css'
import { addIdeaToDB } from 'actions/ideaActions';
import store from 'store'
import { bindActionCreators } from 'redux';
import './ideaCard.css'
import {convertJsonContentToHtml} from 'commonUtils'
import Popup from 'reactjs-popup'
import JoditEditor from "jodit-react";

class EditableIdeaCard extends Component {
  editor = createRef();
  	
  // readonly: false, // all options from https://xdsoft.net/jodit/doc/
	config = {
    buttons: [ "strikethrough",'underline', 'italic', 'ul', 'ol', 'left', 'center', 'right', 
                'undo', 'redo', 'image', 'video', 'link', 'fullsize' ],
    iframeStyle: 'html{margin: 20px; background-color: slategrey;} body{margin: 20px; background-color: red;} ' + 
                'jodit_statusbar{visibility: hidden;}'
  }
  
  content = ''

  constructor(props){
    super(props)

    this.editor = null;
    this.setEditor = element => {
      this.editor = element;
      this.editor.buttons = []
    };
    
    this.state = {
      error:"",
      isShowErrorOnBlur: false,
      titleText: '',
      contentText: '',
      isShowTitleErrorOnBlur: false,
      isShowContentErrorOnBlur: false,
      isClickedButton: false,
      imageFiles: "",
      imageUrls: "",
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.title != this.state.titleText){
      this.setState({titleText: nextProps.title})
      return true
    }

    if(nextProps.content != this.state.contentText){
      this.setState({contentText: nextProps.content})
      return true
    }

    if(nextProps.isClickedButton != this.state.isClickedButton){
      this.setState({isClickedButton: nextProps.isClickedButton})
      return true
    }

    return false
  }  

  handleOnTitleChange = (e) => {
      this.setState({titleText: e.target.value}) 
      store.dispatch({type: EDITABLE_IDEA_SET_TITLE, payload: e.target.value});  
  }

  handleOnContentChange = (e) => {
    this.setState({contentText: e.target.value}) 
    store.dispatch({type: EDITABLE_IDEA_SET_CONTENT, payload: e.target.value});
  }

  calculateIsTitleValid = () => {
    return this.state.titleText.length >= 5 && this.state.titleText.length <= 50
  }

  calculateIsContentValid = () => {
    return this.state.contentText.length >= 10 && this.state.contentText.length <= 1000
  }

  onTitleBlur = (e) => {
    if (this.state.titleText.length == 0 || this.calculateIsTitleValid()){
      this.setState({isShowTitleErrorOnBlur: false})
    }else{
      this.setState({isShowTitleErrorOnBlur: true})
    }
  }

  attachImage = () => {
    this.uploadFile()
  }

  onContentBlur = (e) => {
    if (this.state.contentText === undefined || 
      this.state.contentText.length == 0 || 
      this.calculateIsContentValid()){
        this.setState({isShowContentErrorOnBlur: false})
    }else{
      this.setState({isShowContentErrorOnBlur: true})
    }
  }

  uploadFile = () => {
    this.refs.fileUploader.click();
  }

  onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var files = event.target.files;
    console.log(files)
    this.setState({imageFiles: files}); /// if you want to upload latter

    for (const file of files) {
      URL.createObjectURL(file)
    }
  }

  async handleSave () {
    // const savedData = await this.editor.save()
    // var s = 3
  }

  componentDidMount() {
    // this.editor = this.editorInstance
    // var x = 4
  }

  setContent = (newContent) => {
    this.setState({ contentText: newContent}) 
    store.dispatch({ type: EDITABLE_IDEA_SET_CONTENT, payload: newContent});
  }

  

  render() {
    var isShowTitleError = ((this.props.isClickedButton && !this.calculateIsTitleValid()) || 
      this.state.isShowTitleErrorOnBlur) 
    var TitleErrorMessage = "5-50 letters"
    var isShowContentError = ((this.props.isClickedButton && !this.calculateIsContentValid()) || this.state.isShowContentErrorOnBlur)

    var editorValue = this.props.idea.content

    return (
      <React.Fragment>
        <input type="file" id="file" ref="fileUploader" onChange={this.onChangeFile} style={{display: "none"}}/>
        <div id="createIdeaCardContent">
          <div id="createIdeaTitleContainer">
            <input type="text" 
              id="newIdeaTitle" 
              value={this.props.title == null? "" : this.props.title } 
              placeholder="Title..." 
              onBlur={this.onTitleBlur}
              onChange={this.handleOnTitleChange}/>
            <Popup
              trigger={<img src={require("images/info.png")} alt="" id="createInfoButton"/>}
              position="top center"
              on="hover">
              <div id="tooltip">
                <div id="infoButtonTitle">Tips </div>
                <div id="infoContent">
                  <div>* Be specific</div>
                  <div>* Be brief</div>
                  <div>* Add youtube, image links for clarity</div>
                  <div>* Links are translated to images and videos and maps</div>
                  <div>* Add #HashTags in the content for easier finding</div>
                </div>
              </div>
            </Popup>
          </div>
          {isShowTitleError? <div id="createIdeaTitle" className="fieldError"> {TitleErrorMessage} </div> : "" }
          <div id="contentTextAreaWithAttach">
            <div id="contentEditor">
            <JoditEditor
              ref={this.editor}
              value={ editorValue }
              config={ this.config }
              tabIndex={ 1 } // tabIndex of textarea
              onBlur={newContent => this.setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => this.setContent(newContent)}
            />
              
            </div>
          </div>
          {/* <div onClick={this.handleSave}> save </div> */}
          {isShowContentError? <div className="fieldError"> 10-1000 letters</div> : '' }
        </div>
        <div id="newIdeaError"> {this.state.error} </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.editableIdeaReducer.title,
    content: state.editableIdeaReducer.content,
    place: state.editableIdeaReducer.place,
    time: state.editableIdeaReducer.time,
    minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
    userID: state.userPageReducer.loggedInUserID,
    idea: state.editableIdeaReducer.idea,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditableIdeaCard);  