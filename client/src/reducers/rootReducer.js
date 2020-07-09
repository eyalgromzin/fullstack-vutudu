import React from 'react';
import { combineReducers } from "redux";
import searchBarReducer from './searchBarReducer'
import commonReducer from './commonReducer'
import searchPageReducer from './searchPageReducer'
import ideaCardReducer from './ideaCardReducer'
import editableIdeaReducer from './editableIdeaReducer'
import userPageReducer from './userPageReducer'
import topTableReducer from './topTableReducer'
import suggestionsReducer from './suggestionsReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  searchBarReducer: searchBarReducer,
  commonReducer: commonReducer,
  ideaCardReducer: ideaCardReducer,
  searchPageReducer: searchPageReducer,
  editableIdeaReducer: editableIdeaReducer,
  userPageReducer: userPageReducer,
  topTableReducer: topTableReducer,
  suggestionsReducer: suggestionsReducer,
  toastr: toastrReducer
})
 
export default rootReducer