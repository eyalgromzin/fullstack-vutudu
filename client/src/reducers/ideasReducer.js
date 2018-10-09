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

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,
  ideas: ([{
    _id: '222',
    title: 'click Search',
    content: 'to find ideas to what to do',
    place: 'fill place',
    minTime: 7,
    maxTime: 8,
    minNumOfPeople: 4,
    maxNumOfPeople: 6,
    liked: [],
    disliked: [],
    hardCount: 5,
    easyCount: 6,
  },
  ])
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_IDEAS:
        return {
          ...state,
          ideas: action.payload,  //[...state.ideas,action.payload]
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

    default:
      return state;
  }
}

export default reducer;