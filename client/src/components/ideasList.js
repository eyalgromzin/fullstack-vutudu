import React, { Component } from 'react'
import FirebaseImage from "./firebaseImage"
import './layout.css'
import { getImageLinkFromIdeaContent } from 'commonUtils'  
import {
    SET_CURRENT_IDEA
} from 'reducers/types';
import store from 'store'
import { uuidv4 } from 'commonUtils'


export default class IdeasList extends Component {
    constructor(props){
        super(props)
    }

    render () {
        if(this.props.ideas === undefined){
            return ""
        }else{
            return (
                <React.Fragment>
                    <div className="ideaList">
                        {this.props.ideas.map(idea => {
                            let firebaseImageUrl = getImageLinkFromIdeaContent(idea.content)
                            
                            return <div className="ideasListItem" >
                                <div className={this.props.titleClassName} onClick={() => this.props.onClick(idea)}>{idea.title}</div>
                                <FirebaseImage imageClassName={this.props.imageClassName} onClick={() => this.props.onClick(idea)} firebasePath={firebaseImageUrl} />
                            </div>
                        })}
                    </div>
                </React.Fragment>
            )
        }
        
    }

}