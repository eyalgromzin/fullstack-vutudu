import React, { Component, createRef } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'
import './createComponent/createIdeaLayout.css'
import store from 'store'
import {getBase64} from 'commonUtils'
import {
    EDITABLE_IDEA_SET_IMAGE_BASE64,
    EDITABLE_IDEA_SET_IMAGE_NAME
} from 'reducers/types';
import imageCompression from 'browser-image-compression';

export default class CreateTextField extends Component {
    constructor(props){
        super(props)

        this.inputRef = createRef()
    
        this.onChangeFile = this.onChangeFile.bind(this)
        this.compressAndSaveImageFile = this.compressAndSaveImageFile.bind(this)

        this.state = {
          imageBase64: "",
          isValid: true,
          isImageSelected: false,
          imageSrc: require("images/imageIcon.png"),
          uniqueIdentifier: ""
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

    compressAndSaveImageFile = (imageFile, compressedImage) => {
        
    }

    async onChangeFile(event){
        this.setState({
            isImageSelected: true,
            isValid: true
        })
        event.stopPropagation();
        event.preventDefault();
        var imageFiles = event.target.files;
        var imageFile = event.target.files[0];
        this.setState({imageFile: imageFile}); /// if you want to upload latter
        console.log(imageFile)

        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 720,
            useWebWorker: true
          }

        let self = this

        imageCompression(imageFile, options)
            .then(function (compressedImage) {
                console.log('compressedFile instanceof Blob', compressedImage instanceof Blob); // true
                console.log(`compressedFile size ${compressedImage.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        
                getBase64(compressedImage, result => {
                    var base64Image = result
                    self.setState({imageBase64: base64Image})   //needed for later ref usage
        
                    //save base 64 to redux
                    store.dispatch({type: EDITABLE_IDEA_SET_IMAGE_BASE64, payload: base64Image});  
        
                    //save file name to redux
                    store.dispatch({type: EDITABLE_IDEA_SET_IMAGE_NAME, payload: imageFile.name});  
                })
        
                let imageUrl = URL.createObjectURL(imageFile)
                let uniqueIdentifier = imageFile.name +  imageFile.lastModified + imageFile.size + imageFile.type
                self.setState({imageSrc: imageUrl,
                            uniqueIdentifier: uniqueIdentifier})
            })
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