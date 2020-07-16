import { connect } from 'react-redux';
import React, { Component, createRef } from 'react'
import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'
import './createIdeaLayout.css'
import SaveIdeaButton from 'components/ideaCard/saveIdeaButton';
import 'components/layout.css'
import {
  EDITABLE_IDEA_SET_TITLE,
  EDITABLE_IDEA_SET_CONTENT,
  EDITABLE_IDEA_SET_MIN_TIME,
  EDITABLE_IDEA_SET_MAX_TIME,
  EDITABLE_IDEA_SET_MIN_PEOPLE,
  EDITABLE_IDEA_SET_MAX_PEOPLE,
  EDITABLE_IDEA_SET_PLACES,
  EDITABLE_IDEA_SET_SUBJECTS,
  EDITABLE_IDEA_SET_IMAGE_LINK,

} from 'reducers/types'
import store from 'store'
import NumOfPeopleCreator from 'components/searchBar/numOfPeopleCreator/numOfPeopleCreator'
import TimeCreator from 'components/searchBar/timeCreator/timeCreator'
// import { storage } from './firebase'
import {toastr} from 'react-redux-toastr'
import CreateTextField from '../createTextField'
import CreateTextArea from '../createTextArea'
import CreateImagePicker from '../createImagePicker'
import { getImageLinkFromIdeaContent, getImageUrlFromFirebaseImagePath } from 'commonUtils'  
import { text } from 'body-parser';

class EditableIdeaAndButton extends Component {
  constructor(props){
    super(props)

    this.state = {
      imageSrc: require("images/imageIcon.png"),
      imageBase64: [],
      title: "",
      currentIdeaID: "",      
    }
  }

