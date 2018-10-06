import React, { Component } from 'react'
import IdeaAttachmentsButton from './cardButtons/addAttachmentButton/addAttachmentButton'
import IdeaPlace from './cardButtons/placeButton/placeButton'
import './createIdeaCard.css'
import { connect } from 'react-redux';
import { NEW_IDEA_SET_TITLE,NEW_IDEA_SET_CONTENT } from 'reducers/types'
import 'commonCss.css'
// import { addItem,updateTitle,updateContent } from 'actions/itemActions';
import PropTypes from 'prop-types';
import {  Creators } from 'redux';
import store from 'store'
import { bindActionCreators } from 'redux';

class CreateIdeaCard extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateIdeaClick = this.handleCreateIdeaClick.bind(this);
    this.extractTagsFromContent= this.extractTagsFromContent.bind(this);
    this.handleOnTitleChange= this.handleOnTitleChange.bind(this);
    this.handleOnContentChange= this.handleOnContentChange.bind(this);

    this.state={
      error:"",
      isHasError: false
    }
  }

  handleChange(event) {
    // this.setState({value: event.target.value})
  }

  handleCreateIdeaClick(event) {
    this.error = "";
    this.isHasError = false;
    
    //add validation for empty fields / wrong

    if(!this.isHasError){
      const newItem = {
        // name: this.props.title,
        title: this.props.title,
        content: this.props.content,
        place: this.props.place,
        minTime: this.props.minTime,
        maxTime: this.props.maxTime,
        minNumOfPeople: this.props.minNumOfPeople,
        maxNumOfPeople: this.props.maxNumOfPeople,
        likes:0,
        dislikes:0,
        hardCount:0,
        easyCount:0
      };

      // Add item via addItem action
      // this.props.addItem1(newItem);
    }
  }

  extractTagsFromContent(){
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

  handleOnTitleChange(e){
    store.dispatch({type: NEW_IDEA_SET_TITLE, payload: e.target.value});  
  }

  handleOnContentChange(e){
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


      {/* <div id="createIdeaContainer">
        <div id="ideaCard">
          <table id="createIdeaTable">
            <tr >
              <input type="text" id="newIdeaTitle" placeholder="<title>" onChange={this.handleOnTitleChange}/>
              
            </tr>
            <tr>
              <textarea type="text" id="newIdeaContent" placeholder="<content>" onChange={this.handleOnContentChange}/>
            </tr>
          </table>
        </div>
        <div class="alignRight">
          <div id="createIdeaButton" onClick={this.handleCreateIdeaClick}> create </div>
        </div>
      </div> */}
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
  };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     addItem1: bindActionCreators (addItem, dispatch)
//   }
// }

CreateIdeaCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  place : PropTypes.string,
  minTime : PropTypes.number,
  maxTime : PropTypes.number,
  minNumOfPeople : PropTypes.number,
  maxNumOfPeople : PropTypes.number
};



export default connect(mapStateToProps)(CreateIdeaCard);  // ,mergeProps    //,mapDispatchToProps