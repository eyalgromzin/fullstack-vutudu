import {
  SET_PLACE_SUGGESTIONS,
  SET_TAG_SUGGESTIONS,
} from 'reducers/types'

const initialState = {
  placeSuggestions: [],
  subjectSuggestions: [],
};

function suggestionsReducer(state = initialState, action) {
  switch(action.type) {
    case SET_PLACE_SUGGESTIONS:
      return {
        ...state,
        placeSuggestions: action.payload,          
      };
    case SET_TAG_SUGGESTIONS:
      return {
        ...state,
        subjectSuggestions: action.payload,          
      };
    default:
      return state;
  }
}

export default suggestionsReducer;
