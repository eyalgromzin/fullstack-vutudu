import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'commonCss.css'
import store from 'store'
import { createRef } from 'react';

export default class CreateTextField extends Component {
    constructor(props){
        super(props)
    
        this.inputRef = createRef()

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

    onTextChange = (e) => {
        this.setState({text: e.target.value}) 
        store.dispatch({type: this.props.updateTextTypeName, payload: e.target.value});  
    }

    clear = () => {
        this.setState({text: ""}) 
        this.inputRef.value=''
    }

    render () {
        return (
            <React.Fragment>
                <input id={this.props.id}  
                type="text" 
                value={this.state.text}
                ref={input => this.inputRef = input} 
                placeholder={ this.props.placeholder }                 
                onChange={this.onTextChange}
                className={this.state.isValid? this.props.className :
                    this.props.className + " errorBackground"}
                />        
            </React.Fragment>
        )
    }
}