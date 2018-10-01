import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import { USER_SET_LIKED_IDEAS } from 'reducers/types'
import { USER_SET_CREATED_IDEAS } from 'reducers/types'
import { USER_SET_DONE_IDEAS } from 'reducers/types'
import { SET_LOGGED_IN_USER } from 'reducers/types'

const initialState = {
    loggedInUser: null
};

function reducer(state = initialState, action) {
  switch(action.type) {
    // case USER_SET_LIKED_IDEAS:
    //   return {
    //     ...state,
    //     likedIdeas: action.payload
    //   };
    
    // case USER_SET_CREATED_IDEAS:
    //   return {
    //     ...state,
    //     createdIdeas: action.payload
    //     };
    // case USER_SET_DONE_IDEAS:
    //     return {
    //     ...state,
    //     doneIdeas: action.payload
    //     };
    case SET_LOGGED_IN_USER:
        return {
          ...state,
          loggedInUser: action.payload
        }
    default:
      return state;
  }
}

export default reducer;