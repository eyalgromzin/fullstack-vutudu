import React, { Component } from 'react'
import { addIdeaToDB } from 'actions/ideaActions';

export default class createIdeaButton extends Component {
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

  render() {
    return (
        <div class="alignRight">
            <div id="createIdeaButton" onClick={this.handleCreateIdeaClick}> create </div>
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
      title: state.newIdeaReducer.title,
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(createIdeaButton);  // ,mergeProps    //,mapDispatchToProps
