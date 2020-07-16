import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'
import store from 'store'
import {
    EDITABLE_IDEA_SET_PLACESS
} from 'reducers/types';

export default class CreateTextField extends Component {
    constructor(props){
        super(props)
    
        this.state = {
          text: "",
          isValid: true,
        }
    }

    validate = () => {
        if(this.state.text == ""){
            this.setState({isValid: false})
            return false
        }

        this.setState({isValid: true})
        return true
    }

    setText = (text) => {
        this.setState({text: text})
    }

    clear = () => {
        this.setState({text: ""}) 
    }

    onTextChange = (e) => {
        this.setState({text: e.target.value}) 
        store.dispatch({type: this.props.updateTextTypeName, payload: e.target.value});  
    }

    render () {
        return (
            <React.Fragment>
                <textarea 
                    value={this.state.text}
                    className={this.state.isValid? this.props.className : this.props.className + " errorBackground"}
                    rows="4" cols="50" id="createIdeaContentText" 
                    placeholder={this.props.placeholder}
                    onChange={this.onTextChange}
                />        
            </React.Fragment>
        )
    }
}