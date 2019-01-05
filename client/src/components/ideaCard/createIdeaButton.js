import React, { Component } from 'react'
import { addIdeaToDB, updateTags } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';
import { addHashTagsToDB } from 'actions/tagsActions'
import { addPlaceToDBIfNotExists } from 'actions/placeNameActions'

class createIdeaButton extends Component {
  getTagsFromContent = (inputText) => {  //http://geekcoder.org/js-extract-hashtags-from-text/
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
  }

  handleCreateIdeaClick = (event) => {
      this.error = "";
      this.isHasError = false;
      
      var tags = this.getTagsFromContent(this.props.content);

      //add validation for empty fields / wrong
      if(!this.isHasError){
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
        notify.show('Idea Created!', "success", 1000, myColor);

        // Add item via createItem action
        this.props.addIdeaToDB(newItem, this.props.userID);
        this.props.addHashTagsToDB(tags)
        this.props.addPlaceToDBIfNotExists(this.props.place)
      }
    }

    

  render() {
    return (
        <div className="alignRight">
          <div id="createIdeaButton" onClick={this.handleCreateIdeaClick}> create </div>
          <Notifications options={{zIndex: 200, top: '35px' , wrapperId:'toastWrapperID', id:'toastID' ,animationDuration: 2000 }} />
        </div>
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
      title: state.editedIdeaReducer.title,
      content: state.editedIdeaReducer.content,
      createdBy: state.userPageReducer.loggedInUserID,
      place: state.editedIdeaReducer.place,
      time: state.editedIdeaReducer.time,
      minNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
      maxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,
      userID: state.userPageReducer.loggedInUserID,
      tags: state.editedIdeaReducer.tags,
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
