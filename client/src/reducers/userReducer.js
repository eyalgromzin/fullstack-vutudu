import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import {  SET_LOGGED_IN_USER_ID, 
          SET_LOGGED_IN_USER_FIRST_NAME,
          SET_LOGGED_IN_USER_LAST_NAME,
          ADD_LIKED_IDEA_TO_USER,
          ADD_DISLIKED_IDEA_TO_USER
        } from 'reducers/types'

const initialState = {
    loggedInUserID: "",
    loggedInUserFirstName: "",
    loggedInUserLastName: "",
    likedIdeas: [],
    dislikedIdeas: []
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
        likedIdeas: [action.payload, ...state.likedIdeas]
      }
    case ADD_DISLIKED_IDEA_TO_USER:
      return {
        ...state,
        dislikedIdeas: [action.payload, ...state.dislikedIdeas]
      }
    default:
      return state;
  }
}

export default reducer;