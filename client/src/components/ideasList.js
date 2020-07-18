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
        if(this.props.ideas === undefined || this.props.ideas.length == 0){
            return ""
        }else{
            return (
                <React.Fragment>
                    <div className="ideaList">
                        {this.props.ideas.map((idea, index, array) => {
                            let firebaseImageUrl = getImageLinkFromIdeaContent(idea.content)
                            
                            return <div className={this.props.listItemClassName} >
                                {index == this.props.selectedIndex? 
                                <div className={this.props.selectedTitleClassName} onClick={() => this.props.onClick(idea, index)}>{idea.title}</div>
                                :
                                <div className={this.props.titleClassName} onClick={() => this.props.onClick(idea, index)}>{idea.title}</div>
                                }
                                {this.props.isToShowImage && firebaseImageUrl != ""?
                                    <FirebaseImage imageClassName={this.props.imageClassName} 
                                        onClick={() => this.props.onClick(idea, index)} firebasePath={firebaseImageUrl} />
                                    : 
                                    ""
                                }
                            </div>
                        })}
                    </div>
                </React.Fragment>
            )
        }
        
    }

}