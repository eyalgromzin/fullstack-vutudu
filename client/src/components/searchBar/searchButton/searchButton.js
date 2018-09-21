import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import { searchItems } from 'actions/itemActions'
import { connect } from 'react-redux'
import { SAVE_IDEAS } from 'reducers/ideasReducer'
import { addItem } from 'actions/itemActions';


class SearchButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: 'bus station',
      time: 5,
      numOfPeople: 1,
      more: '#productive',      
    }

    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  // saveIdeasToRedux(ideas){
  //   // this.props.dispatch({ type: "SAVE_IDEAS", 
  //   //                         payload: ideas 
  //   //                       });
  // }

  handleSearchClick(){
    this.props.searchItems(this.props.place,this.props.time,this.props.numOfPeople);


    //suppose to work
    // const newItem = {
    //   name: this.state.name
    // };

    // // Add item via addItem action
    // this.props.addItem(newItem);


    //get from redux the search criterias - done by map state to props
    //get from the DB results according to this criteria
    // var results = searchInDB(this.props.place,this.props.time,this.props.numOfPeople,this.props.more);

    //save to redux all current ideas
    // this.saveIdeasToRedux(results);

    //load ideas in the page.
    
  }

  render() {
    return (
      <a>
      <div class="displayInlineBlock hoverClickHand" id="searchButton"  onClick={this.handleSearchClick}>
        search
      </div>
      </a>
    )
  }
}

function mapStateToProps(state) {
    return {
      place: state.searchReducer.place,
      time: state.searchReducer.time,
      numOfPeople: state.searchReducer.numOfPeople,
      more: state.searchReducer.more,
    };
  }

  export default connect(mapStateToProps, {addItem, searchItems})(SearchButton);
