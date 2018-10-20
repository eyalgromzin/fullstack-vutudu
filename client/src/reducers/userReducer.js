import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import {  SET_LOGGED_IN_USER_ID, 
          SET_LOGGED_IN_USER_FIRST_NAME,
          SET_LOGGED_IN_USER_LAST_NAME,
          ADD_LIKED_IDEA_TO_USER,
          ADD_CREATED_IDEA_TO_USER,
          USER_SET_LIKED_IDEAS_DATA,
          USER_PAGE_IDEAS_TYPE,
          SET_USER_CURRENT_PREVIEWED_IDEA,
          SET_USER_CREATED_IDEAS,
          SET_USER_CURRENT_PREVIEWED_IDEAS,
          USER_SET_SELECTED_DROPDOWN_TYPE,
          SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
          SET_USER_CURRENT_PREVIEW_IDEA,
          UPDATE_PREVIEWED_IDEAS_IDEA,
          RESET_USER_CURRENT_PREVIEWED_IDEAS,
          UPDATE_CREATED_IDEAS_IDEA,
        } from 'reducers/types'

const initialState = {
    loggedInUserID: "",
    loggedInUserFirstName: "",
    loggedInUserLastName: "",
    hardIdeas: [],
    easyIdeas: [],
    longIdeas:[],
    shortIdeas: [],
    likedIdeas: [],
    likedIdeasData: [],
    dislikedIdeas: [],
    createdIdeas: [],
    createdIdeasData: [],
    doneIdeas: [],
    doneIdeasData: [],
    currentPreviewedIdea: {},
    currentPreviewedIdeas: [],
    selectedDropDownType: "",
    isIdeaEdited: false,
};

const updatePreviewedIdeasIdea = (state, idea) => {
  state.currentPreviewedIdeas.forEach(element => {
    if(element._id == idea._id){
      element.title = idea.title;
      element.content = idea.content
    }
  });

  return state.currentPreviewedIdeas;
}

const updateCreatedIdeasIdea = (state, idea) => {
  state.createdIdeas.forEach(element => {
    if(element._id == idea._id){
      element.title = idea.title;
      element.content = idea.content
    }
  });

  return state.currentPreviewedIdeas;
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
    case USER_SET_LIKED_IDEAS_DATA:
      return {
        ...state,
        likedIdeasData: action.payload
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
    case RESET_USER_CURRENT_PREVIEWED_IDEAS:
      return {
        ...state,
        currentPreviewedIdeas: state.currentPreviewedIdeas
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
    case UPDATE_PREVIEWED_IDEAS_IDEA:
      var newPreviewedIdeas = updatePreviewedIdeasIdea(state, action.payload);
      return {
        ...state,
        currentPreviewedIdeas: newPreviewedIdeas
      }
    case UPDATE_CREATED_IDEAS_IDEA:
      return {
        ...state,
        createdIdeas: updateCreatedIdeasIdea(state, action.payload)
      }
    default:
      return state;
  }
}

export default reducer;