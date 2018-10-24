import React, { Component } from 'react'
import './placeSelector.css';
import '../searchBarCommonStyles.css'

export default class PlaceSelector extends Component {
  constructor(props){
    super(props);

    this.state = {
      place: ''
    }

    this.handleOnChange = props.onChangeEvent;  
  }

  render() {
    return (
      <React.Fragment >
       {/* <div class="searchBarChooserContainer">
         <div class="searchBarChooserData">
           <div> */}
            {/* <img src={require("images/placeIcon.png")} class="searchBarIcon verticalMiddleAlign" /> */}
            <input id="placeInput" className={this.props.cssClass} placeholder="Place" type="text" onChange={this.handleOnChange}  />
           {/* </div>
         </div>
       </div> */}
      </React.Fragment >
    )
  }
}
