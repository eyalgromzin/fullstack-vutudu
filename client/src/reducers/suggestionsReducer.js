import {
  SET_PLACE_SUGGESTIONS,
} from 'reducers/types'

const initialState = {
  placeSuggestions: [],
};

function suggestionsReducer(state = initialState, action) {
  switch(action.type) {
    case SET_PLACE_SUGGESTIONS:
      return {
        ...state,
        placeSuggestions: action.payload,          
      };
    default:
      return state;
  }
}

export default suggestionsReducer;
