import React, { Component } from 'react'
import FirebaseImage from 'components/firebaseImage'

export default class IdeaCardContent extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: "",
        }
    }

    componentDidMount() {
        var content = this.convertContentJsonToJsx(this.props.contentJson)
        this.setState({
            content: content
        })
    }

    convertContentJsonToJsx = (contentJson) => {
        if(contentJson === undefined) {
            return <div></div>
        }
            
        var contentJsx = ""
        
        var ideaContentItemsList = JSON.parse(contentJson);
        ideaContentItemsList.forEach(contentItem => {
            if(contentItem.first == "TEXT"){
                contentJsx = <React.Fragment>{contentJsx}<div>{contentItem.third}</div></React.Fragment>
            }else if(contentItem.first == "LINK"){
                contentJsx = <div class='centerHorizontally'><a href={contentItem.fourth}>" + contentItem.third + "</a></div>
            }
            else if(contentItem.first == "IMAGE"){
                contentJsx = 
                <React.Fragment>
                    {contentJsx}
                    <div><FirebaseImage firebasePath={contentItem.third} /></div>
                </React.Fragment>
            }else{
                contentJsx = <div>111</div>
            }
        })

        return contentJsx

        // return <div> 123123 </div>
    }

    render() {
      return (
        <div>{this.convertContentJsonToJsx(this.props.content)}</div>
      )
    }
}