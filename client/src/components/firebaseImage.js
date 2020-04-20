import React, { Component } from 'react';
import { storageRef } from 'commonUtils'

class FirebaseImage extends Component {
  constructor(props){
    super(props)

    this.state = {
      src: ""
    }
  }

  updateImage = async () => {
    var thisObject = this
    var imageref = storageRef.child(this.props.firebasePath);
    await imageref.getDownloadURL().then(function(url) {
      thisObject.setState({
            src: url
        });
    });
  }

  componentDidMount(){
    this.updateImage()
  }

  render() {
    return (
      <div>
        <img src={this.state.src} className="contentImage" />
      </div>
    );
  }
}
  
export default FirebaseImage;