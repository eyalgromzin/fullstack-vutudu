import React from 'react';
import { combineReducers } from "redux";
import searchBarReducer from './searchBarReducer'
import commonReducer from './commonReducer'
import searchPageReducer from './searchPageReducer'
import editableIdeaReducer from './editableIdeaReducer'
import userPageReducer from './userPageReducer'
import topTableReducer from './topTableReducer'
import suggestionsReducer from './suggestionsReducer'

const rootReducer = combineReducers({
  searchBarReducer: searchBarReducer,
  commonReducer: commonReducer,
  searchPageReducer: searchPageReducer,
  editableIdeaReducer: editableIdeaReducer,
  userPageReducer: userPageReducer,
  topTableReducer: topTableReducer,
  suggestionsReducer: suggestionsReducer,
})
 
export default rootReducer