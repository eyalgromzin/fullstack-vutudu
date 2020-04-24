import store from 'store'
import { 
  CHANGE_SHOW_LOGIN_STATE,
  SET_PAGE_AFTER_LOGIN,
  } from 'reducers/types'

export const showLogInScreen = (pageAfterLogin, history) => {
    console.log("set login state to: true");
    store.dispatch({type: CHANGE_SHOW_LOGIN_STATE, payload: true});
    store.dispatch({type: SET_PAGE_AFTER_LOGIN, payload: pageAfterLogin});
}

export const hideLogInScreen = () => {
    console.log("set login state to: false");
    store.dispatch({type: CHANGE_SHOW_LOGIN_STATE, payload: false});
}