import React, { Component } from 'react'
import './userIdeasList.css'
import ReactList from 'react-list';
import { connect } from 'react-redux';

class UserIdeasList extends Component {
  
  renderItem = (index, key) => {  //key is running number
    return <div key={key} onClick={() => this.userIDeaClicked(this.props.likedIdeasData[index])} class="listRow">{this.props.likedIdeasData[index].title}</div>;
  }

  userIDeaClicked = (account) => {
    console.log("clicked " + account.name);
  }

  // state = {
  //   // accounts: [{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},
  //   // {name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},
  //   // {name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},{name:'asdasd'},]
  //   accounts: this.props.likedIdeasData
  // };

  render() {
    return (
      <React.Fragment>
        <div style={{overflow: 'auto', maxHeight: 525}}>
          <div class="listOutline">
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props.likedIdeasData == null? 0 : this.props.likedIdeasData.length}
              type='uniform'
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    likedIdeasData: state.userReducer.likedIdeasData,
  };
}

export default connect(mapStateToProps)(UserIdeasList)