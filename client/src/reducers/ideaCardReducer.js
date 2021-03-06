import { 
  SET_CURRENT_IDEA,
  REMOVE_USER_FROM_IDEA_LIKES,
  ADD_USER_TO_IDEA_DISLIKES,
  ADD_USER_ID_TO_IDEA_LIKES,
  REMOVE_USER_FROM_IDEA_DISLIKES,
  UPDATE_CURRENT_IDEA,
 } from 'reducers/types'
import { actions } from 'react-redux-toastr';

var dcopy = require('deep-copy')
var _ = require('lodash');

const initialState = {
  currentIdea: {}
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_IDEA:
      return {
        ...state,
        currentIdea: action.payload,
      };
    case REMOVE_USER_FROM_IDEA_LIKES:
        var userID1 = action.payload;
        var currentIdea = dcopy(state.currentIdea)
        let removedArray1 = _.remove(currentIdea.liked, idea => userID1 == idea._id);
        currentIdea.liked = removedArray1
        
        return {
          ...state,
          currentIdea
        };
    case UPDATE_CURRENT_IDEA:
        // var currentIdea = dcopy(state.currentIdea)
        var newCurrentIdea = action.payload

        return {
          ...state,
          currentIdea: newCurrentIdea
        };
    case ADD_USER_TO_IDEA_DISLIKES:
      var currentIdea = dcopy(state.currentIdea)
      currentIdea.disliked.push(action.payload);

      return {
        ...state,
        currentIdea
      };
    case ADD_USER_ID_TO_IDEA_LIKES:
      var currentIdea = dcopy(state.currentIdea)
      currentIdea.liked.push(action.payload);

      return {
        ...state,
        currentIdea
      };
    case REMOVE_USER_FROM_IDEA_DISLIKES:
        // var currentIdea = getCopyOfCurrentIdea(state);
        // currentIdea.disliked.push(action.payload);
        let userID2 = action.payload;
        var currentIdea = dcopy(state.currentIdea)
        let removedArray2 = _.remove(currentIdea.disliked, (idea) => userID2 == idea._id);
        currentIdea.disliked = removedArray2
  
        return {
          ...state,
          currentIdea
        };
    default:
      return state;
  }
}

export default reducer;