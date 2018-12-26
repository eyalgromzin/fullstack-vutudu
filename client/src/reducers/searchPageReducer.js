import { SAVE_IDEAS,
  CHANGE_CURRENT_IDEA_INDEX,
  ADD_TIME,
  ADD_DIFFICULTY,
  REDUCE_DIFFICULTY, 
  ADD_USER_TO_CURRENT_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES ,
  ADD_USER_TO_IDEA_ADDED_HARD, 
  ADD_USER_TO_IDEA_ADDED_EASY,
  ADD_USER_TO_IDEA_ADDED_LONG, 
  ADD_USER_TO_IDEA_ADDED_SHORT, 
  REMOVE_USER_FROM_IDEA_LIKES,
  REMOVE_USER_FROM_IDEA_DISLIKES,
  REMOVE_USER_FROM_IDEA_ADDED_HARD,
  REMOVE_USER_FROM_IDEA_ADDED_EASY,
  REMOVE_USER_FROM_IDEA_ADDED_SHORT,
  REMOVE_USER_FROM_IDEA_ADDED_LONG,
  SET_CURRENT_IDEA } from './types'
// import dcopy from 'deep-copy'
var dcopy = require('deep-copy')
var _ = require('lodash');

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,
  currentIdea: {  
  },
  ideas: ([{
    _id: '000',
    title: 'click Search',
    content: 'To find ideas of what to do',
    place: 'fill place',
    time: 0,
    minNumOfPeople: 0,
    maxNumOfPeople: 0,
    liked: [],
    likedCount: 0,
    disliked: [],
    addedHard: [],
    hardCount: 0,
    addedEasy: [],
    addedLong: [],
    addedShort: [],
  }]),  
};

function getCopyOfCurrentIdea (state){
  return dcopy(state.currentIdea);
}

function reducer(state = initialState, action) {
  let userID = '';
  let removedArray = '';

  switch(action.type) {
    case SAVE_IDEAS:
        return {
          ...state,
          ideas: action.payload,
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
    case ADD_DIFFICULTY:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.hardCount = currentIdea.hardCount + 1;
      
      return { 
        ...state,
        currentIdea
      }
    case REDUCE_DIFFICULTY:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.easy.push(action.payload);
      
      return { 
        ...state,
        currentIdea
      }
    case ADD_USER_TO_CURRENT_IDEA_LIKES:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.liked.push(action.payload);
      currentIdea.likedCount++

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_LIKES:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.liked, (idea) => userID == idea._id);
      currentIdea.liked = removedArray
      // currentIdea.liked.pull(action.payload);
      
      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_DISLIKES:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.disliked.push(action.payload);

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_DISLIKES:
      // var currentIdea = getCopyOfCurrentIdea(state);
      // currentIdea.disliked.push(action.payload);
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.disliked, (idea) => userID == idea._id);
      currentIdea.disliked = removedArray

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_HARD:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedHard = [action.payload,...currentIdea.addedHard]
      currentIdea.hardCount++

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_ADDED_HARD:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedHard, (idea) => userID == idea._id);
      currentIdea.addedHard = removedArray

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_ADDED_EASY:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedEasy, (idea) => userID == idea._id);
      currentIdea.addedEasy = removedArray

      return {
        ...state,
        currentIdea
      };

    case ADD_USER_TO_IDEA_ADDED_EASY:
    var currentIdea = getCopyOfCurrentIdea(state);
    currentIdea.addedEasy = [action.payload,...currentIdea.addedEasy]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_LONG:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedLong = [action.payload,...currentIdea.addedLong]

      return {
        ...state,
        currentIdea
      };
      
    case REMOVE_USER_FROM_IDEA_ADDED_LONG:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedLong, (idea) => userID == idea._id);
      currentIdea.addedLong = removedArray

      return {
        ...state,
        currentIdea
      };

    case REMOVE_USER_FROM_IDEA_ADDED_SHORT:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedShort, (idea) => userID == idea._id);
      currentIdea.addedShort = removedArray

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_SHORT:
      var currentIdea = getCopyOfCurrentIdea(state);
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