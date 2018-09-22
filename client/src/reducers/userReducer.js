import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import { NEW_IDEA_SET_MIN_PEOPLE, NEW_IDEA_SET_MAX_PEOPLE } from 'reducers/types'
import { NEW_IDEA_SET_TIME } from 'reducers/types'
import { NEW_IDEA_SET_TITLE } from 'reducers/types'
import { NEW_IDEA_SET_CONTENT } from 'reducers/types'
import { NEW_IDEA_SET_PLACE } from 'reducers/types'

const initialState = {
    likedIdeas: [],
    createdIdeas: [],
    doneIdeas: [],
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case USER_SET_LIKED_IDEAS:
      return {
        ...state,
        likedIdeas: action.payload
      };
    
    case USER_SET_CREATED_IDEAS:
      return {
        ...state,
        createdIdeas: action.payload
        };
    case USER_SET_DONE_IDEAS:
        return {
        ...state,
        doneIdeas: action.payload
        };
    default:
      return state;
  }
}

export default reducer;