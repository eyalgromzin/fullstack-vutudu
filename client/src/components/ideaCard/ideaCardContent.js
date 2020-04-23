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
                contentJsx = <div className='centerHorizontally'><a href={contentItem.fourth}>" + contentItem.third + "</a></div>
            }
            else if(contentItem.first == "IMAGE"){
                contentJsx = 
                <React.Fragment>
                    {contentJsx}
                    <div><FirebaseImage firebasePath={contentItem.third} /></div>
                </React.Fragment>
            }else if(contentItem.first == "LOCATION"){
                //q='" + contentItem.third + "','" + contentItem.third + "
                var mapSrc="https://maps.google.com/maps?q=" + contentItem.third + "," + contentItem.fourth + "&t=&z=15&ie=UTF8&iwloc=&output=embed" 

                contentJsx = 
                <React.Fragment>
                    {contentJsx}
                    <div className="mapouter">
                        <div className="gmap_container">
                            <iframe width="90%" height="50%" id="gmap_canvas"  
                                src={mapSrc}
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                                />
                        </div>
                    </div>
                </React.Fragment>
            }else{
                contentJsx = <div>111</div>
            }
        })

        return contentJsx

        // return <div> 123123 </div>
    }

    render() {
        var ideaCardContent = ""
        if(this.props.createdIn == "web" || this.props.content.includes("<div>")){
            ideaCardContent = <div className={"className"} 
                    dangerouslySetInnerHTML={{ __html: this.props.content.replace(/\n/g, '<br />')}} />
            // <div>{this.props.content}</div>
        }else{
            ideaCardContent = this.convertContentJsonToJsx(this.props.content)            
        }
      return (
        <div>{ideaCardContent}</div>
      )
    }
}