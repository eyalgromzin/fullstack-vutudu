import {
  SET_TIME, 
  SEARCH_SET_TIME, 
  SEARCH_SET_PLACE, 
  SEARCH_SET_MORE,
  SEARCH_SET_NUM_OF_PEOPLE,
  SET_SEARCH_MORE_VALIDATION,
  SET_IS_PLACE_VALID,
  SET_IS_CLICKED_SEARCH,
  SET_IS_PLACE_DIRTY,
} from 'reducers/types'

const initialState = {
    place: 'place',
    time: 5,
    numOfPeople: 2,
    more: '',
    isMoreValid: true,
    isPlaceValid: false,
    isClickedSearch: false,    
    isSearchEnabled: false
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
      case SET_SEARCH_MORE_VALIDATION:
        return {
          ...state,
          isMoreValid: action.payload,   
          isSearchEnabled: action.payload && state.isPlaceValid
        };
      case SET_IS_PLACE_VALID:
        return {
          ...state,
          isPlaceValid: action.payload,   
          isSearchEnabled: state.isMoreValid && action.payload
        };
      case SET_IS_CLICKED_SEARCH:
        return {
          ...state,
          isClickedSearch: action.payload,      
        };
     
      default:
        return state;
    }
  }

  export default searchBarReducer;
