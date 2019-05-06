import store from 'store'
import {
    SET_USER_CURRENT_PREVIEWED_IDEA,
    SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
    USER_PAGE_SHOW_NEXT_CREATED_IDEA
  } from 'reducers/types'

export const showIdeaInUserCreated = (idea) => {
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA, payload: idea});
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});
}

export const openFirstIdeaInUserCreatedPage = () => {
    store.dispatch({type: USER_PAGE_SHOW_NEXT_CREATED_IDEA});
    store.dispatch({type: SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT, payload: false});
}

export const showUserEmptyIdeasPage = () => {
    ////TODO if needed
}