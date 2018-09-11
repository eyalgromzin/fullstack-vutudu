import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import { NEW_IDEA_SET_MIN_PEOPLE, NEW_IDEA_SET_MAX_PEOPLE } from 'reducers/types'
import { NEW_IDEA_SET_TIME } from 'reducers/types'
import { NEW_IDEA_SET_TITLE } from 'reducers/types'
import { NEW_IDEA_SET_CONTENT } from 'reducers/types'
import { NEW_IDEA_SET_PLACE } from 'reducers/types'

const initialState = {
    title: '',
    content: '',
    minTime: 0,
    maxTime: 0,
    minNumOfPeople: '',
    maxNumOfPeople: '',
    place: '',
    tags: [],
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case NEW_IDEA_SET_MIN_PEOPLE:
      return {
        ...state,
        minNumOfPeople: action.payload
      };
    case NEW_IDEA_SET_MAX_PEOPLE:
      return {
        ...state,
        maxNumOfPeople: action.payload
      };
    case NEW_IDEA_SET_PLACE:
      return {
        ...state,
        place: action.payload
      };
    case NEW_IDEA_SET_TIME:
    return {
      ...state,
      minTime: action.payload,
      maxTime: action.payload,
    };
    case NEW_IDEA_SET_TITLE:
    return {
      ...state,
      title: action.payload,
    };
    case NEW_IDEA_SET_CONTENT:
    return {
      ...state,
      content: action.payload,
    };
    default:
      return state;
  }
}

export default reducer;