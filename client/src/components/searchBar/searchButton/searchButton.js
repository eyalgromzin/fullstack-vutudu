import React, { Component } from 'react'
import './searchButton.css'
import '../searchBarCommonStyles.css'
import { searchItems } from 'actions/itemActions'
import { connect } from 'react-redux'
import { SAVE_IDEAS } from 'reducers/ideasReducer'

class SearchButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: 'bus station',
      time: 5,
      numOfPeople: 1,
      more: '#productive',      
    }
  }

  handleSearchClick = () => {
    this.props.searchItems(this.props.place,this.props.time,this.props.numOfPeople);
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

  export default connect(mapStateToProps, {searchItems})(SearchButton);
