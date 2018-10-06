import React from 'react';
import { combineReducers } from "redux";
import update from "react-addons-update";
import { SAVE_IDEAS,
  CHANGE_CURRENT_IDEA_INDEX,
  LIKE_IDEA,
  DISLIKE_IDEA,
  ADD_TIME,
  REDUCE_TIME,
  ADD_DIFFICULTY,
  REDUCE_DIFFICULTY } from './types';
import { ADD_USER_TO_IDEA_LIKES } from './types'

const initialState = {
  currentIdeaIndex: 0,
  ideas: ([{
    _id: '222',
    title: 'idea in 7 words',
    content: 'idea description, <br /> including hashtags',
    place: 'place2',
    minTime: 7,
    maxTime: 8,
    minNumOfPeople: 4,
    maxNumOfPeople: 6,
    liked: [],
    dislikes: 4,
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
    case LIKE_IDEA: //if it wont work , try to return a full ideas array with the changed item 
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.likes = currentIdea.likes + 1;
      
      return { 
        ...state,
        currentIdea
      }

    case DISLIKE_IDEA:
      var currentIdea = state.ideas[state.currentIdeaIndex];
      currentIdea.dislikes = currentIdea.dislikes + 1;
    
    return { 
      ...state,
      currentIdea
    }

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
      currentIdea.likes = [action.payload,...currentIdea.likes]

      return {
        ...state,
        currentIdea
      };

    default:
      return state;
  }
}

export default reducer;