  populateFields = (idea) => {
    this.titleRef.setText(idea.title)
    this.props.dispatch({type: EDITABLE_IDEA_SET_TITLE, payload: idea.title})

    let places = idea.places.join(',')
    this.placesRef.setText(places)
    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACES, payload: places})
    
    this.state.numOfPeopleRef.setMinNumOfPeople(idea.minNumOfPeople)
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_PEOPLE, payload: idea.minNumOfPeople})
    
    this.state.numOfPeopleRef.setMaxNumOfPeople(idea.maxNumOfPeople)
    this.props.dispatch({type: EDITABLE_IDEA_SET_MAX_PEOPLE, payload: idea.maxNumOfPeople})
    
    this.timeRef.setMinTime(idea.minTime)
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: idea.minTime})
    this.timeRef.setMaxTime(idea.maxTime)
    this.props.dispatch({type: EDITABLE_IDEA_SET_MAX_TIME, payload: idea.maxTime})

    let subjects = idea.subjects.join(',')
    this.state.subjectsRef.setText(subjects)
    this.props.dispatch({type: EDITABLE_IDEA_SET_PLACES, payload: subjects})

    let ideaText = this.getTextFromContent(idea.content)
    this.contentRef.setText(ideaText)
    this.props.dispatch({type: EDITABLE_IDEA_SET_CONTENT, payload: ideaText})

    let imageLink = getImageLinkFromIdeaContent(idea.content)
    this.props.dispatch({type: EDITABLE_IDEA_SET_IMAGE_LINK, payload: imageLink})

    getImageUrlFromFirebaseImagePath(imageLink, (imageUrl) => {
      this.imagePickerRef.setImage(imageUrl)
    })
  }

  

  getTextFromContent = (ideaContent) => {
    let text = ""
    var ideaContentItemsList = JSON.parse(ideaContent);
    ideaContentItemsList.forEach(contentItem => {
      if(contentItem.first == "TEXT"){
        text = contentItem.third
      }
    })

    return text
  }

  componentDidUpdate(){
    if(this.idea != null){
      this.populateFields(this.idea)
    }
  }

  // onCreated = () => {
  //   this.clearLayout()
  //   toastr.success('Success', 'Idea Created!')
  // }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps !== undefined && nextProps.idea !== undefined){
      this.idea = nextProps.idea
      return true
    }else{
      this.idea = null
    }

    if(nextState != this.state){
      return true
    }

    if(nextProps !== undefined && nextProps.idea !== undefined && this.props.idea === undefined)
      return true
    
    return false
  }

  clearLayout = () => {
    // this.timeRef.clearSelection();
    // this.numOfPeopleRef.clearSelection();
  }

  render() {
    let isShowError = false
    let ideaButton = <div></div>
    if (this.props.isIdeaEdited)
      ideaButton = <SaveIdeaButton         
        idea={this.props.idea}
        titleRef={this.state.titleRef}
        placesRef={this.state.placesRef}
        timeRef={this.state.timeRef}
        numOfPeopleRef={this.state.numOfPeopleRef}
        subjectsRef={this.state.subjectsRef}
        contentRef={this.state.contentRef}
        imagePickerRef={this.state.imagePickerRef}
        />
    else 
      ideaButton = <CreateIdeaButton 
        text={this.props.buttonText}
        isEnabled={false} 
        title={this.state.title} 
        titleRef={this.state.titleRef}
        placesRef={this.state.placesRef}
        timeRef={this.state.timeRef}
        numOfPeopleRef={this.state.numOfPeopleRef}
        subjectsRef={this.state.subjectsRef}
        contentRef={this.state.contentRef}
        imagePickerRef={this.state.imagePickerRef}
        />

      

    return (
      <React.Fragment>     
        <div id="editableIdeaAndButton">
            <div id="createIdeaContainer">
              <div id="createTitleContainer">
                <CreateTextField 
                  ref={input => {
                    if(this.state.titleRef === undefined) 
                    {
                      this.setState({titleRef: input})
                      this.titleRef = input
                    } 
                  }}
                  updateTextTypeName={ EDITABLE_IDEA_SET_TITLE }
                  className="createIdeaTitle"
                  placeholder="Title..."      
                />
              </div>
              <div id="createCenterLayout">
                <div id="createTopRow">
                  <div id="createIdeaImageSide">
                    <div id="createIdeaImageContainer">
                      <CreateImagePicker 
                        ref={input2 => { 
                          if(this.state.imagePickerRef === undefined) {
                            this.setState({imagePickerRef: input2}) 
                            this.imagePickerRef = input2
                          }
                        }}
                        className="createIdeaImagePickerImage"
                      />                    
                    </div>
                  </div>
                  <div id="createCriteriasSide">
                    <div className="createCriteriaContainer">
                      <div id="createIdeaCriteriasTitle">Places - separated by ,</div>
                        <CreateTextField 
                          ref={input3 => {
                            if(this.state.placesRef === undefined) {
                              this.setState({placesRef: input3})
                              this.placesRef = input3
                            } 
                          }}
                          updateTextTypeName={EDITABLE_IDEA_SET_PLACES}
                          placeholder="home, bar, park, ..."
                          className="criteriasTextField"
                        />
                    </div>
                    <div className="createCriteriaContainer">
                      <div id="createIdeaCriteriasTitle">Time</div>
                      <TimeCreator 
                        ref={ref4 => {
                          if(this.state.timeRef === undefined){
                            this.setState({timeRef: ref4})
                            this.timeRef = ref4
                          } 
                        }}
                        fieldClass="inlineBlock createComboBox createBarTimeField"                
                        selctorClass="timeCreatorCommon"
                        minTime={this.props.minTime} maxTime={this.props.maxTime}  /> 
                    </div>
                    <div className="createCriteriaContainer">
                      <div id="createIdeaCriteriasTitle">People</div>
                      <NumOfPeopleCreator 
                        ref={ref5 => {
                          if(this.state.numOfPeopleRef === undefined) {
                            this.setState({numOfPeopleRef: ref5})
                            this.numOfPeopleRef = ref5
                          }
                        }}
                        fieldClass="createComboBox"          
                        cssClass="createBarDropDown" headerCssClass="fieldHeader"
                        /> 
                    </div>
                    <div className="createCriteriaContainer">
                      <div id="createIdeaCriteriasTitle">Subjects - separated by ,</div>
                        <CreateTextField 
                          ref={ref6 => {
                            if(this.state.subjectsRef === undefined) {
                              this.setState({subjectsRef: ref6})                            
                              this.numOfPeopleRef = ref6
                            }
                          }}
                          placeholder="sport, productive, fun, ..."
                          updateTextTypeName={ EDITABLE_IDEA_SET_SUBJECTS }
                          className="criteriasTextField"
                        />
                    </div>
                  </div>
                </div>
                <div id="createBottomRow">
                  <CreateTextArea id="createContentTextArea"
                    ref={ref7 => {
                      if(this.state.contentRef === undefined) {
                        this.setState({contentRef: ref7})                                                  
                        this.contentRef = ref7
                      }
                    }}
                    placeholder="Idea Content"
                    updateTextTypeName={ EDITABLE_IDEA_SET_CONTENT }
                    className="createIdeaContentTextArea"
                  />
                </div>
              </div>
            </div>
            <div id="createCreateButtonContainer">
              {ideaButton}
          </div> 
          </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton,
    isIdeaEdited: state.userPageReducer.isIdeaEdited,
  };
}

export default connect(mapStateToProps)(EditableIdeaAndButton);


