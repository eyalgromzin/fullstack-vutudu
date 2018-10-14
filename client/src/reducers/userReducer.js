import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import {  SET_LOGGED_IN_USER_ID, 
          SET_LOGGED_IN_USER_FIRST_NAME,
          SET_LOGGED_IN_USER_LAST_NAME,
          ADD_LIKED_IDEA_TO_USER,
          ADD_DISLIKED_IDEA_TO_USER,
          USER_SET_LIKED_IDEAS,
          USER_PAGE_IDEAS_TYPE
        } from 'reducers/types'

const initialState = {
    loggedInUserID: "",
    loggedInUserFirstName: "",
    loggedInUserLastName: "",
    likedIdeas: [],
    dislikedIdeas: [],
    hardIdeas: [],
    easyIdeas: [],
    longIdeas:[],
    shortIdeas: [],
    currentPreviewIdea: {},
    likedIdeasData: [],
    createdIdeasData: [],
    doneIdeasData: []
};

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
    case ADD_DISLIKED_IDEA_TO_USER:
      return {
        ...state,
        dislikedIdeas: [...state.dislikedIdeas, action.payload]
      }
    case USER_SET_LIKED_IDEAS:
      return {
        ...state,
        likedIdeasData: action.payload
      }
    case USER_PAGE_IDEAS_TYPE:
      return {
        ...state,
        userPageIdeasType: action.payload
      }
    default:
      return state;
  }
}

export default reducer;