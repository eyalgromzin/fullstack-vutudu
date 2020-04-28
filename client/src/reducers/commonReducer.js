import { CHANGE_SEARCHED_STATE,
  CHANGE_PAGE_TO_CREATE_IDEA,
  CHANGE_PAGE_TO_SHOW_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  CHANGE_SHOW_LOGIN_STATE,
  SET_IS_MAIN_LOADING,
  SET_PAGE_AFTER_LOGIN,
  SET_CURRENT_PAGE,
 } from 'reducers/types'
import { actions } from 'react-redux-toastr';

const initialState = {
  currentPage: '',
  loggedIn: false,
  searched: false,
  showLogin: false,
  isMainLoading: false,
  pageAfterLogin: '',
};



function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
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