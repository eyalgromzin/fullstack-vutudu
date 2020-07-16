import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'

class FirebaseImage extends Component {
  constructor(props){
    super(props)

    this.updating = false;

    this.state = {
      firebasePath: this.props.firebasePath,
      imageSrc: "",   
    }
  }

  updateImage = async (firebasePath) => {
    var thisObject = this
    var imageref = storageRef.child(firebasePath);
    await imageref.getDownloadURL().then(url => {
      this.updating = false
      thisObject.setState({
          imageSrc: url,
        })
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if((nextProps.firebasePath !== undefined && this.state.imageSrc == "" && !this.updating) ||
        (this.state.firebasePath != nextProps.firebasePath)){
      this.updating = true
      this.updateImage(this.props.firebasePath)
      this.setState({firebasePath: this.props.firebasePath})
    }
    

    return true
  }

  render() {
    return (
      <div>
        {this.state.imageSrc == ""? 
          <img src={require("images/loading2.gif")} id="ideaCardImageLoader" alt="" />
          :
          <img src={this.state.imageSrc} className="contentImage" />
        }        
      </div>
    );
  }
}
  
export default FirebaseImage;