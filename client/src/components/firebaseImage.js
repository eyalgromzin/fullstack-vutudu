import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'

class FirebaseImage extends Component {
  constructor(props){
    super(props)

    this.state = {
      propsSrc: this.props.firebasePath,
      cloudImageSrc: "",   
      isLoading: false   
    }
  }

  updateImage = async () => {
    var thisObject = this
    var imageref = storageRef.child(this.props.firebasePath);
    this.setState({isLoading: true})
    await imageref.getDownloadURL().then(function(url) {
      thisObject.setState({
          cloudImageSrc: url,
          isLoading: false
        })
    })
  }

  render() {
    if(this.state.propsSrc != this.props.firebasePath){
      this.setState({propsSrc: this.props.firebasePath})
      this.updateImage()
    }
  
    return (
      <div>
        {this.state.isLoading? 
          <img src={require("images/loading2.gif")} id="ideaCardImageLoader" alt="" />
          :
          <img src={this.state.cloudImageSrc} className="contentImage" />
        }
        
      </div>
    );
  }
}
  
export default FirebaseImage;