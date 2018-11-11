import React, { Component } from 'react'
import { addIdeaToDB } from 'actions/ideaActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';

class createIdeaButton extends Component {
  

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
            tags: this.props.tags,
          };
    
          let myColor = { background: '#0E1717', text: "#FFFFFF" };
          notify.show('Idea Created!', "success", 1000, myColor);

          // Add item via createItem action
          this.props.addIdeaToDB(newItem, this.props.userID);

          this.props.updateTags();
        }
      }

    

  render() {
    return (
        <div class="alignRight">
          <div id="createIdeaButton" onClick={this.handleCreateIdeaClick}> create </div>
          <Notifications options={{zIndex: 200, top: '35px' , wrapperId:'toastWrapperID', id:'toastID' ,animationDuration: 2000 }} />
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
      addIdeaToDB: bindActionCreators (addIdeaToDB, dispatch)
    }
  }

  function mapStateToProps(state) {
    return {
      title: state.editedIdeaReducer.title,
      content: state.editedIdeaReducer.content,
      createdBy: state.userPageReducer.loggedInUserID,
      place: state.editedIdeaReducer.place,
      minTime: state.editedIdeaReducer.minTime,
      maxTime: state.editedIdeaReducer.maxTime,
      minNumOfPeople: state.editedIdeaReducer.minNumOfPeople,
      maxNumOfPeople: state.editedIdeaReducer.maxNumOfPeople,
      userID: state.userPageReducer.loggedInUserID,
      tags: state.editedIdeaReducer.tags,
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);
