import React from 'react';
import { combineReducers } from "redux";

const initialState = {
  currentPage: 'SHOW_IDEA',
  loggedIn: true
};

export const CHANGE_PAGE_TO_CREATE_IDEA = "CHANGE_PAGE_TO_CREATE_IDEA";
export const CHANGE_PAGE_TO_SHOW_IDEAS = "CHANGE_PAGE_TO_SHOW_IDEAS";
export const CHANGE_LOGGED_IN_STATE = "CHANGE_LOGGED_IN_STATE";

function reducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_PAGE_TO_CREATE_IDEA:
      return {
        ...state,
        currentPage: 'CREATE_IDEA'
      };
    case CHANGE_PAGE_TO_SHOW_IDEAS:
      return {
        ...state,
        currentPage: 'SHOW_IDEAS'
      };
    case CHANGE_LOGGED_IN_STATE:
      return {
        ...state,
        loggedIn: action.payload
      }
    default:
      return state;
  }
}

export default reducer;