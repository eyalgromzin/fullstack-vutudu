import React, { Component } from 'react'
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
import {getTagsFromText} from './methods'
import Popup from 'reactjs-popup'

class EditableIdeaCard extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      error:"",
      isShowErrorOnBlur: false,
      titleText: '',
      contentText: '',
      isShowTitleErrorOnBlur: false,
      isShowContentErrorOnBlur: false
    }
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
    return this.state.titleText.length > 2
  }

  calculateIsContentValid = () => {
    return this.state.contentText.length > 2
  }

  onTitleBlur = (e) => {
    if (this.state.titleText.length == 0 || this.calculateIsTitleValid()){
      this.setState({isShowTitleErrorOnBlur: false})
    }else{
      this.setState({isShowTitleErrorOnBlur: true})
    }
  }

  onContentBlur = (e) => {
    if (this.state.contentText.length == 0 || this.calculateIsContentValid()){
      this.setState({isShowContentErrorOnBlur: false})
    }else{
      this.setState({isShowContentErrorOnBlur: true})
    }
  }

  render() {
    var isShowTitleError = ((this.props.isClickedButton && !this.calculateIsTitleValid()) || this.state.isShowTitleErrorOnBlur)
    var isShowContentError = ((this.props.isClickedButton && !this.calculateIsContentValid()) || this.state.isShowContentErrorOnBlur)

    return (
      <React.Fragment>
        <div id="createIdeaContainer">
          <div id="createIdeaCard"> 
            <div id="createIdeaCardContent">
              <div>
                <input type="text" 
                  id="newIdeaTitle" 
                  value={this.props.title == null? "" : this.props.title } 
                  placeholder="Title..." 
                  onBlur={this.onTitleBlur}
                  onChange={this.handleOnTitleChange}/>
                <Popup
                  trigger={<img src={require("images/info.png")} id="createInfoButton"/>}
                  position="right top"
                  on="hover">
                  <div id="infoButton">
                    <div id="infoButtonTitle">Tips </div>
                    <div id="infoContent">
                      <div>* be specific</div>
                      <div>* be brief</div>
                      <div>* add youtube, image links for clarity</div>
                    </div>
                  </div>
                </Popup>
              </div>
              {isShowTitleError? <div class="fieldError"> 10+ letters </div> : "" }
              <textarea 
              type="text" id="newIdeaContent" 
              value={this.props.content == null ? "" : this.props.content }
              placeholder="Content..." 
              onBlur={this.onContentBlur}
              onChange={this.handleOnContentChange}/>
              {isShowContentError? <div class="fieldError"> 10+ letters</div> : '' }
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
    title: state.editableIdeaReducer.title,
    content: state.editableIdeaReducer.content,
    place: state.editableIdeaReducer.place,
    time: state.editableIdeaReducer.time,
    minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
    userID: state.userPageReducer.loggedInUserID,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditableIdeaCard);  