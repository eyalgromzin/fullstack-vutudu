import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import { SAVE_IDEAS,
  CHANGE_CURRENT_IDEA_INDEX,
  ADD_TIME,
  REDUCE_TIME,
  ADD_DIFFICULTY,
  REDUCE_DIFFICULTY } from './types';
import { ADD_USER_TO_IDEA_LIKES, ADD_USER_TO_IDEA_DISLIKES } from './types'
import { ADD_USER_TO_IDEA_ADDED_HARD, ADD_USER_TO_IDEA_ADDED_EASY } from './types'
import { ADD_USER_TO_IDEA_ADDED_LONG, ADD_USER_TO_IDEA_ADDED_SHORT, SET_CURRENT_IDEA } from './types'

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,
  currentIdea: {  //why do i need it?
    _id: '000',
    title: 'click Search',
    content: 'To find ideas of what to do',
    place: 'fill place',
    minTime: 0,
    maxTime: 0,
    minNumOfPeople: 0,
    maxNumOfPeople: 0,
    liked: [],
    disliked: [],
    addedHard: [],
    addedEasy: [],
    addedLong: [],
    addedShort: [],
  },
  ideas: ([{
    _id: '000',
    title: 'click Search',
    content: 'To find ideas of what to do',
    place: 'fill place',
    minTime: 0,
    maxTime: 0,
    minNumOfPeople: 0,
    maxNumOfPeople: 0,
    liked: [],
    disliked: [],
    addedHard: [],
    addedEasy: [],
    addedLong: [],
    addedShort: [],
  },
  ]),  
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_IDEAS:
        return {
          ...state,
          ideas: action.payload,  //[...state.ideas,action.payload]
        };
    case SET_CURRENT_IDEA:
      return {
        ...state,
        currentIdea: action.payload,
      };
    case CHANGE_CURRENT_IDEA_INDEX:
      return{
          ...state,
          currentIdeaIndex: action.payload,
        };
    case ADD_TIME:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.maxTime = currentIdea.maxTime -1 + 2;
      
      return { 
        ...state,
        currentIdea
      }
    case REDUCE_TIME:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.minTime = currentIdea.minTime - 1;
    
    return { 
      ...state,
      currentIdea
    }
    case ADD_DIFFICULTY:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.hardCount = currentIdea.hardCount + 1;
      
      return { 
        ...state,
        currentIdea
      }
    case REDUCE_DIFFICULTY:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.easyCount = currentIdea.easyCount + 1;
      
      return { 
        ...state,
        currentIdea
      }
    case ADD_USER_TO_IDEA_LIKES:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.liked = [action.payload,...currentIdea.liked]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_DISLIKES:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.disliked = [action.payload,...currentIdea.disliked]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_HARD:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.addedHard = [action.payload,...currentIdea.addedHard]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_EASY:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.addedEasy = [action.payload,...currentIdea.addedEasy]

      return {
        ...state,
        currentIdea
      };
      case ADD_USER_TO_IDEA_ADDED_LONG:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.addedLong = [action.payload,...currentIdea.addedLong]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_SHORT:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.addedShort = [action.payload,...currentIdea.addedShort]

      return {
        ...state,
        currentIdea
      };
    default:
      return state;
  }
}

export default reducer;