import React from 'react';
import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import countReducer from './countReducer'
import commonReducer from './commonReducer'
import searchPageReducer from './searchPageReducer'
import editedIdeaReducer from './editedIdeaReducer'
import userPageReducer from './userPageReducer';

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  countReducer: countReducer,
  commonReducer: commonReducer,
  searchPageReducer: searchPageReducer,
  editedIdeaReducer: editedIdeaReducer,
  userPageReducer: userPageReducer
})
 
export default rootReducer