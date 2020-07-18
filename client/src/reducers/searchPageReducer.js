import { SET_SEARCH_IDEAS,
  ADD_TIME,
  REDUCE_DIFFICULTY, 
  ADD_USER_ID_TO_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES ,
  ADD_USER_TO_IDEA_ADDED_HARD, 
  ADD_USER_TO_IDEA_ADDED_EASY,
  ADD_USER_TO_IDEA_ADDED_LONG, 
  ADD_USER_TO_IDEA_ADDED_SHORT, 
  REMOVE_USER_FROM_IDEA_DISLIKES,
  REMOVE_USER_FROM_IDEA_ADDED_HARD,
  REMOVE_USER_FROM_IDEA_ADDED_EASY,
  REMOVE_USER_FROM_IDEA_ADDED_SHORT,
  REMOVE_USER_FROM_IDEA_ADDED_LONG,
  SET_IS_SEARCHING,
  SEARCH_SET_CURRENT_IDEA_BY_ID,
  SET_CURRENT_IDEA 
} from './types'
// import dcopy from 'deep-copy'
var dcopy = require('deep-copy')
var _ = require('lodash');

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,  
  ideas: [], 
  itemsFound: false,
  isSearching: false,
};

function getCopyOfCurrentIdea (state){
  return dcopy(state.currentIdea);
}

function arrayRemove(arr, value) {
  return arr.filter(function(ele){
      return ele != value;
  });
}

function reducer(state = initialState, action) {
  let userID = '';
  let removedArray = '';

  switch(action.type) {
    case SET_SEARCH_IDEAS:
        return {
          ...state,
          ideas: action.payload,
        };
    
    case SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.payload,
      };    
    default:
      return state;
  }
}

export default reducer;