import { SAVE_IDEAS,
  CHANGE_CURRENT_IDEA_INDEX,
  ADD_TIME,
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
  SET_TOP_LIKED_IDEAS,
  SET_TOP_HARD_IDEAS,
  SET_TOP_TABLE_IS_IDEA_CLICKED,
  SET_CURRENT_IDEA } from './types'
// import dcopy from 'deep-copy'
var dcopy = require('deep-copy')
var _ = require('lodash');

//on startup get all ideas

const initialState = {
  currentIdeaIndex: 0,
  currentIdea: {  
  },
  ideas: [{
    _id: '000',
    title: 'click Search',
    content: 'To find ideas of what to do',
    place: 'fill place',
    time: 0,
    minNumOfPeople: 0,
    maxNumOfPeople: 0,
    liked: [],
    likeCount: 0,
    disliked: [],
    addedHard: [],
    hardCount: 0,
    addedEasy: [],
    addedLong: [],
    addedShort: [],
  }], 
  itemsFound: false,
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
      var currentIdeaIndex = action.payload;
      var currentIdeaCopy = dcopy(state.ideas[currentIdeaIndex])

      return{
          ...state,
          currentIdeaIndex: action.payload,
          currentIdea: currentIdeaCopy,
        };
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
      currentIdea.likeCount++

      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.liked = [action.payload,...currentIdea.liked]

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_LIKES:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.liked, (idea) => userID == idea._id);
      currentIdea.liked = removedArray
      
      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.liked, (userid) => userid == userID);
      
      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_DISLIKES:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.disliked.push(action.payload);

      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.disliked = [action.payload,...currentIdea.disliked]

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

      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.disliked, (userid) => userid == userID);

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_HARD:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedHard = [action.payload,...currentIdea.addedHard]
      currentIdea.hardCount++
      
      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.addedHard = [action.payload,...currentIdea.addedHard]

      return {
        ...state,
        currentIdea,
        ideas: ideas
      };
    case REMOVE_USER_FROM_IDEA_ADDED_HARD:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedHard, (idea) => userID == idea._id);
      currentIdea.addedHard = removedArray

      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.addedHard, (userid) => userid == userID);

      return {
        ...state,
        currentIdea,
        ideas: ideas
      };
    case REMOVE_USER_FROM_IDEA_ADDED_EASY:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedEasy, (idea) => userID == idea._id);
      currentIdea.addedEasy = removedArray

      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.addedEasy, (userid) => userid == userID);

      return {
        ...state,
        currentIdea
      };

    case ADD_USER_TO_IDEA_ADDED_EASY:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedEasy = [action.payload,...currentIdea.addedEasy]

      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.addedEasy = [action.payload,...currentIdea.addedEasy]

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_LONG:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedLong = [action.payload,...currentIdea.addedLong]

      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.addedLong = [action.payload,...currentIdea.addedLong]

      return {
        ...state,
        currentIdea
      };
      
    case REMOVE_USER_FROM_IDEA_ADDED_LONG:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedLong, (idea) => userID == idea._id);
      currentIdea.addedLong = removedArray

      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.addedLong, (userid) => userid == userID);

      return {
        ...state,
        currentIdea
      };

    case REMOVE_USER_FROM_IDEA_ADDED_SHORT:
      userID = action.payload;
      var currentIdea = getCopyOfCurrentIdea(state);
      removedArray = _.remove(currentIdea.addedShort, (idea) => userID == idea._id);
      currentIdea.addedShort = removedArray

      //also find the idea in the ideas and update it.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      _.remove(ideaInIdeas.addedShort, (userid) => userid == userID);

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_TO_IDEA_ADDED_SHORT:
      var currentIdea = getCopyOfCurrentIdea(state);
      currentIdea.addedShort = [action.payload,...currentIdea.addedShort]

      //also find the idea in the ideas and add it to it too.
      var ideas = dcopy(state.ideas)
      var ideaInIdeas = ideas.filter(ele => ele._id == currentIdea._id)[0]
      ideaInIdeas.addedShort = [action.payload,...currentIdea.addedShort]

      return {
        ...state,
        currentIdea
      };
    default:
      return state;
  }
}

export default reducer;