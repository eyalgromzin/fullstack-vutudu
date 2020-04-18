import React, { Component } from 'react'
import { addIdeaToDB, updateTags } from 'actions/ideaActions';
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

class createIdeaButton extends Component {
  handleCreateIdeaClick = (event) => {
    if(!this.props.loggedIn){
      showLogInScreen();
    }

    this.error = "";
    this.props.dispatch({ type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE, payload: true });
    var tags = getTagsFromContent(this.props.content);
    
    //add validation for empty fields / wrong
    if(this.props.isCreateButtonEnabled){
      const newItem = {
        // name: this.props.title,
        title: this.props.title,
        content: this.props.content,
        createdBy: this.props.userID,
        place: this.props.place,
        time: this.props.time,
        minNumOfPeople: this.props.minNumOfPeople,
        maxNumOfPeople: this.props.maxNumOfPeople,
        tags: tags,
      };

      let myColor = { background: '#0E1717', text: "#FFFFFF" };
      
      // Add item via createItem action
      this.props.addIdeaToDB(newItem, this.props.userID);
      if(tags.length > 0){
        this.props.addHashTagsToDB(tags)
      }
      this.props.addPlaceToDBIfNotExists(this.props.place)
    }
  }

    

  render() {
    return (
        <React.Fragment>
          <div id="createIdeaButtonContainer" className="inlineBlock">
            <div id="createIdeaButton" className="inlineBlock" onClick={this.handleCreateIdeaClick}> create </div>
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
      dispatch,
    }
  }

  function mapStateToProps(state) {
    return {
      title: state.editableIdeaReducer.title,
      content: state.editableIdeaReducer.content,
      createdBy: state.userPageReducer.loggedInUserID,
      place: state.editableIdeaReducer.place,
      time: state.editableIdeaReducer.time,
      minNumOfPeople: state.editableIdeaReducer.minNumOfPeople,
      maxNumOfPeople: state.editableIdeaReducer.maxNumOfPeople,
      userID: state.userPageReducer.loggedInUserID,
      tags: state.editableIdeaReducer.tags,
      isCreateButtonEnabled: state.editableIdeaReducer.isButtonEnabled,
      loggedIn: state.commonReducer.loggedIn,

    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
