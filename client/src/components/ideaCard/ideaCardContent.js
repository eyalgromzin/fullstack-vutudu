import React, { Component } from 'react'
import FirebaseImage from 'components/firebaseImage'
import './ideaCard.css'

export default class IdeaCardContent extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: "",
        }
    }

    componentDidMount() {
        var jsxAndText = this.convertContentJsonToJsx(this.props.contentJson)
        this.setState({
            content: jsxAndText[0]
        })
    }

    convertContentJsonToJsx = (contentJson) => {
        if(contentJson === undefined) {
            return <div></div>
        }
            
        var contentJsx = ""
        
        var ideaContentItemsList = JSON.parse(contentJson);

        let contentText = "<React.Fragment>"

        ideaContentItemsList.forEach(contentItem => {
            if(contentItem.first == "TEXT"){
                contentJsx = 
                <div id="ideaContent">
                    {contentJsx}
                    <div>{contentItem.third}</div>
                </div>
                contentText += "<div>" + contentItem.third + " </div>"
            }else if(contentItem.first == "LINK"){
                contentJsx = 
                <div id="ideaContent">
                    {contentJsx}
                    <div className='centerHorizontally'>
                        <a href={contentItem.fourth}>{contentItem.third}</a>
                    </div>
                </div>
            }
            else if(contentItem.first == "IMAGE"){
                contentJsx = 
                    <div id="ideaContent">
                        {contentJsx}
                        <div className='centerHorizontally'>
                            <FirebaseImage firebasePath={contentItem.third} imageClassName="contentImage" />
                        </div>
                    </div>
                contentText += "<div className='centerHorizontally'><FirebaseImage firebasePath='" + contentItem.third + "' /></div>"
            }else if(contentItem.first == "LOCATION"){                
                var mapSrc="https://maps.google.com/maps?q=" + contentItem.third + "," + contentItem.fourth + "&t=&z=15&ie=UTF8&iwloc=&output=embed" 

                contentJsx = 
                    <div id="ideaContent">
                        {contentJsx}
                        <div className="mapouter">
                            <div className="gmap_container">
                                <iframe width="90%" height="50%" id="gmap_canvas"  
                                    src={mapSrc}
                                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                                    />
                            </div>
                        </div>
                    </div>
                contentText += '' + '<div className="mapouter">' + 
                    '<div className="gmap_container">' + 
                        '<iframe width="90%" height="50%" id="gmap_canvas"  ' + 
                            'src={mapSrc} ' +
                            'frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"' +
                            '/>' +
                    '</div>' + 
                '</div>'
            }else{
                contentJsx = <div>failed parse</div>
            }
        })

        contentText += "</React.Fragment>"

        return [contentJsx, contentText]
    }

    render() {
        if(this.props.content != this.state.content){
            this.setState({content: this.props.content})
        }
        
        let contentAndText = this.convertContentJsonToJsx(this.props.content)            
        let ideaContentText = contentAndText[1]
        console.log(ideaContentText)

      return (
        <div>{contentAndText[0]}</div>
      )
    }
}