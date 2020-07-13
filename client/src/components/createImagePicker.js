import React, { Component, createRef } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'
import './createCopmonent/createIdeaLayout.css'
import store from 'store'
import {getBase64} from 'common.js'
import {
    EDITABLE_IDEA_SET_IMAGE_BASE64,
    EDITABLE_IDEA_SET_IMAGE_NAME
} from 'reducers/types';

export default class CreateTextField extends Component {
    constructor(props){
        super(props)

        this.inputRef = createRef()
    
        this.state = {
          imageBase64: "",
          isValid: true,
          isImageSelected: false,
          imageSrc: require("images/imageIcon.png"),
        }
    }

    validate = () => {
        if(!this.state.isImageSelected){
            this.setState({isValid: false})
            return false
        }

        this.setState({isValid: true})
        return true
    }

    
  handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      console.log(file);
    }
  };



    onChangeFile = (event) => {
        this.setState({
            isImageSelected: true,
            isValid: true
        })
        event.stopPropagation();
        event.preventDefault();
        var files = event.target.files;
        var file = event.target.files[0];
        this.setState({imageFile: file}); /// if you want to upload latter
        console.log(file)
        getBase64(file, result => {
            var base64Image = result
            this.setState({imageBase64: base64Image}) 

            //save base 64 to redux
            store.dispatch({type: EDITABLE_IDEA_SET_IMAGE_BASE64, payload: base64Image});  

            //save file name to redux
            store.dispatch({type: EDITABLE_IDEA_SET_IMAGE_NAME, payload: file.name});  
            
        })

        let imageUrl = URL.createObjectURL(files[0])
        this.setState({imageSrc: imageUrl})
    }

    loadImage = () => {
        this.inputRef.click();
    }

    clear = () => {
        this.setState({
            imageSrc: require("images/imageIcon.png"),
            imageBase64: "",
            isImageSelected: false,
        })
    }

    render () {
        return (
            <React.Fragment>
                <input type="file" accept="image/*" onChange={this.onChangeFile} 
                    multiple = "false" style={{display: "none"}} ref={input => this.inputRef = input} 
                />
                <img  id="createIdeaImagePickerImage" src={this.state.imageSrc} alt="" 
                      onClick={this.loadImage} 
                      className={this.state.isValid? this.props.class : this.props.class + " errorBackground"}
                      />
            </React.Fragment>
        )
    }
}