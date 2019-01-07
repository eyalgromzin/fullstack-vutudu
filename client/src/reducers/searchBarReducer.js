import {
  SET_TIME, 
  SEARCH_SET_TIME, 
  SEARCH_SET_PLACE, 
  SEARCH_SET_MORE,
  SEARCH_SET_NUM_OF_PEOPLE,
} from 'reducers/types'

const initialState = {
    place: 'place',
    time: 5,
    numOfPeople: 1,
    more: ''
  };

  function searchBarReducer(state = initialState, action) {
    switch(action.type) {
      case SEARCH_SET_PLACE:
        return {
          ...state,
          place: action.payload,          
        };
      case SEARCH_SET_TIME:
        return {
          ...state,
          time: action.payload,          
        };
      case SEARCH_SET_NUM_OF_PEOPLE:
        return {
          ...state,
          numOfPeople: action.payload,          
        };
      case SEARCH_SET_MORE:
        return {
          ...state,
          more: action.payload,          
        };

      default:
        return state;
    }
  }

  export default searchBarReducer;
