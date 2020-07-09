import {
  SET_TIME, 
  SEARCH_SET_TIME, 
  SEARCH_SET_PLACE, 
  SEARCH_SET_MORE,
  SEARCH_SET_NUM_OF_PEOPLE,
  SEARCH_SET_SEARCH_MORE_VALIDATION,
  SEARCH_SET_IS_PLACE_VALID,
  SEARCH_SET_IS_CLICKED_SEARCH,
} from 'reducers/types'

//default values
const initialState = {
    place: 'home',
    time: 5,
    numOfPeople: 10,
    more: '',
    isMoreValid: true,
    isPlaceValid: true,
    isClickedSearch: false,    
    isSearchEnabled: true
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
      case SEARCH_SET_SEARCH_MORE_VALIDATION:
        return {
          ...state,
          isMoreValid: action.payload,   
          isSearchEnabled: action.payload && state.isPlaceValid
        };
      case SEARCH_SET_IS_PLACE_VALID:
        return {
          ...state,
          isPlaceValid: action.payload,   
          isSearchEnabled: state.isMoreValid && action.payload
        };
      case SEARCH_SET_IS_CLICKED_SEARCH:
        return {
          ...state,
          isClickedSearch: action.payload,      
        };
     
      default:
        return state;
    }
  }

  export default searchBarReducer;
