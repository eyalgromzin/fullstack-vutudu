import store from 'store'
import { CHANGE_SHOW_LOGIN_STATE,
  } from 'reducers/types'

export const showLogInScreen = () => {
    console.log("set login state to: true");
    store.dispatch({type: CHANGE_SHOW_LOGIN_STATE, payload: true});
}

export const hideLogInScreen = () => {
    console.log("set login state to: false");
    store.dispatch({type: CHANGE_SHOW_LOGIN_STATE, payload: false});
}