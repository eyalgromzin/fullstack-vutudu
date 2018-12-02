import { SAVE_IDEAS,
  CHANGE_CURRENT_IDEA_INDEX,
  ADD_TIME,
  REDUCE_TIME,
  ADD_DIFFICULTY,
  REDUCE_DIFFICULTY, 
  ADD_USER_TO_CURRENT_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES ,
  ADD_USER_TO_IDEA_ADDED_HARD, 
  ADD_USER_TO_IDEA_ADDED_EASY,
  ADD_USER_TO_IDEA_ADDED_LONG, 
  ADD_USER_TO_IDEA_ADDED_SHORT, 
  SET_CURRENT_IDEA } from './types'
// import dcopy from 'deep-copy'
var dcopy = require('deep-copy')

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,
  currentIdea: {  //why do i need it?
    // _id: '000',
    // title: 'click Search',
    // content: 'To find ideas of what to do',
    // place: 'fill place',
    // minTime: 0,
    // maxTime: 0,
    // minNumOfPeople: 0,
    // maxNumOfPeople: 0,
    // liked: [],
    // disliked: [],
    // addedHard: [],
    // addedEasy: [],
    // addedLong: [],
    // addedShort: [],
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
  }]),  
};

function getCopyOfCurrentIdea (state){
  return dcopy(state.currentIdea);
}

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
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.maxTime = currentIdea.maxTime -1 + 2;
      
      return { 
        ...state,
        currentIdea
      }
    case REDUCE_TIME:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.minTime = currentIdea.minTime - 1;
    
    return { 
      ...state,
      currentIdea
    }
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
    case ADD_USER_TO_IDEA_ADDED_HARD:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedHard = [action.payload,...currentIdea.addedHard]

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