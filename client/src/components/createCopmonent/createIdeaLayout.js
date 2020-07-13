import { connect } from 'react-redux';
import React, { Component, createRef } from 'react'

import CreateIdeaBar from '../searchBar/createIdeaBar'
import EditableIdeaCard from '../ideaCard/editableIdeaCard'
import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'
import './createIdeaLayout.css'
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

} from 'reducers/types'
import store from 'store'
import NumOfPeopleCreator from 'components/searchBar/numOfPeopleCreator/numOfPeopleCreator'
import TimeCreator from 'components/searchBar/timeCreator/timeCreator'
// import { storage } from './firebase'
import {toastr} from 'react-redux-toastr'
import CreateTextField from '../createTextField'
import CreateTextArea from '../createTextArea'
import CreateImagePicker from '../createImagePicker'

class createIdeaLayout extends Component {
  constructor(props){
    super(props)

    this.imageUploader = createRef()
    this.placesRef = createRef()
    this.timeRef = createRef()
    this.numOfPeopleRef= createRef()
    this.subjectsRef = createRef()
    this.titleRef = createRef()
    this.imagePickerRef = createRef()


    this.state = {
      imageSrc: require("images/imageIcon.png"),
      imageBase64: [],
      title: "",
    }
  }




  onCreated = () => {
    this.clearLayout()
    toastr.success('Success', 'Idea Created!')
  }

  clearLayout = () => {
    this.timeRef.clearSelection();
    this.numOfPeopleRef.clearSelection();
  }

  onMinTimeChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: value});
  }

  onMaxTimeChangeEvent = (value) => {
    this.props.dispatch({type: EDITABLE_IDEA_SET_MAX_TIME, payload: value});
  }

  render() {
    let isShowError = false

    return (
      <React.Fragment>     
        <div id="createMainLayout">
          <div id="createTitleContainer">
            <CreateTextField 
              ref={input => {
                this.titleRef = input}
              }
              updateTextTypeName={ EDITABLE_IDEA_SET_TITLE }
              class="createIdeaTitle"
              placeholder="Title..."      
            />
          </div>
          <div>
            
            <div id="createCenterLayout">
              <div id="createTopRow">
                <div id="createIdeaImageSide">
                  <div id="createIdeaImageContainer">
                    <CreateImagePicker ref={ref => this.imagePickerRef = ref} 
                      className="createIdeaImagePickerImage"
                    />
                    
                  </div>
                </div>
                <div id="createCriteriasSide">
                  <div class="createCriteriaContainer">
                    <div id="createIdeaCriteriasTitle">Places - separated by ,</div>
                      <CreateTextField 
                        ref={input => {
                          this.placesRef = input}
                        }
                        updateTextTypeName={EDITABLE_IDEA_SET_PLACES}
                        placeholder="home, bar, park, ..."
                        class="criteriasTextField"
                      />
                  </div>
                  <div class="createCriteriaContainer">
                    <div id="createIdeaCriteriasTitle">Time</div>
                    <TimeCreator 
                      ref={input => {
                        console.log("timeRef:")
                        console.log(input)
                        this.timeRef = input}
                      }
                      fieldClass="inlineBlock createComboBox createBarTimeField"                
                      selctorClass="timeCreatorCommon"
                      onMinTimeChangeEvent={this.onMinTimeChangeEvent} 
                      onMaxTimeChangeEvent={this.onMaxTimeChangeEvent} 
                      minTime={this.props.minTime} maxTime={this.props.maxTime}  /> 
                  </div>
                  <div class="createCriteriaContainer">
                    <div id="createIdeaCriteriasTitle">People</div>
                    <NumOfPeopleCreator 
                      ref={ref => {
                        if(ref != null){
                          this.numOfPeopleRef = ref.getWrappedInstance()
                        }
                      }}
                      fieldClass="createComboBox"          
                      cssClass="createBarDropDown" headerCssClass="fieldHeader"
                      /> 
                  </div>
                  <div class="createCriteriaContainer">
                    <div id="createIdeaCriteriasTitle">Subjects - separated by ,</div>
                    <CreateTextField 
                        ref={input => {
                          this.subjectsRef = input}
                        }
                        placeholder="sport, productive, fun, ..."
                        updateTextTypeName={ EDITABLE_IDEA_SET_SUBJECTS }
                        class="criteriasTextField"
                      />
                  </div>
                </div>
              </div>
              <div id="createBottomRow">
                <CreateTextArea 
                  ref={input => {
                    this.contentText = input}
                  }
                  placeholder="Idea Content"
                  updateTextTypeName={ EDITABLE_IDEA_SET_CONTENT }
                  class="createIdeaContentTextArea"
                />
              </div>
            </div>
          </div>
          <div id="createCreateButtonContainer">
            <CreateIdeaButton isEnabled={false} title={this.state.title} 
              numOfPeopleRef={this.numOfPeopleRef}
              timeRef={this.timeRef}
              placesRef={this.placesRef}
              subjectsRef={this.subjectsRef}
              contentRef={this.contentRef}
              imagePickerRef={this.imagePickerRef}
              titleRef={this.titleRef}
              />
          </div> 
          
        </div> 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isClickedButton: state.editableIdeaReducer.isClickedButton
  };
}


export default connect(mapStateToProps)(createIdeaLayout);


