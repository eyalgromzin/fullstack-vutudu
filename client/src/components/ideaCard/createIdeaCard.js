import React, { Component } from 'react'
import IdeaAttachmentsButton from './cardButtons/addAttachmentButton/addAttachmentButton'
import IdeaPlace from './cardButtons/placeButton/placeButton'
import './createIdeaCard.css'
import { connect } from 'react-redux';
import { NEW_IDEA_SET_TITLE,NEW_IDEA_SET_CONTENT } from 'reducers/types'
import 'commonCss.css'
import { addIdeaToDB } from 'actions/ideaActions';
import PropTypes from 'prop-types';
import {  Creators } from 'redux';
import store from 'store'
import { bindActionCreators } from 'redux';

class CreateIdeaCard extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  
    this.state={
      error:"",
      isHasError: false
    }
  }

  handleChange(event) {
    // this.setState({value: event.target.value})
  }

  handleCreateIdeaClick = (event) => {
    this.error = "";
    this.isHasError = false;
    
    //add validation for empty fields / wrong

    if(!this.isHasError){
      const newItem = {
        // name: this.props.title,
        title: this.props.title,
        content: this.props.content,
        createdBy: this.props.userID,
        place: this.props.place,
        minTime: this.props.minTime,
        maxTime: this.props.maxTime,
        minNumOfPeople: this.props.minNumOfPeople,
        maxNumOfPeople: this.props.maxNumOfPeople,
      };

      // Add item via createItem action
      this.props.addIdeaToDB(newItem, this.props.userID);

      
    }
  }

  extractTagsFromContent = () => {
    var contentText = this.props.content;
    var words = contentText.split(" ");
    var tags = [];

    for (var i = 0; i < words.length; i++) {
      if(words[i].startsWith("#")){
        tags.push(words[i]);
      }
    }

    return tags;
  }

  isHasError = false;

  handleOnTitleChange = (e) => {
    store.dispatch({type: NEW_IDEA_SET_TITLE, payload: e.target.value});  
  }

  handleOnContentChange = (e) => {
    store.dispatch({type: NEW_IDEA_SET_CONTENT, payload: e.target.value});
  }

  render() {
    return (
      <React.Fragment>
        <div id="createIdeaContainer">
          <div id="ideaCard"> 
            <div id="ideaCardContent">
              <input type="text" id="newIdeaTitle" placeholder="<title>" onChange={this.handleOnTitleChange}/>
              <textarea type="text" id="newIdeaContent" placeholder="<content>" onChange={this.handleOnContentChange}/>
            </div>
          </div>
          <div id="newIdeaError"> {this.state.error} </div>
          <div class="alignRight">
            <div id="createIdeaButton" onClick={this.handleCreateIdeaClick}> create </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.newIdeaReducer.title,
    content: state.newIdeaReducer.content,
    place: state.newIdeaReducer.place,
    minTime: state.newIdeaReducer.minTime,
    maxTime: state.newIdeaReducer.maxTime,
    minNumOfPeople: state.newIdeaReducer.minNumOfPeople,
    maxNumOfPeople: state.newIdeaReducer.maxNumOfPeople,
    userID: state.userReducer.loggedInUserID,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch)
  }
}

CreateIdeaCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  place : PropTypes.string,
  minTime : PropTypes.number,
  maxTime : PropTypes.number,
  minNumOfPeople : PropTypes.number,
  maxNumOfPeople : PropTypes.number
};



export default connect(mapStateToProps,mapDispatchToProps)(CreateIdeaCard);  // ,mergeProps    //,mapDispatchToProps