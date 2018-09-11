import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import { connect } from 'react-redux'
import { SAVE_IDEAS } from 'reducers/ideasReducer'

// var search = searchInDB;

class SearchButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: 'bus station',
      time: 5,
      numOfPeople: 1,
      more: '#productive',      
    }

    this.saveIdeasToRedux = this.saveIdeasToRedux.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  saveIdeasToRedux(ideas){
    this.props.dispatch({ type: "SAVE_IDEAS", 
                            payload: ideas 
                          });
  }

  handleSearchClick(){
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

  export default connect(mapStateToProps)(SearchButton);
