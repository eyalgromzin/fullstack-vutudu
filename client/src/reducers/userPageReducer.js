import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import {  SET_LOGGED_IN_USER_ID, 
          SET_LOGGED_IN_USER_FIRST_NAME,
          SET_LOGGED_IN_USER_LAST_NAME,
          ADD_LIKED_IDEA_TO_USER,
          ADD_CREATED_IDEA_TO_USER,
          USER_PAGE_IDEAS_TYPE,
          SET_USER_CURRENT_PREVIEWED_IDEA,
          SET_USER_CREATED_IDEAS,
          SET_USER_CURRENT_PREVIEWED_IDEAS,
          USER_SET_SELECTED_DROPDOWN_TYPE,
          SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
          UPDATE_PREVIEWED_IDEA,  
          USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
          USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
          UPDATE_LIKED_IDEAS_IDEA,
          CHANGE_UPDATE_TOGGLE,
          SET_USER_LIKED_IDEAS,
          REMOVE_IDEA_FROM_USER_CREATED_IDEAS,
          UPDATE_USER_CREATED_IDEA,
        } from 'reducers/types'
import {removeIdeaFromArray} from 'commonUtils'
import { updateIdea } from '../actions/userActions';
var dcopy = require('deep-copy')


const initialState = {
    loggedInUserID: "",
    loggedInUserFirstName: "",
    loggedInUserLastName: "",
    hardIdeas: [],
    easyIdeas: [],
    longIdeas:[],
    shortIdeas: [],
    likedIdeas: [], //copy here the liked ideas - its ok because the user liked them as they are
    dislikedIdeas: [],
    createdIdeas: [], //copy here created ideas - on edit, update the user and the item itself.
    doneIdeas: [],
    doneIdeasData: [],
    currentPreviewedIdea: {},
    currentPreviewedIdeas: [],
    selectedDropDownType: "",
    isIdeaEdited: false,
    updateToggle: false,
};

const updateIdeaInArray = (ideasArray, idea) => {
  var newIdeasArray = dcopy(ideasArray);
  
  newIdeasArray.forEach(ideaI => {
    if(ideaI != null && ideaI !== undefined && ideaI._id == idea._id){
      ideaI.title = idea.title;
      ideaI.content = idea.content
    }
  });

  return newIdeasArray;
}

const updateLikedIdeasIdea = (state, idea) => {
  state.likedIdeas.forEach(element => {
    if(element._id == idea._id){
      element.title = idea.title;
      element.content = idea.content
    }
  });

  return state.currentPreviewedIdeas;
}

function getCopyOfCurrentIdea (state){
  return dcopy(state.currentIdea);
}

function reducer(state = initialState, action) {
  switch(action.type) {
   
    case SET_LOGGED_IN_USER_ID:
        return {
          ...state,
          loggedInUserID: action.payload
        }
    case SET_LOGGED_IN_USER_FIRST_NAME:
      return {
        ...state,
        loggedInUserFirstName: action.payload
      }
    case SET_LOGGED_IN_USER_LAST_NAME:
      return {
        ...state,
        loggedInUserLastName: action.payload
      }
    case ADD_LIKED_IDEA_TO_USER:
      return {
        ...state,
        likedIdeas: [...state.likedIdeas, action.payload]
      }
    case ADD_CREATED_IDEA_TO_USER:
      return {
        ...state,
        createdIdeas: [...state.createdIdeas, action.payload]
      }
    case SET_USER_CREATED_IDEAS:
      return {
        ...state,
        createdIdeas: action.payload
      }
    case SET_USER_LIKED_IDEAS:
      return {
        ...state,
        likedIdeas: action.payload
      }
    case USER_SET_SELECTED_DROPDOWN_TYPE:
      return {
        ...state,
        selectedDropDownType: action.payload
      }
    case USER_PAGE_IDEAS_TYPE:
      return {
        ...state,
        userPageIdeasType: action.payload
      }
    case SET_USER_CURRENT_PREVIEWED_IDEAS:
      return {
        ...state,
        currentPreviewedIdeas: action.payload
      }
    case SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT:
      return {
        ...state,
        isIdeaEdited: action.payload
      }
    case SET_USER_CURRENT_PREVIEWED_IDEA:
      return {
        ...state,
        currentPreviewedIdea: action.payload
      }
    case REMOVE_IDEA_FROM_USER_CREATED_IDEAS:
        var createdIdeas = getCopyOfCurrentIdea(state.createdIdeas)
        createdIdeas = removeIdeaFromArray(createdIdeas,action.payload);

        return {
          ...state,
          createdIdeas: createdIdeas
        }
    case UPDATE_PREVIEWED_IDEA:
      var newPreviewedIdeas = updateIdeaInArray(state.currentPreviewedIdeas, action.payload);
      return {
        ...state,
        currentPreviewedIdeas: newPreviewedIdeas,
        updateToggle: !state.updateToggle
      }
    case UPDATE_LIKED_IDEAS_IDEA:
      return {
        ...state,
        likedIdeas: updateLikedIdeasIdea(state, action.payload)
      }
    case USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS:
      return {
        ...state,
        currentPreviewedIdeas: state.likedIdeas
      }
    case USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS:
      return {
        ...state,
        currentPreviewedIdeas: state.createdIdeas
      }
    case CHANGE_UPDATE_TOGGLE:
      return {
        ...state,
        updateToggle: !state.updateToggle
      }
    case UPDATE_USER_CREATED_IDEA:
      var createdIdeas = dcopy(state.createdIdeas)
      createdIdeas = updateIdeaInArray(createdIdeas, action.payload);

      return {
        ...state,
        createdIdeas: createdIdeas
      }
    default:
      return state;
  }
}

export default reducer;