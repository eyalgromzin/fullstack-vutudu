import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'

export default class FirebaseImage extends Component {
  constructor(props){
    super(props)

    this.updating = false;

    this.state = {
      firebasePath: "",
      imageSrc: "",
      isToShowLoader: false,   
    }
  }

  updateImage = async (firebasePath) => {
    // this.setState({imageSrc: "" });
    var thisObject = this
    var imageref = storageRef.child(firebasePath);
    await imageref.getDownloadURL().then(url => {
      this.updating = false
      thisObject.setState({
          imageSrc: url,
        })
    })
  }

  componentDidMount(){
    if(this.props.firebasePath != "" && this.state.imageSrc == ""){
      this.setState({
        firebasePath: this.props.firebasePath
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.firebasePath != this.state.firebasePath && !this.updating){    
      this.updating = true
      this.updateImage(nextProps.firebasePath)
      this.setState({firebasePath: nextProps.firebasePath})
    }      

    return true
  }

  render() {
    let firebaseImage = <div></div>
    
    if(this.state.imageSrc == "" || this.props.firebasePath == "" || this.updating){
      firebaseImage = <img src={require("images/loading2.gif")} className={this.props.imageClassName} id="ideaCardImageLoader" alt="" />
    }else{
      firebaseImage = <img src={this.state.imageSrc} className={this.props.imageClassName} onClick={() => this.props.onClick()} />
    }

    return (
      <div>
        {firebaseImage}
      </div>
    );
  }
}