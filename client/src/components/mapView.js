import React, { Component } from 'react';
import { storageRef } from 'commonUtils'

class MapView extends Component {
  constructor(props){
    super(props)

    this.state = {
      lat: "",
      lang: "",
    }
  }

  updateMap = async () => {
    
  }

  componentDidMount(){
    this.updateMap()
  }

  render() {
    return (
      <div>
        <img src={this.state.src} className="contentImage" />
      </div>
    );
  }
}
  
export default MapView;