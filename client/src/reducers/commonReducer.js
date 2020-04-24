import { CHANGE_SEARCHED_STATE,
  CHANGE_PAGE_TO_CREATE_IDEA,
  CHANGE_PAGE_TO_SHOW_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  CHANGE_SHOW_LOGIN_STATE,
  SET_IS_MAIN_LOADING,
  SET_PAGE_AFTER_LOGIN
 } from 'reducers/types'

const initialState = {
  currentPage: 'SHOW_IDEA',
  loggedIn: false,
  searched: false,
  showLogin: false,
  isMainLoading: false,
  pageAfterLogin: '',
};



function reducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_PAGE_TO_CREATE_IDEA:
      return {
        ...state,
        currentPage: 'CREATE_IDEA'
      };
    case CHANGE_PAGE_TO_SHOW_IDEAS:
      return {
        ...state,
        currentPage: 'SHOW_IDEAS'
      };
    case CHANGE_LOGGED_IN_STATE:
      return {
        ...state,
        loggedIn: action.payload
      }
    case CHANGE_SEARCHED_STATE:
      return {
        ...state,
        searched: action.payload
      }
    case CHANGE_SHOW_LOGIN_STATE:
      return {
        ...state,
        showLogin: action.payload
      }
    case SET_PAGE_AFTER_LOGIN:
      return {
        ...state,
        pageAfterLogin: action.payload
      }
    case SET_IS_MAIN_LOADING:
      return {
        ...state,
        isMainLoading: action.payload
      }
    default:
      return state;
  }
}

export default reducer;