import React from 'react';
import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import countReducer from './countReducer'
import commonReducer from './commonReducer'
import ideasReducer from './ideasReducer'
import newIdeaReducer from './newIdeaReducer'
import itemReducer from './itemReducer'
import userReducer from './userReducer';

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  countReducer: countReducer,
  commonReducer: commonReducer,
  ideasReducer: ideasReducer,
  newIdeaReducer: newIdeaReducer,
  itemReducer: itemReducer,
  userReducer: userReducer
})
 
export default rootReducer